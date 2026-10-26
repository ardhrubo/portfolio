import { Slot } from '@radix-ui/react-slot';

/** Composable button: the same interaction treatment for links and actions. */
export default function Button({ asChild = false, variant = 'primary', size = 'default', className = '', type, ...props }) {
  const Component = asChild ? Slot : 'button';
  return (
    <Component
      type={asChild ? undefined : type || 'button'}
      className={`ui-button ui-button--${variant} ui-button--${size} ${className}`}
      {...props}
    />
  );
}
