import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Live 3D caffeine molecule (C8H10N4O2) — ball-and-stick, glassy atoms.
 * Geometry is built from an idealised fused 6+5 ring (purine core) so the
 * structure is chemically faithful without shipping a coordinate file.
 */

const PALETTE = {
  dark: { C: '#5b6170', N: '#22c55e', O: '#e4e4e7', H: '#a1a1aa', bond: '#6b7280', accent: '#22c55e' },
  light: { C: '#3f3f46', N: '#15803d', O: '#d4d4d8', H: '#a1a1aa', bond: '#a1a1aa', accent: '#15803d' },
};
const RADIUS = { C: 0.38, N: 0.38, O: 0.4, H: 0.22 };

function buildCaffeine() {
  const atoms = [];
  const bonds = [];
  const add = (el, x, y, z = 0) => atoms.push({ el, pos: new THREE.Vector3(x, y, z) }) - 1;
  const bond = (a, b, order = 1) => bonds.push([a, b, order]);

  // Six-membered ring (pointy-top hexagon, bond 1.4 Å)
  const r = 1.4;
  const hex = [90, 150, 210, 270, 330, 30].map((d) => {
    const a = (d * Math.PI) / 180;
    return [r * Math.cos(a), r * Math.sin(a)];
  });
  const C6 = add('C', ...hex[0]);
  const N1 = add('N', ...hex[1]);
  const C2 = add('C', ...hex[2]);
  const N3 = add('N', ...hex[3]);
  const C4 = add('C', ...hex[4]);
  const C5 = add('C', ...hex[5]);

  // Five-membered ring fused on the C4–C5 edge
  const R = 1.4 / (2 * Math.sin(Math.PI / 5));
  const cx = hex[4][0] + R * Math.cos(Math.PI / 5);
  const pent = (deg) => [cx + R * Math.cos((deg * Math.PI) / 180), R * Math.sin((deg * Math.PI) / 180)];
  const N7 = add('N', ...pent(72));
  const C8 = add('C', ...pent(0));
  const N9 = add('N', ...pent(288));

  bond(C5, C6); bond(C6, N1); bond(N1, C2); bond(C2, N3); bond(N3, C4); bond(C4, C5, 2);
  bond(C5, N7); bond(N7, C8); bond(C8, N9, 2); bond(N9, C4);

  const outward = (i, center) => {
    const p = atoms[i].pos;
    return new THREE.Vector3(p.x - center[0], p.y - center[1], 0).normalize();
  };
  const sub = (i, el, len, center, order = 1) => {
    const u = outward(i, center);
    const j = add(el, atoms[i].pos.x + u.x * len, atoms[i].pos.y + u.y * len);
    bond(i, j, order);
    return { j, u };
  };
  const methyl = (i, center) => {
    const { j, u } = sub(i, 'C', 1.47, center);
    const v = new THREE.Vector3(-u.y, u.x, 0);
    const z = new THREE.Vector3(0, 0, 1);
    for (let k = 0; k < 3; k++) {
      const t = (k * 2 * Math.PI) / 3 + Math.PI / 6;
      const dir = u.clone().multiplyScalar(0.334)
        .add(v.clone().multiplyScalar(0.943 * Math.cos(t)))
        .add(z.clone().multiplyScalar(0.943 * Math.sin(t)));
      const h = add('H', ...atoms[j].pos.clone().addScaledVector(dir, 1.09).toArray());
      bond(j, h);
    }
  };

  const hexC = [0, 0];
  const pentC = [cx, 0];
  sub(C6, 'O', 1.22, hexC, 2);
  sub(C2, 'O', 1.22, hexC, 2);
  methyl(N1, hexC);
  methyl(N3, hexC);
  methyl(N7, pentC);
  sub(C8, 'H', 1.08, pentC);

  // Centre on origin
  const centroid = new THREE.Vector3();
  atoms.forEach((a) => centroid.add(a.pos));
  centroid.divideScalar(atoms.length);
  atoms.forEach((a) => a.pos.sub(centroid));

  return { atoms, bonds };
}

export const MOLECULE_STATS = { atoms: 24, bonds: 25 };

