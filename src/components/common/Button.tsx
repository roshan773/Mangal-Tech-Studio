import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  to?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  asLink = false,
  to = '#',
  icon,
  iconPosition = 'right',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 tracking-wide select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-copper focus:ring-offset-2';
  
  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-refined gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-refined gap-2',
    lg: 'text-base px-7 py-3.5 rounded-refined gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-copper text-white hover:bg-copper-hover active:bg-copper-dark shadow-sm hover:shadow-subtle hover:-translate-y-0.5',
    secondary: 'bg-evergreen text-ivory hover:bg-evergreen-light active:bg-evergreen-dark shadow-sm hover:shadow-subtle hover:-translate-y-0.5',
    outline: 'border border-evergreen/25 text-evergreen hover:bg-evergreen hover:text-white active:bg-evergreen-dark',
    ghost: 'text-charcoal hover:text-evergreen hover:bg-evergreen/5',
    dark: 'bg-charcoal text-white hover:bg-black',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (asLink && to) {
    return (
      <Link to={to} className={combinedClasses}>
        {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
};
