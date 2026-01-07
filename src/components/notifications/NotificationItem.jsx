import React from 'react';
import { Badge } from '../ui';
import { formatRelativeTime } from '../../utils';
import {
  CheckIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { Typography, IconButton } from '@material-tailwind/react';

export const NotificationItem = React.memo(({ notification, onMarkRead, onDelete, onClick }) => {
  const getIcon = (type) => {
    const iconClass = 'h-5 w-5';
    switch (type) {
      case 'success':
        return <CheckCircleIcon className={`${iconClass} text-green-600`} />;
      case 'warning':
        return <ExclamationTriangleIcon className={`${iconClass} text-orange-600`} />;
      case 'error':
        return <XCircleIcon className={`${iconClass} text-red-600`} />;
      default:
        return <InformationCircleIcon className={`${iconClass} text-blue-600`} />;
    }
  };

  const getBgColor = (type, read) => {
    if (read) return 'bg-white hover:bg-gray-50';
    switch (type) {
      case 'success':
        return 'bg-green-50 hover:bg-green-100';
      case 'warning':
        return 'bg-orange-50 hover:bg-orange-100';
      case 'error':
        return 'bg-red-50 hover:bg-red-100';
      default:
        return 'bg-blue-50 hover:bg-blue-100';
    }
  };

  return (
    <div
      className={`p-4 border-b border-gray-100 transition-colors ${getBgColor(
        notification.type,
        notification.read
      )} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-1">
              <Typography
                variant="small"
                className={`font-semibold ${
                  !notification.read ? 'text-gray-900' : 'text-gray-700'
                }`}
              >
                {notification.title}
              </Typography>
              {!notification.read && (
                <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-600"></span>
              )}
            </div>

            {/* Priority Badge */}
            {notification.priority && notification.priority !== 'medium' && (
              <Badge
                color={
                  notification.priority === 'critical'
                    ? 'red'
                    : notification.priority === 'high'
                    ? 'orange'
                    : 'blue'
                }
                size="sm"
              >
                {notification.priority}
              </Badge>
            )}
          </div>

          <Typography variant="small" className="text-gray-600 mb-2">
            {notification.message}
          </Typography>

          {/* Meta Info */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <ClockIcon className="h-3 w-3 text-gray-400" />
              <Typography variant="small" className="text-gray-500 text-xs">
                {formatRelativeTime(new Date(notification.timestamp))}
              </Typography>
            </div>

            {notification.category && (
              <Badge color="gray" size="sm" className="text-xs">
                {notification.category}
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 flex-shrink-0">
          {!notification.read && (
            <IconButton
              size="sm"
              variant="text"
              onClick={(e) => {
                e.stopPropagation();
                onMarkRead?.(notification.id);
              }}
              title="Mark as read"
            >
              <CheckIcon className="h-4 w-4" />
            </IconButton>
          )}
          <IconButton
            size="sm"
            variant="text"
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(notification.id);
            }}
            title="Delete"
          >
            <XMarkIcon className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
});

NotificationItem.displayName = 'NotificationItem';