export default function MoleculeScene({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      return undefined; // No WebGL — card keeps its glass background.
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const themeOf = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.setAttribute('aria-hidden', 'true');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 15);

    // Lighting
    scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1a1a, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(5, 6, 8);
    scene.add(key);
    const rim = new THREE.PointLight(PALETTE[themeOf()].accent, 18, 30);
    rim.position.set(-6, -3, -4);
    scene.add(rim);

    // Molecule
    const { atoms, bonds } = buildCaffeine();
    const molecule = new THREE.Group();
    molecule.rotation.set(-0.45, 0.35, 0.1);
    scene.add(molecule);

    const sphereGeo = new THREE.SphereGeometry(1, 40, 40);
    const bondGeo = new THREE.CylinderGeometry(1, 1, 1, 16);
    const mat = (color) =>
      new THREE.MeshPhysicalMaterial({ color, roughness: 0.28, metalness: 0.08, clearcoat: 1, clearcoatRoughness: 0.12 });

    const materials = { C: mat(), N: mat(), O: mat(), H: mat(), bond: mat() };
    materials.bond.roughness = 0.45;

    atoms.forEach(({ el, pos }) => {
      const m = new THREE.Mesh(sphereGeo, materials[el]);
      m.scale.setScalar(RADIUS[el]);
      m.position.copy(pos);
      molecule.add(m);
    });

    const up = new THREE.Vector3(0, 1, 0);
    bonds.forEach(([a, b, order]) => {
      const pa = atoms[a].pos;
      const pb = atoms[b].pos;
      const dir = pb.clone().sub(pa);
      const len = dir.length();
      const mid = pa.clone().add(pb).multiplyScalar(0.5);
      const quat = new THREE.Quaternion().setFromUnitVectors(up, dir.clone().normalize());
      const perp = new THREE.Vector3(-dir.y, dir.x, 0).normalize().multiplyScalar(0.13);
      const offsets = order === 2 ? [perp, perp.clone().negate()] : [new THREE.Vector3()];
      const radius = order === 2 ? 0.065 : 0.085;
      offsets.forEach((o) => {
        const c = new THREE.Mesh(bondGeo, materials.bond);
        c.scale.set(radius, len, radius);
        c.quaternion.copy(quat);
        c.position.copy(mid).add(o);
        molecule.add(c);
      });
    });

    // Orbit rings + faint particle shell for depth
    const ringMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.18 });
    const rings = new THREE.Group();
    [[5.4, 2.1, 0.5], [5.0, 1.8, -0.9]].forEach(([rx, ry, tilt]) => {
      const curve = new THREE.EllipseCurve(0, 0, rx, ry, 0, Math.PI * 2);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(128));
      const line = new THREE.LineLoop(geo, ringMat);
      line.rotation.set(1.1, 0, tilt);
      rings.add(line);
    });
    scene.add(rings);

    const COUNT = 220;
    const pts = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(5.5 + Math.random() * 2);
      pts.set([v.x, v.y * 0.6, v.z], i * 3);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    const particleMat = new THREE.PointsMaterial({ size: 0.05, transparent: true, opacity: 0.45, depthWrite: false });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const applyTheme = () => {
      const p = PALETTE[themeOf()];
      ['C', 'N', 'O', 'H', 'bond'].forEach((k) => materials[k].color.set(p[k]));
      ringMat.color.set(p.accent);
      particleMat.color.set(p.accent);
      rim.color.set(p.accent);
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

    // Controls — drag to rotate on desktop; touch devices keep native scroll.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.6;
    controls.autoRotate = !reduceMotion;
    controls.autoRotateSpeed = 1.1;
    controls.enableRotate = finePointer;
    if (finePointer) {
      renderer.domElement.style.cursor = 'grab';
      controls.addEventListener('start', () => (renderer.domElement.style.cursor = 'grabbing'));
      controls.addEventListener('end', () => (renderer.domElement.style.cursor = 'grab'));
    } else {
      renderer.domElement.style.touchAction = 'pan-y';
    }

    // Sizing
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = w / h;
      camera.position.z = w / h < 1.3 ? 18 : 15; // keep the molecule framed on narrow cards
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    // Render loop — paused when off-screen or tab hidden
    let visible = true;
    let frame = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime();
      if (!reduceMotion) {
        molecule.position.y = Math.sin(t * 0.8) * 0.12;
        rings.rotation.y = t * 0.12;
        particles.rotation.y = -t * 0.04;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    tick();

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
    io.observe(mount);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      controls.dispose();
      scene.traverse((o) => o.geometry?.dispose());
      Object.values(materials).forEach((m) => m.dispose());
      ringMat.dispose();
      particleMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
