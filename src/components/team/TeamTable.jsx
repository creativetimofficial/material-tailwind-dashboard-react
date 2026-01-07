import React from 'react';
import { Card, Button, EmptyState } from '../ui';
import { TeamMemberRow } from './';
import { PlusIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';

const TABLE_HEADERS = ['Member', 'Email', 'Role', 'Department', 'Status', 'Join Date', 'Actions'];

export const TeamTable = React.memo(
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
                  <TeamMemberRow
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
    );
  }
);

TeamTable.displayName = 'TeamTable';
