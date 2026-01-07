import React from 'react';
import { ProjectCard, ProjectFilters, ProjectModal, ProjectsStats } from '../components/projects';
import { PlusIcon, FolderIcon } from '@heroicons/react/24/outline';

export const ProjectsPage = () => {
  const [projects, setProjects] = React.useState([
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Building a modern e-commerce platform with React and Node.js',
      status: 'active',
      priority: 'high',
      completion: 75,
      deadline: '2026-03-15',
      budget: 50000,
      team: [1, 2, 3, 4],
    },
    {
      id: 2,
      name: 'Mobile Banking App',
      description: 'Secure mobile banking application for iOS and Android',
      status: 'active',
      priority: 'critical',
      completion: 60,
      deadline: '2026-02-28',
      budget: 120000,
      team: [1, 2, 3, 4, 5, 6],
    },
    {
      id: 3,
      name: 'AI Chatbot Integration',
      description: 'Integrate AI-powered chatbot for customer support',
      status: 'paused',
      priority: 'medium',
      completion: 40,
      deadline: '2026-04-10',
      budget: 35000,
      team: [1, 2, 3],
    },
    {
      id: 4,
      name: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard with data visualization',
      status: 'completed',
      priority: 'high',
      completion: 100,
      deadline: '2026-01-05',
      budget: 45000,
      team: [1, 2, 3, 4, 5],
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [filterPriority, setFilterPriority] = React.useState('all');
  const [viewMode, setViewMode] = React.useState('grid');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [sortKey, setSortKey] = React.useState('name');
  const [sortDirection, setSortDirection] = React.useState('asc');

  const filteredProjects = React.useMemo(() => {
    let filtered = projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || project.priority === filterPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    filtered.sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      if (sortKey === 'deadline') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [projects, searchTerm, filterStatus, filterPriority, sortKey, sortDirection]);

  const handleAddProject = () => {
    setSelectedProject(null);
    setModalOpen(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleDeleteProject = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleViewProject = (project) => {
    alert(`Viewing project: ${project.name}\n\nThis would open a detailed view.`);
  };

  const handleSaveProject = (projectData) => {
    if (selectedProject) {
      setProjects(projects.map((p) => (p.id === projectData.id ? projectData : p)));
    } else {
      setProjects([...projects, { ...projectData, team: [] }]);
    }
  };

  const handleSort = () => {
    if (sortKey === 'name') {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey('name');
      setSortDirection('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Manage and track your projects
            </p>
          </div>
          <button
            onClick={handleAddProject}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">New Project</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>

        {/* Statistics */}
        <ProjectsStats projects={projects} />

        {/* Filters & Search */}
        <ProjectFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onStatusChange={setFilterStatus}
          filterPriority={filterPriority}
          onPriorityChange={setFilterPriority}
          onSort={handleSort}
          sortDirection={sortDirection}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full p-6">
                <FolderIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No projects found</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Get started by creating your first project
            </p>
            <button
              onClick={handleAddProject}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onView={handleViewProject}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
        onSave={handleSaveProject}
      />
    </div>
  );
};

ProjectsPage.displayName = 'ProjectsPage';
