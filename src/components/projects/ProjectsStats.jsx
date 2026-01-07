import React from 'react';
import {
  FolderIcon,
  RocketLaunchIcon,
  CheckBadgeIcon,
  ChartBarSquareIcon,
} from '@heroicons/react/24/outline';

export const ProjectsStats = ({ projects }) => {
  const stats = React.useMemo(() => {
    const total = projects.length;
    const active = projects.filter((p) => p.status === 'active').length;
    const completed = projects.filter((p) => p.status === 'completed').length;
    const avgCompletion =
      total > 0 ? Math.round(projects.reduce((sum, p) => sum + p.completion, 0) / total) : 0;

    return [
      {
        label: 'Total Projects',
        value: total,
        icon: FolderIcon,
        color: 'from-blue-500 to-cyan-500',
      },
      {
        label: 'Active',
        value: active,
        icon: RocketLaunchIcon,
        color: 'from-green-500 to-emerald-500',
      },
      {
        label: 'Completed',
        value: completed,
        icon: CheckBadgeIcon,
        color: 'from-purple-500 to-pink-500',
      },
      {
        label: 'Avg Completion',
        value: `${avgCompletion}%`,
        icon: ChartBarSquareIcon,
        color: 'from-orange-500 to-amber-500',
      },
    ];
  }, [projects]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-lg transition-shadow"
          >
            <div
              className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${stat.color} mb-3`}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

ProjectsStats.displayName = 'ProjectsStats';
