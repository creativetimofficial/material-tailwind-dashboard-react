import React from 'react';
import { Card, Avatar, Badge, Button, Tooltip, EmptyState } from '../components/ui';
import { formatDate, MEMBER_STATUS_COLORS } from '../utils';
import { Typography, IconButton } from '@material-tailwind/react';
import { PlusIcon, PencilIcon, TrashIcon, UsersIcon } from '@heroicons/react/24/outline';
const TABLE_HEADERS = ['Member', 'Email', 'Role', 'Department', 'Status', 'Join Date', 'Actions'];

export const TeamPage = React.memo(
  ({ members = [], onAddMember, onEditMember, onDeleteMember, loading = false }) => {
    if (loading) {
      return (
        <Card>
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        {/* Team Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="p-6">
              <Typography variant="small" className="text-gray-600 mb-2">
                Total Members
              </Typography>
              <Typography variant="h4" className="font-bold text-blue-600">
                {members.length}
              </Typography>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <Typography variant="small" className="text-gray-600 mb-2">
                Online Now
              </Typography>
              <Typography variant="h4" className="font-bold text-green-600">
                {members.filter((m) => m.status === 'online').length}
              </Typography>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <Typography variant="small" className="text-gray-600 mb-2">
                Departments
              </Typography>
              <Typography variant="h4" className="font-bold text-purple-600">
                {new Set(members.map((m) => m.department)).size}
              </Typography>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <Typography variant="small" className="text-gray-600 mb-2">
                Avg. Rating
              </Typography>
              <Typography variant="h4" className="font-bold text-orange-600">
                {members.length > 0
                  ? (members.reduce((sum, m) => sum + (m.rating || 0), 0) / members.length).toFixed(
                      1
                    )
                  : '0.0'}
              </Typography>
            </div>
          </Card>
        </div>

        {/* Team Members Table */}
        <Card>
          {/* Header */}
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h5" color="blue-gray" className="font-bold mb-1">
                  Team Members
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  Manage your team and their roles
                </Typography>
              </div>
              <Button size="sm" icon={PlusIcon} onClick={onAddMember}>
                Add Member
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {members.length === 0 ? (
              <EmptyState
                icon={UsersIcon}
                title="No team members yet"
                description="Start building your team by adding members"
                action={
                  <Button onClick={onAddMember} icon={PlusIcon}>
                    Add First Member
                  </Button>
                }
              />
            ) : (
              <table className="w-full min-w-max table-auto">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {TABLE_HEADERS.map((header) => (
                      <th key={header} className="p-4 text-left">
                        <Typography variant="small" className="font-bold text-gray-700 uppercase">
                          {header}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <MemberRow
                      key={member.id}
                      member={member}
                      onEdit={onEditMember}
                      onDelete={onDeleteMember}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </div>
    );
  }
);

TeamPage.displayName = 'TeamPage';

// Member Row Component
const MemberRow = React.memo(({ member, onEdit, onDelete }) => {
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

MemberRow.displayName = 'MemberRow';
