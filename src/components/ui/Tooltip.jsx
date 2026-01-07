import React from 'react';
import { Tooltip as MTTooltip } from '@material-tailwind/react';

export const Tooltip = React.memo(
  ({ children, content, placement = 'top', className = '', ...props }) => {
    if (!content) return children;

    return (
      <MTTooltip content={content} placement={placement} className={className} {...props}>
        {children}
      </MTTooltip>
    );
  }
);

Tooltip.displayName = 'Tooltip';
