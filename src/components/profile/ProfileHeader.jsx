import React from 'react';
import { Avatar, Button } from '../ui';
import { Typography } from '@material-tailwind/react';
import {
  PencilIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

export const ProfileHeader = React.memo(({ profile, isEditable = true, onEdit }) => {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl"></div>

      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16">
          <Avatar
            src={profile?.avatar}
            size="xxl"
            className="border-4 border-white shadow-xl"
            fallback={profile?.name?.charAt(0)}
          />

          <div className="flex-1 text-center sm:text-left mb-4 sm:mb-0">
            <Typography variant="h3" className="font-bold text-gray-900 mb-1">
              {profile?.name || 'User Name'}
            </Typography>
            <Typography variant="lead" className="text-gray-600 mb-2">
              {profile?.title || 'Position'}
            </Typography>

            {/* Quick Info */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-600">
              {profile?.email && (
                <div className="flex items-center gap-1">
                  <EnvelopeIcon className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
              )}
              {profile?.location && (
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Edit Button */}
          {isEditable && onEdit && (
            <Button size="sm" variant="outlined" icon={PencilIcon} onClick={onEdit}>
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});

ProfileHeader.displayName = 'ProfileHeader';
