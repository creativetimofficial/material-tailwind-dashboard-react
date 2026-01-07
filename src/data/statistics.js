import {
  CurrencyDollarIcon,
  ChartBarIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export const dashboardStatistics = [
  {
    id: 1,
    title: 'Total Revenue',
    value: '$282,460',
    rawValue: 282460,
    change: '+12.5%',
    changeValue: 12.5,
    trend: 'up',
    icon: CurrencyDollarIcon,
    color: 'green',
    description: 'Total revenue from all projects',
    period: 'This Quarter',
    details: {
      lastMonth: 245000,
      thisMonth: 282460,
      growth: 15.3,
    },
  },
  {
    id: 2,
    title: 'Active Projects',
    value: '6',
    rawValue: 6,
    change: '+2 new',
    changeValue: 2,
    trend: 'up',
    icon: ChartBarIcon,
    color: 'blue',
    description: 'Currently active projects',
    period: 'This Month',
    details: {
      total: 6,
      onTrack: 4,
      delayed: 1,
      atRisk: 1,
    },
  },
  {
    id: 3,
    title: 'Team Members',
    value: '12',
    rawValue: 12,
    change: '+2 this month',
    changeValue: 2,
    trend: 'up',
    icon: UsersIcon,
    color: 'purple',
    description: 'Total team members',
    period: 'Current',
    details: {
      online: 7,
      offline: 3,
      away: 2,
    },
  },
  {
    id: 4,
    title: 'Tasks Completed',
    value: '89',
    rawValue: 89,
    change: '-5%',
    changeValue: -5,
    trend: 'down',
    icon: CheckCircleIcon,
    color: 'orange',
    description: 'Tasks completed this month',
    period: 'This Month',
    details: {
      total: 145,
      completed: 89,
      pending: 56,
    },
  },
  {
    id: 5,
    title: 'Avg. Project Time',
    value: '4.2 months',
    rawValue: 4.2,
    change: '+0.5 months',
    changeValue: 0.5,
    trend: 'up',
    icon: ClockIcon,
    color: 'indigo',
    description: 'Average project completion time',
    period: 'Last 6 Months',
    details: {
      shortest: 2.5,
      longest: 6.8,
      average: 4.2,
    },
  },
  {
    id: 6,
    title: 'Issues',
    value: '3',
    rawValue: 3,
    change: '-2 from last week',
    changeValue: -2,
    trend: 'down',
    icon: ExclamationTriangleIcon,
    color: 'red',
    description: 'Active issues requiring attention',
    period: 'This Week',
    details: {
      critical: 1,
      high: 1,
      medium: 1,
      low: 0,
    },
  },
];

// Project statistics by priority
export const projectsByPriority = {
  critical: 1,
  high: 2,
  medium: 2,
  low: 1,
};

// Project statistics by status
export const projectsByStatus = {
  active: 6,
  paused: 0,
  completed: 8,
  cancelled: 1,
};

// Team statistics by department
export const teamByDepartment = {
  engineering: 8,
  product: 1,
  design: 1,
  marketing: 1,
  sales: 1,
};

// Budget allocation statistics
export const budgetAllocation = [
  { category: 'Development', value: 145000, percentage: 51 },
  { category: 'Design', value: 42000, percentage: 15 },
  { category: 'Marketing', value: 35000, percentage: 12 },
  { category: 'Operations', value: 28000, percentage: 10 },
  { category: 'Other', value: 32460, percentage: 12 },
];

// Monthly revenue data
export const monthlyRevenue = [
  { month: 'Jan', revenue: 35000, expenses: 28000, profit: 7000 },
  { month: 'Feb', revenue: 42000, expenses: 31000, profit: 11000 },
  { month: 'Mar', revenue: 38000, expenses: 29000, profit: 9000 },
  { month: 'Apr', revenue: 51000, expenses: 35000, profit: 16000 },
  { month: 'May', revenue: 48000, expenses: 33000, profit: 15000 },
  { month: 'Jun', revenue: 55000, expenses: 38000, profit: 17000 },
  { month: 'Jul', revenue: 62000, expenses: 42000, profit: 20000 },
  { month: 'Aug', revenue: 58000, expenses: 40000, profit: 18000 },
  { month: 'Sep', revenue: 67000, expenses: 45000, profit: 22000 },
  { month: 'Oct', revenue: 71000, expenses: 48000, profit: 23000 },
  { month: 'Nov', revenue: 68000, expenses: 46000, profit: 22000 },
  { month: 'Dec', revenue: 75000, expenses: 50000, profit: 25000 },
];

// Project completion timeline
export const projectTimeline = [
  { month: 'Aug', completed: 2, started: 3 },
  { month: 'Sep', completed: 1, started: 2 },
  { month: 'Oct', completed: 3, started: 1 },
  { month: 'Nov', completed: 2, started: 4 },
  { month: 'Dec', completed: 4, started: 2 },
  { month: 'Jan', completed: 3, started: 3 },
];

// Task statistics
export const taskStatistics = {
  total: 312,
  completed: 189,
  inProgress: 78,
  pending: 45,
  completionRate: 60.6,
  avgCompletionTime: 3.5, // days
};

// Team performance metrics
export const teamPerformance = [
  { member: 'Alex Thompson', tasks: 127, rating: 4.8, efficiency: 92 },
  { member: 'Maria Garcia', tasks: 89, rating: 4.9, efficiency: 94 },
  { member: 'James Wilson', tasks: 56, rating: 4.7, efficiency: 88 },
  { member: 'Sarah Williams', tasks: 78, rating: 4.6, efficiency: 85 },
  { member: 'Tom Brown', tasks: 94, rating: 4.9, efficiency: 96 },
  { member: 'Emily Davis', tasks: 112, rating: 4.8, efficiency: 91 },
  { member: 'David Wilson', tasks: 87, rating: 4.5, efficiency: 82 },
  { member: 'Lisa Anderson', tasks: 145, rating: 4.9, efficiency: 97 },
];

// Client satisfaction ratings
export const clientSatisfaction = [
  { client: 'TechCorp Industries', rating: 4.8, projects: 3 },
  { client: 'National Bank', rating: 4.6, projects: 2 },
  { client: 'RetailMax', rating: 4.9, projects: 1 },
  { client: 'DataInsights Corp', rating: 4.7, projects: 1 },
  { client: 'MediCare Plus', rating: 4.9, projects: 2 },
  { client: 'SocialPro Agency', rating: 4.5, projects: 1 },
];

// Helper functions
export const getTotalRevenue = () => {
  return monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0);
};

export const getTotalProfit = () => {
  return monthlyRevenue.reduce((sum, month) => sum + month.profit, 0);
};

export const getAverageClientSatisfaction = () => {
  const total = clientSatisfaction.reduce((sum, client) => sum + client.rating, 0);
  return (total / clientSatisfaction.length).toFixed(1);
};

export const getTaskCompletionRate = () => {
  return ((taskStatistics.completed / taskStatistics.total) * 100).toFixed(1);
};
