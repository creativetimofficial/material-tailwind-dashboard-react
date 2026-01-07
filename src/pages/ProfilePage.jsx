import React from 'react';
import { Card, Avatar, Button } from '../components/ui';
import { Typography, Input, Textarea } from '@material-tailwind/react';
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

export const ProfilePage = React.memo(
  ({ profile, isEditing, tempProfile, errors, onStartEdit, onSave, onCancel, onUpdateField }) => {
    if (!profile) {
      return (
        <Card>
          <div className="p-12 text-center">
            <Typography variant="h6" className="text-gray-500">
              Loading profile...
            </Typography>
          </div>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        {/* Main Profile Card */}
        <Card>
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
              {/* Left Side - Avatar & Basic Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full md:w-auto">
                <Avatar
                  src={profile.avatar}
                  size="xxl"
                  className="border-4 border-gray-200 shadow-lg"
                  fallback={profile.name?.charAt(0)}
                />

                <div className="text-center sm:text-left">
                  {isEditing ? (
                    <div className="space-y-3 w-full sm:w-80">
                      <Input
                        label="Full Name"
                        value={tempProfile.name}
                        onChange={(e) => onUpdateField('name', e.target.value)}
                        error={!!errors?.name}
                      />
                      {errors?.name && (
                        <Typography variant="small" color="red">
                          {errors.name}
                        </Typography>
                      )}
                      <Input
                        label="Title"
                        value={tempProfile.title}
                        onChange={(e) => onUpdateField('title', e.target.value)}
                      />
                    </div>
                  ) : (
                    <>
                      <Typography variant="h3" color="blue-gray" className="font-bold mb-2">
                        {profile.name}
                      </Typography>
                      <Typography variant="lead" className="text-gray-600 mb-4">
                        {profile.title}
                      </Typography>

                      {/* Contact Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <EnvelopeIcon className="h-4 w-4" />
                          <Typography variant="small">{profile.email}</Typography>
                        </div>
                        {profile.phone && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <PhoneIcon className="h-4 w-4" />
                            <Typography variant="small">{profile.phone}</Typography>
                          </div>
                        )}
                        {profile.location && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPinIcon className="h-4 w-4" />
                            <Typography variant="small">{profile.location}</Typography>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Right Side - Actions */}
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button size="sm" color="green" icon={CheckIcon} onClick={onSave}>
                      Save
                    </Button>
                    <Button size="sm" variant="outlined" icon={XMarkIcon} onClick={onCancel}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outlined" icon={PencilIcon} onClick={onStartEdit}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* About Section */}
            <div>
              <Typography variant="h6" className="font-bold mb-4">
                About
              </Typography>
              {isEditing ? (
                <div>
                  <Textarea
                    label="Bio"
                    value={tempProfile.bio}
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
              ) : (
                <Typography className="text-gray-700 leading-relaxed">
                  {profile.bio || 'No bio available'}
                </Typography>
              )}
            </div>

            {/* Additional Details */}
            {isEditing && (
              <>
                <div className="border-t border-gray-200 my-6"></div>
                <div className="space-y-4">
                  <Typography variant="h6" className="font-bold mb-4">
                    Contact Details
                  </Typography>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      value={tempProfile.email}
                      onChange={(e) => onUpdateField('email', e.target.value)}
                      error={!!errors?.email}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      value={tempProfile.phone}
                      onChange={(e) => onUpdateField('phone', e.target.value)}
                      error={!!errors?.phone}
                    />
                  </div>

                  <Input
                    label="Location"
                    value={tempProfile.location}
                    onChange={(e) => onUpdateField('location', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="p-6 text-center">
              <Typography variant="h4" color="blue" className="font-bold mb-1">
                24
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Projects Completed
              </Typography>
            </div>
          </Card>

          <Card>
            <div className="p-6 text-center">
              <Typography variant="h4" color="green" className="font-bold mb-1">
                4.8
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Average Rating
              </Typography>
            </div>
          </Card>

          <Card>
            <div className="p-6 text-center">
              <Typography variant="h4" color="purple" className="font-bold mb-1">
                156
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Tasks Completed
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    );
  }
);

ProfilePage.displayName = 'ProfilePage';
