// ============================================
// hooks/useProjects.js
// ============================================

import { useState, useCallback, useMemo } from 'react';
import { initialProjects } from '../data/initialProjects';
import { useLocalStorage } from './useLocalStorage';
import { searchFilter, sortBy } from '../utils/helpers';
import { validateProjectName, validateBudget, validateDate } from '../utils/validators';

export const useProjects = () => {
  const [projects, setProjects] = useLocalStorage('dashboard_projects', initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'id', order: 'asc' });
  const [loading, setLoading] = useState(false);

  // Filtered and sorted projects with useMemo for performance
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Apply search filter
    if (searchTerm) {
      result = searchFilter(result, searchTerm, ['name', 'description', 'client']);
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(p => p.status === filterStatus);
    }

    // Apply priority filter
    if (filterPriority !== 'all') {
      result = result.filter(p => p.priority === filterPriority);
    }

    // Apply sorting
    if (sortConfig.key) {
      result = sortBy(result, sortConfig.key, sortConfig.order);
    }

    return result;
  }, [projects, searchTerm, filterStatus, filterPriority, sortConfig]);

  // Add new project
  const addProject = useCallback((projectData) => {
    setLoading(true);

    try {
      // Validate project data
      const nameValidation = validateProjectName(projectData.name);
      if (!nameValidation.valid) {
        throw new Error(nameValidation.message);
      }

      const budgetValidation = validateBudget(projectData.budget);
      if (!budgetValidation.valid) {
        throw new Error(budgetValidation.message);
      }

      const deadlineValidation = validateDate(projectData.deadline, true);
      if (!deadlineValidation.valid) {
        throw new Error(deadlineValidation.message);
      }

      const newProject = {
        ...projectData,
        id: Date.now(),
        completion: projectData.completion || 0,
        status: projectData.status || 'active',
        members: projectData.members || [],
        tasks: projectData.tasks || { total: 0, completed: 0, inProgress: 0, pending: 0 },
        startDate: projectData.startDate || new Date().toISOString().split('T')[0],
      };

      setProjects(prev => [...prev, newProject]);
      return { success: true, project: newProject };
    } catch (error) {
      console.error('Error adding project:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [setProjects]);

  // Update existing project
  const updateProject = useCallback((id, updates) => {
    setLoading(true);

    try {
      // Validate updates if they contain critical fields
      if (updates.name) {
        const nameValidation = validateProjectName(updates.name);
        if (!nameValidation.valid) {
          throw new Error(nameValidation.message);
        }
      }

      if (updates.budget) {
        const budgetValidation = validateBudget(updates.budget);
        if (!budgetValidation.valid) {
          throw new Error(budgetValidation.message);
        }
      }

      if (updates.deadline) {
        const deadlineValidation = validateDate(updates.deadline, true);
        if (!deadlineValidation.valid) {
          throw new Error(deadlineValidation.message);
        }
      }

      setProjects(prev =>
        prev.map(project =>
          project.id === id ? { ...project, ...updates } : project
        )
      );

      return { success: true };
    } catch (error) {
      console.error('Error updating project:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [setProjects]);

  // Delete project
  const deleteProject = useCallback((id) => {
    setLoading(true);

    try {
      setProjects(prev => prev.filter(project => project.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting project:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [setProjects]);

  // Get project by ID
  const getProjectById = useCallback((id) => {
    return projects.find(project => project.id === id);
  }, [projects]);

  // Update project completion
  const updateCompletion = useCallback((id, completion) => {
    return updateProject(id, { completion });
  }, [updateProject]);

  // Add member to project
  const addMemberToProject = useCallback((projectId, member) => {
    const project = getProjectById(projectId);
    if (!project) return { success: false, error: 'Project not found' };

    const updatedMembers = [...project.members, member];
    return updateProject(projectId, { members: updatedMembers });
  }, [getProjectById, updateProject]);

  // Remove member from project
  const removeMemberFromProject = useCallback((projectId, memberId) => {
    const project = getProjectById(projectId);
    if (!project) return { success: false, error: 'Project not found' };

    const updatedMembers = project.members.filter(m => m.id !== memberId);
    return updateProject(projectId, { members: updatedMembers });
  }, [getProjectById, updateProject]);

  // Update project status
  const updateStatus = useCallback((id, status) => {
    return updateProject(id, { status });
  }, [updateProject]);

  // Statistics
  const statistics = useMemo(() => {
    const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const avgCompletion = projects.length > 0
      ? projects.reduce((sum, p) => sum + p.completion, 0) / projects.length
      : 0;
    
    const statusCounts = projects.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});

    const priorityCounts = projects.reduce((acc, p) => {
      acc[p.priority] = (acc[p.priority] || 0) + 1;
      return acc;
    }, {});

    return {
      total: projects.length,
      totalBudget,
      avgCompletion: Math.round(avgCompletion),
      byStatus: statusCounts,
      byPriority: priorityCounts,
    };
  }, [projects]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterPriority('all');
    setSortConfig({ key: 'id', order: 'asc' });
  }, []);

  // Sort projects
  const sortProjects = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  return {
    // Data
    projects: filteredProjects,
    allProjects: projects,
    loading,
    
    // Filters
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortConfig,
    
    // Actions
    addProject,
    updateProject,
    deleteProject,
    getProjectById,
    updateCompletion,
    addMemberToProject,
    removeMemberFromProject,
    updateStatus,
    sortProjects,
    resetFilters,
    
    // Statistics
    statistics,
  };
};