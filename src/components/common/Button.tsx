interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ variant = 'primary', children, onClick, href, className = '', type = 'button' }: ButtonProps) {
  const classes = variant === 'primary'
    ? 'btn-primary'
    : 'btn-secondary';

  const props = {
    className: `${classes} ${className}`.trim(),
    onClick,
    type,
  };

  if (href) {
    return <a href={href} {...props}>{children}</a>;
  }

  return <button {...props}>{children}</button>;
}
