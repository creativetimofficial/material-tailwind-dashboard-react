import React from 'react';
import { Badge, Avatar } from '../ui';
import { LoginForm, SignUpForm } from '../auth';
import { Typography, IconButton, Dialog, DialogBody } from '@material-tailwind/react';
import {
  HomeIcon,
  UserIcon,
  UsersIcon,
  BellIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Dashboard', icon: HomeIcon },
  { id: 'projects', label: 'Projects', icon: ChartBarIcon },
  { id: 'team', label: 'Team', icon: UsersIcon },
  { id: 'notifications', label: 'Notifications', icon: BellIcon, badge: true },
  { id: 'profile', label: 'Profile', icon: UserIcon },
];

export const Sidebar = React.memo(
  ({
    isOpen,
    onClose,
    activeTab,
    onNavigate,
    unreadCount = 0,
    profile,
    isAuthenticated = false,
    onLogin,
    onLogout,
  }) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [authDialog, setAuthDialog] = React.useState({ open: false, mode: 'login' });

    const handleAuthSuccess = async (data) => {
      await onLogin?.(data);
      setAuthDialog({ open: false, mode: 'login' });
    };

    const toggleCollapse = () => {
      setCollapsed(!collapsed);
    };

    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 ${collapsed ? 'w-20' : 'w-64'} flex flex-col shadow-lg`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                  <Typography variant="h5" className="text-white font-bold">
                    E
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" className="font-bold text-gray-900">
                    Enterprise
                  </Typography>
                  <Typography variant="small" className="text-gray-500 text-xs">
                    v1.0.0
                  </Typography>
                </div>
              </div>
            )}

            {/* Mobile Close / Desktop Collapse */}
            <div className="flex items-center gap-2">
              <IconButton
                variant="text"
                size="sm"
                className="hidden lg:flex"
                onClick={toggleCollapse}
              >
                {collapsed ? (
                  <ChevronRightIcon className="h-5 w-5" />
                ) : (
                  <ChevronLeftIcon className="h-5 w-5" />
                )}
              </IconButton>

              <IconButton variant="text" size="sm" className="lg:hidden" onClick={onClose}>
                <XMarkIcon className="h-5 w-5" />
              </IconButton>
            </div>
          </div>

          {/* Profile Section */}
          {isAuthenticated && profile && !collapsed && (
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center gap-3">
                <Avatar
                  src={profile.avatar}
                  size="md"
                  fallback={profile.name?.charAt(0)}
                  className="ring-2 ring-blue-200"
                />
                <div className="flex-1 min-w-0">
                  <Typography variant="small" className="font-semibold text-gray-900 truncate">
                    {profile.name}
                  </Typography>
                  <Typography variant="small" className="text-gray-600 text-xs truncate">
                    {profile.title}
                  </Typography>
                </div>
              </div>
            </div>
          )}

          {isAuthenticated && profile && collapsed && (
            <div className="p-4 border-b border-gray-200 flex justify-center">
              <Avatar
                src={profile.avatar}
                size="sm"
                fallback={profile.name?.charAt(0)}
                className="ring-2 ring-blue-200"
              />
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-3 overflow-y-auto">
            <ul className="space-y-1">
              {NAVIGATION_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const showBadge = item.badge && unreadCount > 0;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onNavigate(item.id);
                        if (window.innerWidth < 1024) onClose?.();
                      }}
                      className={`w-full flex items-center ${
                        collapsed ? 'justify-center' : 'gap-3'
                      } px-3 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      title={collapsed ? item.label : ''}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left font-medium">{item.label}</span>
                          {showBadge && (
                            <Badge color="red" size="sm">
                              {unreadCount > 9 ? '9+' : unreadCount}
                            </Badge>
                          )}
                        </>
                      )}
                      {collapsed && showBadge && (
                        <span className="absolute top-2 right-2 h-2 w-2 bg-red-600 rounded-full"></span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer - Auth Section */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className={`w-full flex items-center ${
                  collapsed ? 'justify-center' : 'gap-3'
                } px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors`}
                title={collapsed ? 'Logout' : ''}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">Logout</span>}
              </button>
            ) : (
              !collapsed && (
                <div className="space-y-2">
                  <button
                    onClick={() => setAuthDialog({ open: true, mode: 'login' })}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setAuthDialog({ open: true, mode: 'signup' })}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )
            )}

            {!isAuthenticated && collapsed && (
              <button
                onClick={() => setAuthDialog({ open: true, mode: 'login' })}
                className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
                title="Sign In"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </aside>

        {/* Auth Dialog */}
        <Dialog
          open={authDialog.open}
          handler={() => setAuthDialog({ ...authDialog, open: false })}
          size="sm"
          className="bg-transparent shadow-none"
        >
          <DialogBody className="p-0 rounded-2xl overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={() => setAuthDialog({ ...authDialog, open: false })}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="bg-white p-8">
              {authDialog.mode === 'login' ? (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl mb-4">
                      <Typography variant="h3" className="text-white font-bold">
                        E
                      </Typography>
                    </div>
                  </div>
                  <LoginForm
                    onLogin={handleAuthSuccess}
                    onForgotPassword={() => {}}
                    onSignUp={() => setAuthDialog({ open: true, mode: 'signup' })}
                  />
                </>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl mb-4">
                      <Typography variant="h3" className="text-white font-bold">
                        E
                      </Typography>
                    </div>
                  </div>
                  <SignUpForm
                    onSignUp={handleAuthSuccess}
                    onLogin={() => setAuthDialog({ open: true, mode: 'login' })}
                  />
                </>
              )}
            </div>
          </DialogBody>
        </Dialog>
      </>
    );
  }
);

Sidebar.displayName = 'Sidebar';
