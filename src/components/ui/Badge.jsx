import React from 'react';
import { Chip } from '@material-tailwind/react';

export const Badge = React.memo(
  ({
    children,
    variant = 'filled',
    color = 'blue',
    size = 'sm',
    icon: Icon,
    className = '',
    ...props
  }) => {
    return (
      <Chip
        value={children}
        variant={variant}
        color={color}
        size={size}
        icon={Icon && <Icon className="h-3 w-3" />}
        className={`capitalize ${className}`}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
