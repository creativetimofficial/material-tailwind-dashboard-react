import React from 'react';
import { Avatar as MTAvatar } from '@material-tailwind/react';

export const Avatar = React.forwardRef(
  (
    { src, alt = '', size = 'md', variant = 'circular', className = '', fallback, ...props },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false);

    const sizeClasses = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-9 w-9 text-sm',
      md: 'h-12 w-12 text-base',
      lg: 'h-16 w-16 text-lg',
      xl: 'h-20 w-20 text-xl',
      xxl: 'h-32 w-32 text-2xl',
    };

    if (imgError || !src) {
      return (
        <div
          ref={ref}
          className={`${sizeClasses[size]} rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold ${className}`}
          {...props}
        >
          {fallback || alt.charAt(0).toUpperCase()}
        </div>
      );
    }

    return (
      <MTAvatar
        ref={ref}
        src={src}
        alt={alt}
        size={size}
        variant={variant}
        className={className}
        onError={() => setImgError(true)}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';
