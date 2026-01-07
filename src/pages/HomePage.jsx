import React from 'react';
import { StatCard } from '../components/dashboard';
import { dashboardStatistics } from '../data';

export const HomePage = React.memo(({ projects, teamMembersCount }) => {
  // Calculate dynamic statistics
  const statistics = React.useMemo(() => {
    const stats = [...dashboardStatistics];

    // Update projects count
    const projectsIndex = stats.findIndex((s) => s.title === 'Active Projects');
    if (projectsIndex !== -1) {
      stats[projectsIndex] = {
        ...stats[projectsIndex],
        value: projects.length.toString(),
        rawValue: projects.length,
      };
    }

    // Update team members count
    const teamIndex = stats.findIndex((s) => s.title === 'Team Members');
    if (teamIndex !== -1) {
      stats[teamIndex] = {
        ...stats[teamIndex],
        value: teamMembersCount.toString(),
        rawValue: teamMembersCount,
      };
    }

    return stats;
  }, [projects.length, teamMembersCount]);

  return (
    <div className="space-y-6">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {statistics.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>
    </div>
  );
});

HomePage.displayName = 'HomePage';
