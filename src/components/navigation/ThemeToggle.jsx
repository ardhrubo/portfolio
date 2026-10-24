import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ currentTheme, onToggleTheme, id, showLabel = false }) {
  const isLight = currentTheme === 'light';
  const Icon = isLight ? Moon : Sun;
  const nextLabel = isLight ? 'Dark mode' : 'Light mode';

  return (
    <button
      id={id}
      type="button"
      onClick={onToggleTheme}
      title={`Switch to ${nextLabel}`}
      aria-label={`Switch to ${nextLabel}`}
      className={`group inline-flex items-center gap-3 rounded-xl border border-border bg-background/60 text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer ${
        showLabel ? 'w-full h-10 px-3 text-sm font-medium' : 'h-9 w-9 justify-center'
      }`}
    >
      <Icon className="size-4 shrink-0 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
      {showLabel && <span className="flex-1 text-left">{nextLabel}</span>}
    </button>
  );
}
