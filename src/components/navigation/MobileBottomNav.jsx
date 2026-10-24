import React from 'react';
import { MOBILE_NAV_ITEMS } from './navConfig';

export default function MobileBottomNav({ activeSection, onNavClick }) {
  return (
    <nav
      aria-label="Mobile sections"
      className="lg:hidden fixed bottom-3 inset-x-3 z-40 mx-auto max-w-md rounded-2xl border border-border bg-card/90 backdrop-blur-xl shadow-lg px-4 py-2 flex items-center justify-around"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      {MOBILE_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            id={`mobile-nav-${item.id}`}
            href={item.href}
            onClick={(e) => onNavClick(e, item)}
            aria-current={isActive ? 'page' : undefined}
            className={`group flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[0.6875rem] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span
              className={`flex h-7 w-11 items-center justify-center rounded-full transition-colors duration-200 ${
                isActive ? 'bg-primary/15' : 'group-active:bg-primary/10'
              }`}
            >
              <Icon
                className={`size-[1.125rem] transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
                strokeWidth={isActive ? 2.4 : 2}
                aria-hidden="true"
              />
            </span>
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
