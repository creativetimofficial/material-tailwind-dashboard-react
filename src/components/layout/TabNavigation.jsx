import React from 'react';
import { Badge } from '../ui';
import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';
import {
  HomeIcon,
  UserIcon,
  UsersIcon,
  BellIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const TAB_CONFIG = [
  {
    value: 'home',
    label: 'Dashboard',
    icon: HomeIcon,
    description: 'Overview and statistics',
  },
  {
    value: 'projects',
    label: 'Projects',
    icon: ChartBarIcon,
    description: 'Manage your projects',
  },
  {
    value: 'team',
    label: 'Team',
    icon: UsersIcon,
    description: 'Team members',
  },
  {
    value: 'notifications',
    label: 'Notifications',
    icon: BellIcon,
    description: 'View notifications',
    showBadge: true,
  },
  {
    value: 'profile',
    label: 'Profile',
    icon: UserIcon,
    description: 'Your profile',
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: Cog6ToothIcon,
    description: 'App settings',
  },
];

export const TabNavigation = React.memo(({ activeTab, onTabChange, unreadCount = 0 }) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} className="overflow-x-auto">
          <TabsHeader
            className="bg-transparent border-b-0 p-0"
            indicatorProps={{
              className: 'bg-blue-600 shadow-none rounded-none h-1',
            }}
          >
            {TAB_CONFIG.map((tab) => {
              const Icon = tab.icon;
              const showBadge = tab.showBadge && unreadCount > 0;

              return (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  onClick={() => onTabChange(tab.value)}
                  className={`py-4 px-6 transition-colors ${
                    activeTab === tab.value ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium whitespace-nowrap">{tab.label}</span>
                    {showBadge && (
                      <Badge color="red" size="sm" className="ml-1">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </Badge>
                    )}
                  </div>
                </Tab>
              );
            })}
          </TabsHeader>
        </Tabs>
      </div>
    </div>
  );
});

TabNavigation.displayName = 'TabNavigation';

// Mobile Navigation (for responsive design)
export const MobileTabNavigation = React.memo(({ activeTab, onTabChange, unreadCount = 0 }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {TAB_CONFIG.slice(0, 5).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.value;
          const showBadge = tab.showBadge && unreadCount > 0;

          return (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <Icon className="h-6 w-6" />
                {showBadge && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
});

MobileTabNavigation.displayName = 'MobileTabNavigation';
