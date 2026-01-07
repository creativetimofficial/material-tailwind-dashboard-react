import React from 'react';
import { Button as MTButton } from '@material-tailwind/react';

export const Button = React.memo(
  ({
    children,
    variant = 'filled',
    color = 'blue',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    fullWidth = false,
    className = '',
    onClick,
    ...props
  }) => {
    return (
      <MTButton
        variant={variant}
        color={color}
        size={size}
        disabled={disabled || loading}
        className={`flex items-center justify-center gap-2 ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        onClick={onClick}
        {...props}
      >
        {loading ? (
          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {Icon && iconPosition === 'left' && <Icon className="h-4 w-4" />}
            {children}
            {Icon && iconPosition === 'right' && <Icon className="h-4 w-4" />}
          </>
        )}
      </MTButton>
    );
  }
);

Button.displayName = 'Button';
