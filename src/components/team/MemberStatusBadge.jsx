import React from 'react';
import { Badge } from '../ui';
import { MEMBER_STATUS_COLORS } from '../../utils';

export const MemberStatusBadge = React.memo(({ status, size = 'sm', className = '' }) => {
  const statusConfig = {
    online: { label: 'Online', color: 'green' },
    offline: { label: 'Offline', color: 'gray' },
    away: { label: 'Away', color: 'yellow' },
    busy: { label: 'Busy', color: 'red' },
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <Badge color={MEMBER_STATUS_COLORS[status] || 'gray'} size={size} className={className}>
      {config.label}
    </Badge>
  );
});

MemberStatusBadge.displayName = 'MemberStatusBadge';
