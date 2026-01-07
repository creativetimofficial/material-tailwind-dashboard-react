import React from 'react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

export const NotificationIcon = React.memo(({ type, className = 'h-5 w-5' }) => {
  const icons = {
    success: <CheckCircleIcon className={`${className} text-green-600`} />,
    warning: <ExclamationTriangleIcon className={`${className} text-orange-600`} />,
    error: <XCircleIcon className={`${className} text-red-600`} />,
    info: <InformationCircleIcon className={`${className} text-blue-600`} />,
  };

  return icons[type] || icons.info;
});

NotificationIcon.displayName = 'NotificationIcon';
