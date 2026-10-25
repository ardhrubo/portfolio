import React from 'react';

/**
 * CoolThemeSwitch — Animated Day/Night Theme Switcher
 * Inspired by Framer CoolThemeSwitch component.
 * Features animated sliding Sun/Moon, craters, drifting clouds, and starry night sky.
 * Pure React & CSS with reliable accessible button switch.
 */
export default function CoolThemeSwitch({
  isDark = false,
  onToggle,
  size = 9,
  sunColor = '#FBBF24',
  moonColor = '#E2E8F0',
  containerLight = '#38BDF8',
  containerNight = '#0B0B0E',
  id = 'cool-theme-switch',
  className = '',
  style = {},
}) {
  const cssVars = {
    '--toggle-size': `${size}px`,
    '--container-width': '5.625em',
    '--container-height': '2.5em',
    '--container-radius': '6.25em',
    '--container-light-bg': containerLight,
    '--container-night-bg': containerNight,
    '--circle-container-diameter': '3.375em',
    '--sun-moon-diameter': '2.125em',
    '--sun-bg': sunColor,
    '--moon-bg': moonColor,
    '--spot-color': '#94A3B8',
    '--circle-container-offset': 'calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1)',
    '--stars-color': '#FFFFFF',
    '--clouds-color': '#F8FAFC',
    '--back-clouds-color': '#BAE6FD',
    '--transition': '0.45s cubic-bezier(0, -0.02, 0.4, 1.25)',
    '--circle-transition': '0.32s cubic-bezier(0, -0.02, 0.35, 1.17)',
    fontSize: `${size}px`,
    ...style,
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle?.();
  };

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={handleClick}
      className={`theme-switch-btn ${isDark ? 'theme-switch--dark' : 'theme-switch--light'} relative inline-flex items-center cursor-pointer select-none border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full ${className}`}
    >
      <div
        className="theme-switch__container"
        style={cssVars}
      >
        <div className="theme-switch__circle-container">
          <div className="theme-switch__sun-moon-container">
            <div className="theme-switch__moon">
              <span className="theme-switch__spot" />
              <span className="theme-switch__spot" />
              <span className="theme-switch__spot" />
            </div>
          </div>
        </div>

        {/* Daytime Clouds */}
        <span className="theme-switch__clouds" />

        {/* Nighttime Stars Cluster */}
        <span className="theme-switch__stars-container">
          <svg width="44" height="9" viewBox="0 0 44 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="6.5" r="1.5" fill="#fff" />
            <circle cx="8.5" cy="1.5" r="0.5" fill="#fff" />
            <circle cx="16" cy="3" r="1" fill="#fff" />
            <circle cx="22.5" cy="7.5" r="1.5" fill="#fff" />
            <circle cx="29.5" cy="3.5" r="1" fill="#fff" />
            <circle cx="36" cy="1" r="0.5" fill="#fff" />
            <circle cx="41.5" cy="6.5" r="1" fill="#fff" />
          </svg>
        </span>
      </div>
    </button>
  );
}
