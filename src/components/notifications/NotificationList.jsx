import React from 'react';
import { Card, EmptyState } from '../ui';
import { NotificationItem } from './';
import { BellIcon } from '@heroicons/react/24/outline';

export const NotificationList = React.memo(
  ({
    notifications = [],
    onMarkRead,
    onDelete,
    onNotificationClick,
    emptyMessage = 'No notifications',
    emptyDescription = "You're all caught up!",
  }) => {
    if (notifications.length === 0) {
      return (
        <Card>
          <EmptyState icon={BellIcon} title={emptyMessage} description={emptyDescription} />
        </Card>
      );
    }

    return (
      <Card className="overflow-hidden">
        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={onMarkRead}
              onDelete={onDelete}
              onClick={() => onNotificationClick?.(notification)}
            />
          ))}
        </div>
      </Card>
    );
  }
);

NotificationList.displayName = 'NotificationList';
