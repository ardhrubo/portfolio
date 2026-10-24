import React from 'react';
import CoolThemeSwitch from '../CoolThemeSwitch';

export default function ThemeToggle({ currentTheme, onToggleTheme, id, showLabel = false }) {
  const isDark = currentTheme === 'dark';

  return (
    <div className="inline-flex items-center gap-2">
      <CoolThemeSwitch
        id={id}
        isDark={isDark}
        onToggle={onToggleTheme}
        size={showLabel ? 9 : 8}
      />
      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground">
          {isDark ? 'Night' : 'Day'}
        </span>
      )}
    </div>
  );
}
