import React from 'react';
import { Card, Button } from '../ui';
import { Input, Textarea, Typography } from '@material-tailwind/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const ProfileEditForm = React.memo(
  ({ profile, tempProfile, errors, onUpdateField, onSave, onCancel }) => {
    return (
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Typography variant="h6" className="font-bold">
              Edit Profile
            </Typography>
            <div className="flex gap-2">
              <Button size="sm" color="green" icon={CheckIcon} onClick={onSave}>
                Save
              </Button>
              <Button size="sm" variant="outlined" icon={XMarkIcon} onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Full Name *"
                  value={tempProfile?.name || ''}
                  onChange={(e) => onUpdateField('name', e.target.value)}
                  error={!!errors?.name}
                />
                {errors?.name && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.name}
                  </Typography>
                )}
              </div>

              <div>
                <Input
                  label="Title"
                  value={tempProfile?.title || ''}
                  onChange={(e) => onUpdateField('title', e.target.value)}
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Email *"
                  type="email"
                  value={tempProfile?.email || ''}
                  onChange={(e) => onUpdateField('email', e.target.value)}
                  error={!!errors?.email}
                />
                {errors?.email && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.email}
                  </Typography>
                )}
              </div>

              <div>
                <Input
                  label="Phone"
                  type="tel"
                  value={tempProfile?.phone || ''}
                  onChange={(e) => onUpdateField('phone', e.target.value)}
                  error={!!errors?.phone}
                />
                {errors?.phone && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.phone}
                  </Typography>
                )}
              </div>
            </div>

            {/* Location & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Location"
                value={tempProfile?.location || ''}
                onChange={(e) => onUpdateField('location', e.target.value)}
              />

              <Input
                label="Company"
                value={tempProfile?.company || ''}
                onChange={(e) => onUpdateField('company', e.target.value)}
              />
            </div>

            {/* Website */}
            <Input
              label="Website"
              type="url"
              value={tempProfile?.website || ''}
              onChange={(e) => onUpdateField('website', e.target.value)}
            />

            {/* Bio */}
            <div>
              <Textarea
                label="Bio"
                value={tempProfile?.bio || ''}
                onChange={(e) => onUpdateField('bio', e.target.value)}
                rows={4}
                error={!!errors?.bio}
              />
              {errors?.bio && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.bio}
                </Typography>
              )}
            </div>

            {/* Social Links */}
            <div>
              <Typography variant="small" className="font-semibold mb-3">
                Social Links
              </Typography>
              <div className="space-y-3">
                <Input
                  label="LinkedIn URL"
                  value={tempProfile?.socialLinks?.linkedin || ''}
                  onChange={(e) =>
                    onUpdateField('socialLinks', {
                      ...tempProfile?.socialLinks,
                      linkedin: e.target.value,
                    })
                  }
                />
                <Input
                  label="Twitter URL"
                  value={tempProfile?.socialLinks?.twitter || ''}
                  onChange={(e) =>
                    onUpdateField('socialLinks', {
                      ...tempProfile?.socialLinks,
                      twitter: e.target.value,
                    })
                  }
                />
                <Input
                  label="GitHub URL"
                  value={tempProfile?.socialLinks?.github || ''}
                  onChange={(e) =>
                    onUpdateField('socialLinks', {
                      ...tempProfile?.socialLinks,
                      github: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

ProfileEditForm.displayName = 'ProfileEditForm';
