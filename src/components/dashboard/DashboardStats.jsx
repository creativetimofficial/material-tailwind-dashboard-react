export const DashboardStats = ({ projects = [], teamMembers = [], tasks = {} }) => {
  const statistics = React.useMemo(() => {
    const totalRevenue = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const avgCompletion =
      projects.length > 0
        ? Math.round(projects.reduce((sum, p) => sum + p.completion, 0) / projects.length)
        : 0;
    const onlineMembers = teamMembers.filter((m) => m.status === 'online').length;
    const tasksCompleted = tasks?.completed || 0;
    const totalTasks = tasks?.total || 0;
    const completionRate = totalTasks > 0 ? Math.round((tasksCompleted / totalTasks) * 100) : 0;

    return [
      {
        id: 1,
        title: 'Ümumi Gəlir',
        value: `$${(totalRevenue / 1000).toFixed(0)}K`,
        change: '+12.5%',
        trend: 'up',
        icon: CurrencyDollarIcon,
        color: 'green',
        description: 'keçən rübə nisbətən',
      },
      {
        id: 2,
        title: 'Aktiv Layihələr',
        value: projects.length.toString(),
        change: `${avgCompletion}%`,
        trend: 'up',
        icon: ChartBarIcon,
        color: 'blue',
        description: 'orta tamamlanma dərəcəsi',
      },
      {
        id: 3,
        title: 'Komanda Üzvləri',
        value: teamMembers.length.toString(),
        change: `${onlineMembers} online`,
        trend: 'up',
        icon: UsersIcon,
        color: 'purple',
        description: 'hazırda aktiv',
      },
      {
        id: 4,
        title: 'Tamamlanan Tapşırıqlar',
        value: tasksCompleted.toString(),
        change: `${completionRate}%`,
        trend: completionRate >= 70 ? 'up' : 'down',
        icon: CheckCircleIcon,
        color: 'orange',
        description: 'tamamlanma faizi',
      },
    ];
  }, [projects, teamMembers, tasks]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statistics.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
};
