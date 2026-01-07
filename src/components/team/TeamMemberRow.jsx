import React from 'react';
import { Avatar, Badge, Tooltip } from '../ui';
import { formatDate, MEMBER_STATUS_COLORS } from '../../utils';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Typography, IconButton } from '@material-tailwind/react';

export const TeamMemberRow = React.memo(({ member, onEdit, onDelete }) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Member */}
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Avatar src={member.avatar} size="sm" fallback={member.name?.charAt(0)} />
          <div>
            <Typography variant="small" className="font-semibold text-gray-900">
              {member.name}
            </Typography>
            {member.location && (
              <Typography variant="small" className="text-gray-500 text-xs">
                {member.location}
              </Typography>
            )}
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="p-4">
        <Typography variant="small" className="text-gray-600">
          {member.email}
        </Typography>
      </td>

      {/* Role */}
      <td className="p-4">
        <Typography variant="small" className="font-medium text-gray-700">
          {member.role}
        </Typography>
      </td>

      {/* Department */}
      <td className="p-4">
        <Typography variant="small" className="text-gray-600 capitalize">
          {member.department}
        </Typography>
      </td>

      {/* Status */}
      <td className="p-4">
        <Badge color={MEMBER_STATUS_COLORS[member.status] || 'gray'} size="sm">
          {member.status}
        </Badge>
      </td>

      {/* Join Date */}
      <td className="p-4">
        <Typography variant="small" className="text-gray-600">
          {formatDate(member.joinDate, 'short')}
        </Typography>
      </td>

      {/* Actions */}
      <td className="p-4">
        <div className="flex gap-2">
          <Tooltip content="Edit">
            <IconButton size="sm" variant="text" onClick={() => onEdit?.(member)}>
              <PencilIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
          <Tooltip content="Delete">
            <IconButton
              size="sm"
              variant="text"
              color="red"
              onClick={() => {
                if (window.confirm(`Remove ${member.name} from the team?`)) {
                  onDelete?.(member.id);
                }
              }}
            >
              <TrashIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
        </div>
      </td>
    </tr>
  );
});

TeamMemberRow.displayName = 'TeamMemberRow';
