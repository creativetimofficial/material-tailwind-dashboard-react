import React from 'react';
import { Typography } from '@material-tailwind/react';

export const EmptyState = React.memo(
  ({ icon: Icon, title, description, action, className = '' }) => {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        {Icon && <Icon className="h-16 w-16 text-gray-300 mb-4" />}
        {title && (
          <Typography variant="h6" className="text-gray-700 mb-2">
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="small" className="text-gray-500 mb-4 text-center max-w-md">
            {description}
          </Typography>
        )}
        {action}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
