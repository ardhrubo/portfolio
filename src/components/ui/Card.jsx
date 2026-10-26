export default function Card({ as: Component = 'div', className = '', children, ...props }) {
  return <Component className={`ui-card ${className}`} {...props}>{children}</Component>;
}
