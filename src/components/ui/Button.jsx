import { Slot } from '@radix-ui/react-slot';

/** Composable button: the same interaction treatment for links and actions. */
export default function Button({ asChild = false, variant = 'primary', size = 'default', className = '', type, onPointerMove, onPointerLeave, ...props }) {
  const Component = asChild ? Slot : 'button';
  const moveReflection = event => {
    if (event.pointerType === 'mouse') {
      const bounds = event.currentTarget.getBoundingClientRect();
      const shift = bounds.width ? ((event.clientX - bounds.left) / bounds.width - 0.5) * 24 : 0;
      event.currentTarget.style.setProperty('--glass-shift', `${shift}px`);
    }
    onPointerMove?.(event);
  };
  const resetReflection = event => {
    event.currentTarget.style.removeProperty('--glass-shift');
    onPointerLeave?.(event);
  };
  return (
    <Component
      type={asChild ? undefined : type || 'button'}
      className={`ui-button ui-button--${variant} ui-button--${size} ${className}`}
      onPointerMove={moveReflection}
      onPointerLeave={resetReflection}
      {...props}
    />
  );
}
