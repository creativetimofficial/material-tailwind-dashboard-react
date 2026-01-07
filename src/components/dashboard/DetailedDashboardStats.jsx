export const DetailedDashboardStats = ({ projects = [], teamMembers = [] }) => {
  const detailedStats = React.useMemo(() => {
    const priorityBreakdown = projects.reduce((acc, p) => {
      acc[p.priority] = (acc[p.priority] || 0) + 1;
      return acc;
    }, {});

    const statusBreakdown = projects.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});

    const departmentBreakdown = teamMembers.reduce((acc, m) => {
      acc[m.department] = (acc[m.department] || 0) + 1;
      return acc;
    }, {});

    const now = new Date();
    const upcomingDeadlines = projects.filter((p) => {
      const deadline = new Date(p.deadline);
      const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      return diffDays > 0 && diffDays <= 7;
    }).length;

    return {
      priorityBreakdown,
      statusBreakdown,
      departmentBreakdown,
      upcomingDeadlines,
      avgProjectDuration: 4.2,
    };
  }, [projects, teamMembers]);

  const additionalStats = [
    {
      id: 5,
      title: 'Orta Layihə Müddəti',
      value: `${detailedStats.avgProjectDuration} ay`,
      change: '+0.5 ay',
      trend: 'up',
      icon: ClockIcon,
      color: 'indigo',
      description: 'keçən rübə nisbətən',
    },
    {
      id: 6,
      title: 'Yaxınlaşan Deadlinelər',
      value: detailedStats.upcomingDeadlines.toString(),
      change: 'Bu həftə',
      trend: detailedStats.upcomingDeadlines > 3 ? 'down' : 'up',
      icon: ExclamationTriangleIcon,
      color: detailedStats.upcomingDeadlines > 3 ? 'red' : 'green',
      description: 'diqqət tələb edir',
    },
  ];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Main Stats */}
      <DashboardStats projects={projects} teamMembers={teamMembers} />

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {additionalStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BreakdownCard
          title="Prioritetə görə Layihələr"
          data={detailedStats.priorityBreakdown}
          colors={{
            high: 'bg-red-500',
            medium: 'bg-orange-500',
            low: 'bg-green-500',
            critical: 'bg-purple-500',
          }}
        />
        <BreakdownCard
          title="Statusa görə Layihələr"
          data={detailedStats.statusBreakdown}
          colors={{
            active: 'bg-green-500',
            paused: 'bg-yellow-500',
            completed: 'bg-blue-500',
            cancelled: 'bg-gray-500',
          }}
        />
        <BreakdownCard
          title="Departamentə görə Komanda"
          data={detailedStats.departmentBreakdown}
          colors={{
            engineering: 'bg-blue-500',
            product: 'bg-purple-500',
            design: 'bg-pink-500',
            marketing: 'bg-orange-500',
            sales: 'bg-green-500',
          }}
        />
      </div>
    </div>
  );
};
