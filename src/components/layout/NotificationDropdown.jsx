import React from 'react';
import { formatRelativeTime } from '../../utils';
import {
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export const NotificationDropdown = React.memo(
  ({ notifications = [], unreadCount = 0, onNotificationClick, onMarkAllRead, onViewAll }) => {
    const [open, setOpen] = React.useState(false);

    // Get icon based on notification type
    const getNotificationIcon = (type) => {
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

    // Get recent notifications (max 5)
    const recentNotifications = React.useMemo(() => {
      return notifications
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);
    }, [notifications]);

    const handleNotificationClick = (notification) => {
      onNotificationClick?.(notification);
      setOpen(false);
    };

    return (
      <Menu open={open} handler={setOpen} placement="bottom-end">
        <MenuHandler>
          <IconButton variant="text" className="relative">
            <BellIcon className="h-6 w-6 text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </IconButton>
        </MenuHandler>

        <MenuList className="w-80 sm:w-96 max-h-[500px] overflow-y-auto p-0">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" className="font-bold text-gray-900">
                  Notifications
                </Typography>
                {unreadCount > 0 && (
                  <Typography variant="small" className="text-gray-600 text-xs">
                    {unreadCount} unread
                  </Typography>
                )}
              </div>
              {unreadCount > 0 && (
                <Button
                  size="sm"
                  variant="text"
                  className="text-blue-600 hover:bg-blue-50 p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAllRead?.();
                  }}
                >
                  Mark all read
                </Button>
              )}
            </div>
          </div>

          {/* Notification List */}
          {recentNotifications.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <BellIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <Typography variant="small" className="text-gray-600">
                No notifications yet
              </Typography>
              <Typography variant="small" className="text-gray-500 text-xs mt-1">
                We'll notify you when something arrives
              </Typography>
            </div>
          ) : (
            <div className="py-2">
              {recentNotifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
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

                      <Typography
                        variant="small"
                        className="text-gray-600 text-xs mt-1 line-clamp-2"
                      >
                        {notification.message}
                      </Typography>

                      <div className="flex items-center gap-1 mt-2">
                        <ClockIcon className="h-3 w-3 text-gray-400" />
                        <Typography variant="small" className="text-gray-500 text-xs">
                          {formatRelativeTime(new Date(notification.timestamp))}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </MenuItem>
              ))}
            </div>
          )}

          {/* Footer */}
          {recentNotifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 sticky bottom-0">
              <Button
                size="sm"
                variant="text"
                className="w-full text-blue-600 hover:bg-blue-50"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewAll?.();
                  setOpen(false);
                }}
              >
                View All Notifications
              </Button>
            </div>
          )}
        </MenuList>
      </Menu>
    );
  }
);

NotificationDropdown.displayName = 'NotificationDropdown';
