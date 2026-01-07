import React from 'react';
import {
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';
import { BellIcon, ArrowDownTrayIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { NotificationDropdown } from './NotificationDropdown';

export const Header = React.memo(
  ({
    profile,
    notifications,
    unreadCount,
    onNotificationClick,
    onMarkAllRead,
    onNavigate,
    onExport,
    onMenuToggle,
  }) => {
    return (
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Menu + Title */}
            <div className="flex items-center gap-4">
              {/* Hamburger Menu */}
              <IconButton variant="text" className="lg:hidden" onClick={onMenuToggle}>
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              </IconButton>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800">
                  <Typography variant="h5" className="text-white font-bold">
                    E
                  </Typography>
                </div>
                <div>
                  <Typography variant="h5" color="blue-gray" className="font-bold">
                    Enterprise Dashboard
                  </Typography>
                  <Typography variant="small" className="text-gray-600 text-xs hidden sm:block">
                    Project Management System
                  </Typography>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Export Button */}
              <Button
                size="sm"
                variant="text"
                className="hidden sm:flex items-center gap-2 text-gray-700 hover:bg-gray-100"
                onClick={onExport}
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span className="hidden md:inline">Export</span>
              </Button>

              {/* Notifications */}
              <NotificationDropdown
                notifications={notifications}
                unreadCount={unreadCount}
                onNotificationClick={onNotificationClick}
                onMarkAllRead={onMarkAllRead}
                onViewAll={() => onNavigate('notifications')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Header.displayName = 'Header';
