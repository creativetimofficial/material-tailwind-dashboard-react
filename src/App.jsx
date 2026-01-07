import React from 'react';

// Hooks
import { useProjects, useTeamMembers, useNotifications, useProfile } from './hooks';

// Layout Components
import { Header, Sidebar, MobileTabNavigation } from './components/layout';

// Pages
import { HomePage, ProjectsPage, ProfilePage, TeamPage, NotificationsPage } from './pages';

// Dialogs
import { ProjectDialog, MemberDialog } from './components/dialogs';

// Utils
import { downloadJSON } from './utils';

export function App() {
  // State Management
  const [activeTab, setActiveTab] = React.useState('home');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [projectDialog, setProjectDialog] = React.useState({
    open: false,
    mode: 'add',
    data: null,
  });
  const [memberDialog, setMemberDialog] = React.useState({
    open: false,
    mode: 'add',
    data: null,
  });

  // Custom Hooks
  const projects = useProjects();
  const teamMembers = useTeamMembers();
  const notifications = useNotifications();
  const profile = useProfile();

  // Project Handlers
  const handleAddProject = React.useCallback(() => {
    setProjectDialog({ open: true, mode: 'add', data: null });
  }, []);

  const handleEditProject = React.useCallback((project) => {
    setProjectDialog({ open: true, mode: 'edit', data: project });
  }, []);

  const handleDeleteProject = React.useCallback(
    (id) => {
      if (window.confirm('Are you sure you want to delete this project?')) {
        projects.deleteProject(id);
      }
    },
    [projects]
  );

  const handleSaveProject = React.useCallback(
    (projectData) => {
      if (projectDialog.mode === 'add') {
        projects.addProject(projectData);
      } else {
        projects.updateProject(projectDialog.data.id, projectData);
      }
      setProjectDialog({ open: false, mode: 'add', data: null });
    },
    [projectDialog, projects]
  );

  // Team Member Handlers
  const handleAddMember = React.useCallback(() => {
    setMemberDialog({ open: true, mode: 'add', data: null });
  }, []);

  const handleEditMember = React.useCallback((member) => {
    setMemberDialog({ open: true, mode: 'edit', data: member });
  }, []);

  const handleDeleteMember = React.useCallback(
    (id) => {
      teamMembers.deleteMember(id);
    },
    [teamMembers]
  );

  const handleSaveMember = React.useCallback(
    (memberData) => {
      if (memberDialog.mode === 'add') {
        teamMembers.addMember(memberData);
      } else {
        teamMembers.updateMember(memberDialog.data.id, memberData);
      }
      setMemberDialog({ open: false, mode: 'add', data: null });
    },
    [memberDialog, teamMembers]
  );

  // Auth Handlers
  const handleLogin = React.useCallback(async (credentials) => {
    console.log('Login:', credentials);
    setIsAuthenticated(true);
    return { success: true };
  }, []);

  const handleLogout = React.useCallback(() => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsAuthenticated(false);
      console.log('Logged out');
    }
  }, []);

  // Export Data
  const handleExport = React.useCallback(() => {
    const exportData = {
      projects: projects.allProjects,
      teamMembers: teamMembers.allMembers,
      notifications: notifications.allNotifications,
      profile: profile.profile,
      exportDate: new Date().toISOString(),
    };
    downloadJSON(exportData, `dashboard-export-${new Date().toISOString().split('T')[0]}.json`);
  }, [projects, teamMembers, notifications, profile]);

  // Render current page
  const renderPage = React.useMemo(() => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            projects={projects.projects}
            searchTerm={projects.searchTerm}
            onSearchChange={projects.setSearchTerm}
            onAddProject={handleAddProject}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            onViewProject={(project) => console.log('View project:', project)}
            onSort={projects.sortProjects}
            sortConfig={projects.sortConfig}
            teamMembersCount={teamMembers.allMembers.length}
          />
        );

      case 'projects':
        return (
          <ProjectsPage
            projects={projects.projects}
            searchTerm={projects.searchTerm}
            onSearchChange={projects.setSearchTerm}
            onAddProject={handleAddProject}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            onViewProject={(project) => console.log('View project:', project)}
            onSort={projects.sortProjects}
            sortConfig={projects.sortConfig}
          />
        );

      case 'profile':
        return (
          <ProfilePage
            profile={profile.profile}
            isEditing={profile.isEditing}
            tempProfile={profile.tempProfile}
            errors={profile.errors}
            onStartEdit={profile.startEditing}
            onSave={profile.saveProfile}
            onCancel={profile.cancelEditing}
            onUpdateField={profile.updateField}
          />
        );

      case 'team':
        return (
          <TeamPage
            members={teamMembers.members}
            onAddMember={handleAddMember}
            onEditMember={handleEditMember}
            onDeleteMember={handleDeleteMember}
          />
        );

      case 'notifications':
        return (
          <NotificationsPage
            notifications={notifications.notifications}
            unreadCount={notifications.statistics.unreadCount}
            onMarkRead={notifications.markAsRead}
            onMarkAllRead={notifications.markAllAsRead}
            onDelete={notifications.deleteNotification}
          />
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Page not found</p>
          </div>
        );
    }
  }, [
    activeTab,
    projects,
    teamMembers,
    notifications,
    profile,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    handleAddMember,
    handleEditMember,
    handleDeleteMember,
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onNavigate={setActiveTab}
        unreadCount={notifications.statistics.unreadCount}
        profile={profile.profile}
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <Header
          profile={profile.profile}
          notifications={notifications.getRecentNotifications(5)}
          unreadCount={notifications.statistics.unreadCount}
          onNotificationClick={notifications.markAsRead}
          onMarkAllRead={notifications.markAllAsRead}
          onNavigate={setActiveTab}
          onExport={handleExport}
          onMenuToggle={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 md:py-8 mb-20 md:mb-0">{renderPage}</div>

        {/* Mobile Navigation */}
        <MobileTabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unreadCount={notifications.statistics.unreadCount}
        />
      </div>

      {/* Dialogs */}
      <ProjectDialog
        open={projectDialog.open}
        mode={projectDialog.mode}
        project={projectDialog.data}
        onClose={() => setProjectDialog({ open: false, mode: 'add', data: null })}
        onSave={handleSaveProject}
      />

      <MemberDialog
        open={memberDialog.open}
        mode={memberDialog.mode}
        member={memberDialog.data}
        onClose={() => setMemberDialog({ open: false, mode: 'add', data: null })}
        onSave={handleSaveMember}
      />
    </div>
  );
}

export default App;
