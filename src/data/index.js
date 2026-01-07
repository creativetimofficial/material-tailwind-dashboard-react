export {
  initialProjects,
  getProjectById,
  getProjectsByStatus,
  getProjectsByPriority,
} from './initialProjects';
export {
  initialTeamMembers,
  getTeamMemberById,
  getTeamMembersByDepartment,
  getTeamMembersByStatus,
  getOnlineMembers,
} from './initialTeamMembers';
export {
  initialNotifications,
  getNotificationById,
  getUnreadNotifications,
  getNotificationsByType,
  getNotificationsByCategory,
  getRecentNotifications,
} from './initialNotifications';
export {
  dashboardStatistics,
  projectsByPriority,
  projectsByStatus,
  teamByDepartment,
  budgetAllocation,
  monthlyRevenue,
  projectTimeline,
  taskStatistics,
  teamPerformance,
  clientSatisfaction,
  getTotalRevenue,
  getTotalProfit,
  getAverageClientSatisfaction,
  getTaskCompletionRate,
} from './statistics';
