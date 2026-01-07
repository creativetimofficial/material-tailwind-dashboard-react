import React from 'react';
import { Card, Button, Badge, EmptyState } from '../components/ui';
import { Typography, IconButton } from '@material-tailwind/react';
import { formatRelativeTime } from '../utils';
import {
  BellIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

export const NotificationsPage = React.memo(
  ({
    notifications = [],
    unreadCount = 0,
    onMarkRead,
    onMarkAllRead,
    onDelete,
    loading = false,
  }) => {
    const getNotificationIcon = (type) => {
      const iconClasses = 'h-5 w-5';
      switch (type) {
        case 'success':
          return <CheckCircleIcon className={`${iconClasses} text-green-600`} />;
        case 'warning':
          return <ExclamationTriangleIcon className={`${iconClasses} text-orange-600`} />;
        case 'error':
          return <XCircleIcon className={`${iconClasses} text-red-600`} />;
        default:
          return <InformationCircleIcon className={`${iconClasses} text-blue-600`} />;
      }
    };

    const getNotificationBgColor = (type, read) => {
      if (read) return 'bg-white';
      switch (type) {
        case 'success':
          return 'bg-green-50';
        case 'warning':
          return 'bg-orange-50';
        case 'error':
          return 'bg-red-50';
        default:
          return 'bg-blue-50';
      }
    };

    if (loading) {
      return (
        <Card>
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <div className="p-6">
              <Typography variant="small" className="text-gray-600 mb-2">
                Total Notifications
              </Typography>
              <Typography variant="h4" className="font-bold text-blue-600">
                {notifications.length}
              </Typography>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <Typography variant="small" className="text-gray-600 mb-2">
                Unread
              </Typography>
              <Typography variant="h4" className="font-bold text-orange-600">
                {unreadCount}
              </Typography>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <Typography variant="small" className="text-gray-600 mb-2">
                Read
              </Typography>
              <Typography variant="h4" className="font-bold text-green-600">
                {notifications.length - unreadCount}
              </Typography>
            </div>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          {/* Header */}
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h5" color="blue-gray" className="font-bold mb-1">
                  Notifications
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </Typography>
              </div>
              {unreadCount > 0 && (
                <Button size="sm" variant="outlined" onClick={onMarkAllRead}>
                  Mark All Read
                </Button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <EmptyState
                icon={BellIcon}
                title="No notifications"
                description="You're all caught up! We'll notify you when something arrives."
              />
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 transition-colors hover:bg-gray-50 ${getNotificationBgColor(
                    notification.type,
                    notification.read
                  )}`}
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
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

                      {/* Time & Category */}
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
                          onClick={() => onMarkRead?.(notification.id)}
                          title="Mark as read"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </IconButton>
                      )}
                      <IconButton
                        size="sm"
                        variant="text"
                        color="red"
                        onClick={() => onDelete?.(notification.id)}
                        title="Delete"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    );
  }
);

NotificationsPage.displayName = 'NotificationsPage';
