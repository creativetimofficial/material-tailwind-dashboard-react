import React from 'react';
import { Card } from '../ui';
import { CompactStatCard } from '../dashboard';
import { Typography } from '@material-tailwind/react';
import { UsersIcon, UserPlusIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';

export const TeamStats = React.memo(({ statistics }) => {
  if (!statistics) return null;

  const stats = [
    {
      label: 'Total Members',
      value: statistics.total || 0,
      icon: UsersIcon,
      color: 'blue',
      trend: '+2 this month',
    },
    {
      label: 'Online Now',
      value: statistics.onlineCount || 0,
      icon: UserPlusIcon,
      color: 'green',
      trend: `${statistics.activePercentage || 0}% active`,
    },
    {
      label: 'Tasks Completed',
      value: statistics.totalTasksCompleted || 0,
      icon: ChartBarIcon,
      color: 'purple',
    },
    {
      label: 'Hours Worked',
      value: `${Math.round((statistics.totalHoursWorked || 0) / 1000)}k`,
      icon: ClockIcon,
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <CompactStatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Department Breakdown */}
      <Card>
        <div className="p-6">
          <Typography variant="h6" className="font-bold mb-4">
            Department Distribution
          </Typography>
          <div className="space-y-3">
            {statistics.byDepartment?.map((dept) => (
              <div key={dept.department} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  <Typography variant="small" className="capitalize text-gray-700">
                    {dept.department}
                  </Typography>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(dept.count / statistics.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <Typography
                    variant="small"
                    className="font-semibold text-gray-900 w-8 text-right"
                  >
                    {dept.count}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Status Distribution */}
      <Card>
        <div className="p-6">
          <Typography variant="h6" className="font-bold mb-4">
            Member Status
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statistics.byStatus?.map((status) => (
              <div key={status.status} className="p-4 bg-gray-50 rounded-lg text-center">
                <Typography variant="h5" className="font-bold text-gray-900 mb-1">
                  {status.count}
                </Typography>
                <Typography variant="small" className="text-gray-600 capitalize">
                  {status.status}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
});

TeamStats.displayName = 'TeamStats';
