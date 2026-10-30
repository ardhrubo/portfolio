import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import ScienceStudies from './ScienceStudies';
import {
  Atom,
  Flame,
  Waves,
  Sparkles,
  RotateCcw,
  Zap,
  Sliders,
  Pause,
  Play,
} from 'lucide-react';

// Light Forest Green & Mint Jade Theme
const THEME_COLORS = {
  accent: 0x4ade80,
  accentSoft: 0x86efac,
  accentDeep: 0x22c55e,
  mintLight: 0xd1fae5,
  atomC: 0x52525b,      // Neutral zinc/graphite
  atomHighlight: 0x4ade80,
  bond: 0x3f3f46,       // Muted bond line
  particle: 0x34d399,
  surfaceWire: 0x71717a,
  surfaceHighlight: 0x4ade80,
};

// Generates exact C60 Fullerene vertices (truncated icosahedron)
function generateC60Vertices() {
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio ~1.618
  const verts = [];

  const addPermutations = (x, y, z) => {
    const signs = [
      [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
      [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]
    ];
    // cyclic shifts
    const perms = [
      [x, y, z],
      [z, x, y],
      [y, z, x]
    ];
    for (const [px, py, pz] of perms) {
      for (const [sx, sy, sz] of signs) {
        // avoid duplicate zeros
        if (px === 0 && sx === -1) continue;
        if (py === 0 && sy === -1) continue;
        if (pz === 0 && sz === -1) continue;
        verts.push(new THREE.Vector3(px * sx, py * sy, pz * sz));
      }
    }
  };

  addPermutations(0, 1, 3 * phi);
  addPermutations(2, 1 + 2 * phi, phi);
  addPermutations(1, 2 + phi, 2 * phi);

  // Normalize and scale to radius ~3.2
  const scale = 3.2 / verts[0].length();
  verts.forEach(v => v.multiplyScalar(scale));

  // Remove duplicates that might occur due to zeros
  const unique = [];
  for (const v of verts) {
    if (!unique.some(u => u.distanceTo(v) < 0.05)) {
      unique.push(v);
    }
  }
  return unique.slice(0, 60);
}

export default function InteractiveMotionLab({ onShowToast }) {
  const containerRef = useRef(null);
  const [activeMode, setActiveMode] = useState('fullerene'); // 'fullerene' | 'montecarlo' | 'wave'
  const [study, setStudy] = useState('3d');
  const [simSpeed, setSimSpeed] = useState(1);
  const [fps, setFps] = useState(60);
  const [nodeCount, setNodeCount] = useState(60);
  const [isExcited, setIsExcited] = useState(false);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const sceneStateRef = useRef({
    activeMode: 'fullerene',
    simSpeed: 1,
    mouse: new THREE.Vector2(),
    targetMouse: new THREE.Vector2(),
    shockwave: 0,
    shockwaveOrigin: new THREE.Vector3(),
    frameCount: 0,
    lastTime: performance.now()
  });

  // Sync ref with state
  useEffect(() => {
    sceneStateRef.current.activeMode = activeMode;
    sceneStateRef.current.simSpeed = simSpeed;
    sceneStateRef.current.paused = paused;
  }, [activeMode, simSpeed, paused]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => { if (preference.matches) setPaused(true); };
    preference.addEventListener('change', change);
    return () => preference.removeEventListener('change', change);
  }, []);

  const handlePulseExcitation = () => {
    sceneStateRef.current.shockwave = 1.0;
    setIsExcited(true);
    setTimeout(() => setIsExcited(false), 800);
    if (onShowToast) onShowToast('Added a visual pulse to the study');
  };

  const handleResetCamera = () => {
    if (sceneStateRef.current.resetCam) {
      sceneStateRef.current.resetCam();
      if (onShowToast) onShowToast('3D Camera orientation reset');
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 24;
    controls.minDistance = 4;
    controls.enablePan = false;

    sceneStateRef.current.resetCam = () => {
      camera.position.set(0, 0, 11);
      controls.target.set(0, 0, 0);
      controls.update();
    };

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(6, 8, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(THEME_COLORS.accent, 0.8);
    dirLight2.position.set(-8, -6, -6);
    scene.add(dirLight2);

    // -------------------------------------------------------------
    // SCENE A: C60 Fullerene Quantum Cage
    // -------------------------------------------------------------
    const fullereneGroup = new THREE.Group();
    scene.add(fullereneGroup);

    const c60Verts = generateC60Vertices();
    const atomSpheres = [];
    const sphereGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const atomMat = new THREE.MeshStandardMaterial({
      color: THEME_COLORS.atomC,
      roughness: 0.32,
      metalness: 0.25
    });
    const atomAccentMat = new THREE.MeshStandardMaterial({
      color: THEME_COLORS.atomHighlight,
      roughness: 0.2,
      metalness: 0.25,
      emissive: THEME_COLORS.accentDeep,
      emissiveIntensity: 0.15
    });

    c60Verts.forEach((pos, idx) => {
      // 1 in 5 atoms is an accent node
      const mesh = new THREE.Mesh(sphereGeo, idx % 5 === 0 ? atomAccentMat : atomMat);
      mesh.position.copy(pos);
      fullereneGroup.add(mesh);
      atomSpheres.push({ mesh, basePos: pos.clone(), idx });
    });

    // Molecular Bonds (connect vertices within cutoff distance ~1.6)
    const bondMat = new THREE.MeshBasicMaterial({
      color: THEME_COLORS.bond,
      transparent: true,
      opacity: 0.6
    });
    const bondPositions = [];
    for (let i = 0; i < c60Verts.length; i++) {
      for (let j = i + 1; j < c60Verts.length; j++) {
        const dist = c60Verts[i].distanceTo(c60Verts[j]);
        if (dist > 0.8 && dist < 1.7) {
          bondPositions.push(c60Verts[i].x, c60Verts[i].y, c60Verts[i].z);
          bondPositions.push(c60Verts[j].x, c60Verts[j].y, c60Verts[j].z);
        }
      }
    }
    const bondGeo = new THREE.BufferGeometry();
    bondGeo.setAttribute('position', new THREE.Float32BufferAttribute(bondPositions, 3));
    const bondLines = new THREE.LineSegments(bondGeo, bondMat);
    fullereneGroup.add(bondLines);

    // Orbital quantum shell
    const shellGeo = new THREE.RingGeometry(4.3, 4.36, 64);
    const shellMat = new THREE.MeshBasicMaterial({
      color: THEME_COLORS.accent,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2
    });
    const shellRing1 = new THREE.Mesh(shellGeo, shellMat);
    const shellRing2 = new THREE.Mesh(shellGeo, shellMat);
    shellRing2.rotation.x = Math.PI / 2.3;
    fullereneGroup.add(shellRing1);
    fullereneGroup.add(shellRing2);

    // -------------------------------------------------------------
    // SCENE B: Monte Carlo Kinetic Field (2,500 particles)
    // -------------------------------------------------------------
    const mcGroup = new THREE.Group();
    scene.add(mcGroup);
    mcGroup.visible = false;

    const PARTICLE_COUNT = 2500;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(PARTICLE_COUNT * 3);
    const pVel = new Float32Array(PARTICLE_COUNT * 3);
    const pColors = new Float32Array(PARTICLE_COUNT * 3);

    const cSoft = new THREE.Color(THEME_COLORS.particle);
    const cDeep = new THREE.Color(THEME_COLORS.accentDeep);
    const cWhite = new THREE.Color(0xf4f4f5);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 1.2 + Math.random() * 4.2;

      pPos[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = rad * Math.cos(phi);

      pVel[i * 3] = (Math.random() - 0.5) * 0.02;
      pVel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      pVel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      const pick = Math.random();
      const col = pick > 0.7 ? cSoft : pick > 0.4 ? cDeep : cWhite;
      pColors[i * 3] = col.r;
      pColors[i * 3 + 1] = col.g;
      pColors[i * 3 + 2] = col.b;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particleCloud = new THREE.Points(pGeo, pMat);
    mcGroup.add(particleCloud);

    // -------------------------------------------------------------
    // SCENE C: DFT Potential Energy Surface
    // -------------------------------------------------------------
    const waveGroup = new THREE.Group();
    scene.add(waveGroup);
    waveGroup.visible = false;

    const GRID_SIZE = 48;
    const waveGeo = new THREE.PlaneGeometry(9, 9, GRID_SIZE, GRID_SIZE);
    waveGeo.rotateX(-Math.PI / 2.5);

    const waveMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      wireframe: true,
      roughness: 0.4,
      metalness: 0.8,
      emissive: THEME_COLORS.accentDeep,
      emissiveIntensity: 0.25
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveGroup.add(waveMesh);

    // Secondary glow plane below
    const subWaveMat = new THREE.MeshBasicMaterial({
      color: THEME_COLORS.accent,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const subWaveMesh = new THREE.Mesh(waveGeo, subWaveMat);
    subWaveMesh.position.y = -0.3;
    waveGroup.add(subWaveMesh);

    // Mouse movement tracker for interactive magnetic pull
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      sceneStateRef.current.targetMouse.set(x, y);
    };
    container.addEventListener('pointermove', handlePointerMove);

    // Click handler to trigger local wave ripples
    const handleCanvasClick = () => {
      sceneStateRef.current.shockwave = 1.0;
    };
    container.addEventListener('click', handleCanvasClick);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();
    let inView = false;
    const visibilityObserver = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; });
    visibilityObserver.observe(container);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const frameDelta = Math.min(clock.getDelta(), .05);
      if (!inView || document.hidden) return;
      const delta = sceneStateRef.current.paused ? 0 : frameDelta;
      sceneStateRef.current.elapsed = (sceneStateRef.current.elapsed || 0) + delta;
      const elapsedTime = sceneStateRef.current.elapsed;
      const speed = sceneStateRef.current.simSpeed;
      const mode = sceneStateRef.current.activeMode;

      // Mouse smoothing
      sceneStateRef.current.mouse.lerp(sceneStateRef.current.targetMouse, 0.08);

      // FPS Calculation
      sceneStateRef.current.frameCount++;
      const now = performance.now();
      if (now - sceneStateRef.current.lastTime >= 500) {
        const computedFps = Math.round(
          (sceneStateRef.current.frameCount * 1000) / (now - sceneStateRef.current.lastTime)
        );
        setFps(computedFps);
        sceneStateRef.current.frameCount = 0;
        sceneStateRef.current.lastTime = now;
      }

      // Decay shockwave
      if (sceneStateRef.current.shockwave > 0) {
        sceneStateRef.current.shockwave = Math.max(0, sceneStateRef.current.shockwave - delta * 2.2);
      }
      const shock = sceneStateRef.current.shockwave;

      // Visibility control
      fullereneGroup.visible = mode === 'fullerene';
      mcGroup.visible = mode === 'montecarlo';
      waveGroup.visible = mode === 'wave';

      if (mode === 'fullerene') {
        setNodeCount(60);
        fullereneGroup.rotation.y += 0.35 * delta * speed;
        fullereneGroup.rotation.x += 0.15 * delta * speed;

        shellRing1.rotation.z += 0.8 * delta * speed;
        shellRing2.rotation.z -= 0.6 * delta * speed;

        // Shockwave vertex oscillation
        if (shock > 0) {
          atomSpheres.forEach(({ mesh, basePos, idx }) => {
            const pulse = 1 + shock * 0.28 * Math.sin(idx * 0.4 + elapsedTime * 12);
            mesh.position.copy(basePos).multiplyScalar(pulse);
          });
        }
      } else if (mode === 'montecarlo') {
        setNodeCount(PARTICLE_COUNT);
        const positions = particleCloud.geometry.attributes.position.array;
        const mx = sceneStateRef.current.mouse.x * 4;
        const my = sceneStateRef.current.mouse.y * 4;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3;
          let px = positions[i3];
          let py = positions[i3 + 1];
          let pz = positions[i3 + 2];

          // Lorenz / vortex swirl around center + mouse attraction
          const distToMouse = Math.sqrt((px - mx) ** 2 + (py - my) ** 2 + pz ** 2);
          const force = (0.015 * speed) / (distToMouse + 0.5);

          px += (-py * 0.8 + (mx - px) * force) * delta * 60;
          py += (px * 0.8 + (my - py) * force) * delta * 60;
          pz += Math.sin(elapsedTime * 2 + px) * 0.6 * speed * delta;

          // Radial clamp
          const r = Math.sqrt(px * px + py * py + pz * pz);
          if (r > 6.5) {
            px *= 0.2;
            py *= 0.2;
            pz *= 0.2;
          }

          positions[i3] = px;
          positions[i3 + 1] = py;
          positions[i3 + 2] = pz;
        }
        particleCloud.geometry.attributes.position.needsUpdate = true;
        mcGroup.rotation.z += 0.1 * delta * speed;
      } else if (mode === 'wave') {
        setNodeCount(GRID_SIZE * GRID_SIZE);
        const posAttr = waveMesh.geometry.attributes.position;
        const arr = posAttr.array;

        for (let i = 0; i < arr.length; i += 3) {
          const x = arr[i];
          const y = arr[i + 1];
          const dist = Math.sqrt(x * x + y * y);

          // Harmonic quantum potential equation
          let z = Math.sin(x * 1.2 - elapsedTime * 2.5 * speed) *
                  Math.cos(y * 1.2 - elapsedTime * 2.5 * speed) * 0.5;

          if (shock > 0) {
            z += Math.sin(dist * 4 - (1 - shock) * 14) * (shock * 0.9);
          }

          arr[i + 2] = z;
        }
        posAttr.needsUpdate = true;
        waveMesh.geometry.computeVertexNormals();
        waveGroup.rotation.y = sceneStateRef.current.mouse.x * 0.2;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('click', handleCanvasClick);
      controls.dispose();
      const geometries = new Set();
      const materials = new Set();
      scene.traverse(object => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section id="simulation-lab" className="section text-foreground">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Atom size={15} aria-hidden="true" />
            <span>05 / 3D playground</span>
          </div>
          <h2 className="section-title">
            Science, <span className="gradient-text">in motion.</span>
          </h2>
          <p className="section-subtitle">
            Explore molecular structures, flowing particles, and wave surfaces.
            Choose an experiment, turn it around, and see what changes.
          </p>
        </div>

        <div className="study-tabs" role="group" aria-label="Choose science study">
          {[['3d', '3D explorations'], ['waves', 'Wave interference'], ['crystal', 'Crystal lattice']].map(([id, label]) => <button key={id} type="button" aria-pressed={study === id} onClick={() => setStudy(id)}>{label}</button>)}
        </div>
        <p className="study-caption">Illustrative models for exploring patterns and geometry; not research calculations.</p>
        <div hidden={study !== '3d'} className="glass-panel relative rounded-3xl overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--surface-highlight)]">
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[var(--glass-border)] bg-[var(--glass-item)]">
            {/* Mode Switchers */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveMode('fullerene')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeMode === 'fullerene'
                    ? 'bg-[var(--tint-bg)] text-[var(--tint-text)] border border-[var(--tint-border)] shadow-xs'
                    : 'border border-[var(--glass-border)] bg-[var(--glass-item)] text-muted-foreground hover:text-foreground hover:bg-[var(--glass-item-hover)]'
                }`}
              >
                <Atom className="size-3.5 text-accent" />
                <span>C₆₀ Fullerene Cage</span>
              </button>

              <button
                onClick={() => setActiveMode('montecarlo')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeMode === 'montecarlo'
                    ? 'bg-[var(--tint-bg)] text-[var(--tint-text)] border border-[var(--tint-border)] shadow-xs'
                    : 'border border-[var(--glass-border)] bg-[var(--glass-item)] text-muted-foreground hover:text-foreground hover:bg-[var(--glass-item-hover)]'
                }`}
              >
                <Flame className="size-3.5 text-accent" />
                <span>Particle flow</span>
              </button>

              <button
                onClick={() => setActiveMode('wave')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeMode === 'wave'
                    ? 'bg-[var(--tint-bg)] text-[var(--tint-text)] border border-[var(--tint-border)] shadow-xs'
                    : 'border border-[var(--glass-border)] bg-[var(--glass-item)] text-muted-foreground hover:text-foreground hover:bg-[var(--glass-item-hover)]'
                }`}
              >
                <Waves className="size-3.5 text-accent" />
                <span>Wave surface</span>
              </button>
            </div>

            {/* Diagnostics HUD */}
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-item)]">
                <span className="size-2 rounded-full bg-accent animate-pulse" />
                {fps} FPS
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-item)]">
                <Sliders className="size-3 text-muted-foreground" />
                {nodeCount.toLocaleString()} Nodes
              </span>
            </div>
          </div>

          {/* Interactive 3D Canvas Viewport */}
          <div className="lab-viewport relative w-full h-[420px] sm:h-[480px] lg:h-[520px] cursor-grab active:cursor-grabbing select-none border-y border-[var(--glass-border)]">
            <div ref={containerRef} className="size-full" />

            {/* Floating Instructional Pill */}
            <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-1.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-[var(--glass-border)] bg-background/70 backdrop-blur-md text-[0.7rem] font-mono text-muted-foreground">
                <Sparkles className="size-3 text-accent" />
                Drag to orbit 360° &bull; Scroll to zoom
              </span>
              {activeMode === 'montecarlo' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[var(--glass-border)] bg-background/70 backdrop-blur-md text-[0.7rem] font-mono text-muted-foreground">
                  Move the pointer to influence particle flow
                </span>
              )}
            </div>

            {/* Bottom-Right Interactive Action Dock */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-auto sm:right-4 flex flex-wrap items-center justify-end gap-2 z-10">
              <button type="button" className="lab-pause" onClick={() => setPaused(value => !value)}>{paused ? <Play size={16} /> : <Pause size={16} />}{paused ? 'Play' : 'Pause'}</button>
              <button
                onClick={handlePulseExcitation}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all duration-200 cursor-pointer ${
                  isExcited
                    ? 'bg-accent text-background shadow-md'
                    : 'border border-[var(--glass-border)] bg-background/80 text-foreground hover:bg-background hover:border-[var(--glass-border-strong)]'
                }`}
                title="Add a visual pulse"
              >
                <Zap className="size-3.5 text-accent" />
                <span>Pulse Excitation</span>
              </button>

              <div className="inline-flex items-center rounded-xl border border-[var(--glass-border)] bg-background/80 backdrop-blur-md p-1">
                {[0.5, 1, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSimSpeed(spd)}
                    className={`px-2 py-1 text-[0.6875rem] font-mono rounded-lg transition-colors cursor-pointer ${
                      simSpeed === spd
                        ? 'bg-foreground text-background font-bold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                onClick={handleResetCamera}
                className="p-2 rounded-xl border border-[var(--glass-border)] bg-background/80 backdrop-blur-md text-muted-foreground hover:text-foreground hover:bg-background transition-colors cursor-pointer"
                title="Reset Camera View"
                aria-label="Reset camera view"
              >
                <RotateCcw className="size-4" />
              </button>
            </div>
          </div>

          {/* Bottom Narrative / Scientific Context */}
          <div className="px-6 py-4 border-t border-[var(--glass-border)] bg-[var(--glass-item)] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 font-mono text-muted-foreground">
              <span className="size-2 rounded-full bg-accent" />
              <strong className="text-foreground font-semibold">
                {activeMode === 'fullerene' && 'C₆₀ Truncated Icosahedral Fullerene Cage'}
                {activeMode === 'montecarlo' && 'Illustrative particle flow with pointer attraction'}
                {activeMode === 'wave' && 'Animated harmonic wave surface'}
              </strong>
            </div>

            <span className="font-mono text-muted-foreground/80">
              Interactive studies in form &amp; motion
            </span>
          </div>
        </div>
        {study !== '3d' && <ScienceStudies key={study} initialMode={study} />}
      </div>
    </section>
  );
}
