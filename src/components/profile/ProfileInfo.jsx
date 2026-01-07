import React from 'react';
import { Card } from '../ui';
import { Typography } from '@material-tailwind/react';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  BriefcaseIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

export const ProfileInfo = React.memo(({ profile }) => {
  const infoItems = [
    {
      icon: EnvelopeIcon,
      label: 'Email',
      value: profile?.email,
      show: !!profile?.email,
    },
    {
      icon: PhoneIcon,
      label: 'Phone',
      value: profile?.phone,
      show: !!profile?.phone,
    },
    {
      icon: MapPinIcon,
      label: 'Location',
      value: profile?.location,
      show: !!profile?.location,
    },
    {
      icon: BriefcaseIcon,
      label: 'Company',
      value: profile?.company,
      show: !!profile?.company,
    },
    {
      icon: GlobeAltIcon,
      label: 'Website',
      value: profile?.website,
      show: !!profile?.website,
      isLink: true,
    },
    {
      icon: CalendarIcon,
      label: 'Timezone',
      value: profile?.timezone,
      show: !!profile?.timezone,
    },
  ];

  return (
    <Card>
      <div className="p-6">
        <Typography variant="h6" className="font-bold mb-4">
          Contact Information
        </Typography>

        <div className="space-y-4">
          {infoItems
            .filter((item) => item.show)
            .map((item, idx) => (
              <InfoItem key={idx} {...item} />
            ))}
        </div>

        {/* Bio Section */}
        {profile?.bio && (
          <>
            <div className="border-t border-gray-200 my-6"></div>
            <div>
              <Typography variant="h6" className="font-bold mb-3">
                About
              </Typography>
              <Typography className="text-gray-700 leading-relaxed">{profile.bio}</Typography>
            </div>
          </>
        )}

        {/* Social Links */}
        {profile?.socialLinks && (
          <>
            <div className="border-t border-gray-200 my-6"></div>
            <div>
              <Typography variant="h6" className="font-bold mb-3">
                Social Links
              </Typography>
              <div className="flex gap-3">
                {profile.socialLinks.linkedin && (
                  <SocialLink href={profile.socialLinks.linkedin} platform="LinkedIn" />
                )}
                {profile.socialLinks.twitter && (
                  <SocialLink href={profile.socialLinks.twitter} platform="Twitter" />
                )}
                {profile.socialLinks.github && (
                  <SocialLink href={profile.socialLinks.github} platform="GitHub" />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
});

ProfileInfo.displayName = 'ProfileInfo';

// Info Item Component
const InfoItem = ({ icon: Icon, label, value, isLink }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-gray-100 rounded-lg">
      <Icon className="h-5 w-5 text-gray-600" />
    </div>
    <div className="flex-1">
      <Typography variant="small" className="text-gray-600 mb-1">
        {label}
      </Typography>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          {value}
        </a>
      ) : (
        <Typography variant="small" className="font-medium text-gray-900">
          {value}
        </Typography>
      )}
    </div>
  </div>
);

// Social Link Component
const SocialLink = ({ href, platform }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
  >
    {platform}
  </a>
);
