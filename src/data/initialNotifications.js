export const initialNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'Project Milestone Completed',
    message:
      'CRM System Phase 2 has been completed successfully. All deliverables met quality standards.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    read: false,
    priority: 'high',
    actionUrl: '/projects/1',
    actionLabel: 'View Project',
    category: 'project',
    relatedEntity: {
      type: 'project',
      id: 1,
      name: 'Enterprise CRM System',
    },
  },
  {
    id: 2,
    type: 'warning',
    title: 'Deadline Approaching',
    message: 'E-commerce Platform deadline is in 7 days. Current completion: 90%',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    read: false,
    priority: 'high',
    actionUrl: '/projects/3',
    actionLabel: 'View Details',
    category: 'deadline',
    relatedEntity: {
      type: 'project',
      id: 3,
      name: 'E-commerce Platform',
    },
  },
  {
    id: 3,
    type: 'info',
    title: 'New Team Member',
    message: 'John Smith has joined the Engineering team',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: true,
    priority: 'medium',
    actionUrl: '/team',
    actionLabel: 'View Team',
    category: 'team',
    relatedEntity: {
      type: 'team',
      id: 13,
      name: 'John Smith',
    },
  },
  {
    id: 4,
    type: 'error',
    title: 'Budget Alert',
    message: 'Mobile Banking App has exceeded 80% of allocated budget',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    read: false,
    priority: 'critical',
    actionUrl: '/projects/2',
    actionLabel: 'Review Budget',
    category: 'budget',
    relatedEntity: {
      type: 'project',
      id: 2,
      name: 'Mobile Banking App',
    },
  },
  {
    id: 5,
    type: 'success',
    title: 'Task Completed',
    message: 'Security audit for Healthcare Portal has been completed',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    read: true,
    priority: 'medium',
    actionUrl: '/projects/5',
    actionLabel: 'View Task',
    category: 'task',
    relatedEntity: {
      type: 'project',
      id: 5,
      name: 'Healthcare Portal',
    },
  },
  {
    id: 6,
    type: 'info',
    title: 'Meeting Reminder',
    message: 'Weekly team standup meeting starts in 30 minutes',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    read: false,
    priority: 'medium',
    actionUrl: '/calendar',
    actionLabel: 'View Calendar',
    category: 'meeting',
    relatedEntity: {
      type: 'meeting',
      id: 101,
      name: 'Weekly Standup',
    },
  },
  {
    id: 7,
    type: 'warning',
    title: 'Resource Allocation',
    message: 'AI Analytics Dashboard requires additional backend resources',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    read: true,
    priority: 'high',
    actionUrl: '/projects/4',
    actionLabel: 'Review Resources',
    category: 'resource',
    relatedEntity: {
      type: 'project',
      id: 4,
      name: 'AI Analytics Dashboard',
    },
  },
  {
    id: 8,
    type: 'success',
    title: 'Code Review Approved',
    message: 'Your pull request #234 has been approved and merged',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    read: true,
    priority: 'low',
    actionUrl: '/code-reviews',
    actionLabel: 'View PR',
    category: 'code',
    relatedEntity: {
      type: 'pull_request',
      id: 234,
      name: 'Feature: User Authentication',
    },
  },
  {
    id: 9,
    type: 'info',
    title: 'System Maintenance',
    message: 'Scheduled maintenance window this Saturday 2:00 AM - 4:00 AM UTC',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: false,
    priority: 'medium',
    actionUrl: '/settings',
    actionLabel: 'View Details',
    category: 'system',
    relatedEntity: {
      type: 'maintenance',
      id: 501,
      name: 'System Maintenance',
    },
  },
  {
    id: 10,
    type: 'warning',
    title: 'License Expiring',
    message: 'Your Figma team license will expire in 15 days',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    read: true,
    priority: 'high',
    actionUrl: '/settings/billing',
    actionLabel: 'Renew License',
    category: 'billing',
    relatedEntity: {
      type: 'license',
      id: 301,
      name: 'Figma Team License',
    },
  },
  {
    id: 11,
    type: 'success',
    title: 'Performance Bonus',
    message: "Congratulations! You've earned a performance bonus for Q4 2025",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    read: false,
    priority: 'medium',
    actionUrl: '/profile',
    actionLabel: 'View Details',
    category: 'hr',
    relatedEntity: {
      type: 'bonus',
      id: 401,
      name: 'Q4 Performance Bonus',
    },
  },
  {
    id: 12,
    type: 'info',
    title: 'New Feature Request',
    message: 'Client has requested a new feature for the CRM System',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    read: true,
    priority: 'low',
    actionUrl: '/projects/1',
    actionLabel: 'View Request',
    category: 'feature',
    relatedEntity: {
      type: 'feature_request',
      id: 601,
      name: 'Advanced Reporting Module',
    },
  },
];

// Helper functions
export const getNotificationById = (id) => {
  return initialNotifications.find((notif) => notif.id === id);
};

export const getUnreadNotifications = () => {
  return initialNotifications.filter((notif) => !notif.read);
};

export const getNotificationsByType = (type) => {
  return initialNotifications.filter((notif) => notif.type === type);
};

export const getNotificationsByCategory = (category) => {
  return initialNotifications.filter((notif) => notif.category === category);
};

export const getRecentNotifications = (limit = 5) => {
  return initialNotifications
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
};
