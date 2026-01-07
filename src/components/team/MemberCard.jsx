import React from 'react';
import { Card, Avatar, Badge, Button } from '../ui';
import { MEMBER_STATUS_COLORS } from '../../utils/';
import { Typography, IconButton } from '@material-tailwind/react';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export const MemberCard = React.memo(
  ({ member, onEdit, onDelete, onViewDetails, compact = false }) => {
    if (compact) {
      return (
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onViewDetails}>
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Avatar src={member.avatar} size="md" fallback={member.name?.charAt(0)} />
              <div className="flex-1 min-w-0">
                <Typography variant="small" className="font-semibold text-gray-900 truncate">
                  {member.name}
                </Typography>
                <Typography variant="small" className="text-gray-600 text-xs truncate">
                  {member.role}
                </Typography>
              </div>
              <Badge color={MEMBER_STATUS_COLORS[member.status]} size="sm">
                {member.status}
              </Badge>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <div className="p-6">
          {/* Header with Actions */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <Avatar src={member.avatar} size="xl" fallback={member.name?.charAt(0)} />
              <div>
                <Typography variant="h6" className="font-bold text-gray-900 mb-1">
                  {member.name}
                </Typography>
                <Typography variant="small" className="text-gray-600 mb-2">
                  {member.role}
                </Typography>
                <Badge color={MEMBER_STATUS_COLORS[member.status]} size="sm">
                  {member.status}
                </Badge>
              </div>
            </div>

            <div className="flex gap-1">
              <IconButton size="sm" variant="text" onClick={() => onEdit?.(member)}>
                <PencilIcon className="h-4 w-4" />
              </IconButton>
              <IconButton
                size="sm"
                variant="text"
                color="red"
                onClick={() => onDelete?.(member.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </IconButton>
            </div>
          </div>

          {/* Bio */}
          {member.bio && (
            <Typography variant="small" className="text-gray-700 mb-4 line-clamp-2">
              {member.bio}
            </Typography>
          )}

          {/* Contact Info */}
          <div className="space-y-2 mb-4">
            {member.email && (
              <div className="flex items-center gap-2 text-gray-600">
                <EnvelopeIcon className="h-4 w-4 flex-shrink-0" />
                <Typography variant="small" className="truncate">
                  {member.email}
                </Typography>
              </div>
            )}
            {member.phone && (
              <div className="flex items-center gap-2 text-gray-600">
                <PhoneIcon className="h-4 w-4 flex-shrink-0" />
                <Typography variant="small">{member.phone}</Typography>
              </div>
            )}
            {member.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPinIcon className="h-4 w-4 flex-shrink-0" />
                <Typography variant="small">{member.location}</Typography>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <Typography variant="h6" className="font-bold text-gray-900">
                {member.tasksCompleted || 0}
              </Typography>
              <Typography variant="small" className="text-gray-600 text-xs">
                Tasks
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h6" className="font-bold text-gray-900">
                {member.hoursWorked || 0}
              </Typography>
              <Typography variant="small" className="text-gray-600 text-xs">
                Hours
              </Typography>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Typography variant="h6" className="font-bold text-gray-900">
                  {member.rating || 0}
                </Typography>
                <StarSolidIcon className="h-4 w-4 text-yellow-600" />
              </div>
              <Typography variant="small" className="text-gray-600 text-xs">
                Rating
              </Typography>
            </div>
          </div>

          {/* Department & Projects */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <Typography variant="small" className="text-gray-600 text-xs">
                Department
              </Typography>
              <Typography variant="small" className="font-semibold text-gray-900 capitalize">
                {member.department}
              </Typography>
            </div>
            <div className="text-right">
              <Typography variant="small" className="text-gray-600 text-xs">
                Projects
              </Typography>
              <Typography variant="small" className="font-semibold text-gray-900">
                {member.projects?.length || 0}
              </Typography>
            </div>
          </div>

          {/* View Details Button */}
          {onViewDetails && (
            <Button size="sm" variant="outlined" className="w-full mt-4" onClick={onViewDetails}>
              View Details
            </Button>
          )}
        </div>
      </Card>
    );
  }
);

MemberCard.displayName = 'MemberCard';
