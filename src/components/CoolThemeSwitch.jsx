import { Moon, Sun } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';

export default function CoolThemeSwitch({ isDark = false, onToggle, id = 'theme-switch', className = '', style = {}, ...props }) {
  return (
    <Switch.Root id={id} checked={isDark} onCheckedChange={onToggle} className={`theme-control moon-toggle ${className}`} style={style} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} {...props}>
      <span className="moon-toggle-stars" aria-hidden="true"><span /><span /><span /></span>
      <Switch.Thumb className="moon-toggle-thumb">{isDark ? <Moon size={15} aria-hidden="true" /> : <Sun size={15} aria-hidden="true" />}</Switch.Thumb>
    </Switch.Root>
  );
}
