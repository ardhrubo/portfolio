import { Moon, Sun } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';

export default function CoolThemeSwitch({ isDark = false, onToggle, id = 'theme-switch', className = '', style = {}, ...props }) {
  return <Switch.Root id={id} checked={isDark} onCheckedChange={onToggle} className={`theme-control ${className}`} style={style} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} {...props}>{isDark ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}</Switch.Root>;
}
