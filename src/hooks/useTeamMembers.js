// ============================================
// hooks/useTeamMembers.js
// ============================================

import { useState, useCallback, useMemo } from 'react';
import { initialTeamMembers } from '../data/initialTeamMembers';
import { useLocalStorage } from './useLocalStorage';
import { searchFilter, sortBy, groupBy } from '../utils/helpers';
import { validateEmail, validatePhone, validateRequired } from '../utils/validators';

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useLocalStorage('dashboard_team', initialTeamMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', order: 'asc' });
  const [loading, setLoading] = useState(false);

  // Filtered and sorted team members
  const filteredMembers = useMemo(() => {
    let result = [...teamMembers];

    // Apply search filter
    if (searchTerm) {
      result = searchFilter(result, searchTerm, ['name', 'email', 'role', 'department']);
    }

    // Apply department filter
    if (filterDepartment !== 'all') {
      result = result.filter(m => m.department === filterDepartment);
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(m => m.status === filterStatus);
    }

    // Apply sorting
    if (sortConfig.key) {
      result = sortBy(result, sortConfig.key, sortConfig.order);
    }

    return result;
  }, [teamMembers, searchTerm, filterDepartment, filterStatus, sortConfig]);

  // Add new team member
  const addMember = useCallback((memberData) => {
    setLoading(true);

    try {
      // Validate member data
      const nameValidation = validateRequired(memberData.name, 'Name');
      if (!nameValidation.valid) {
        throw new Error(nameValidation.message);
      }

      const emailValidation = validateEmail(memberData.email);
      if (!emailValidation.valid) {
        throw new Error(emailValidation.message);
      }

      if (memberData.phone) {
        const phoneValidation = validatePhone(memberData.phone);
        if (!phoneValidation.valid) {
          throw new Error(phoneValidation.message);
        }
      }

      // Check for duplicate email
      const emailExists = teamMembers.some(m => m.email === memberData.email);
      if (emailExists) {
        throw new Error('A team member with this email already exists');
      }

      const newMember = {
        ...memberData,
        id: Date.now(),
        status: memberData.status || 'offline',
        joinDate: memberData.joinDate || new Date().toISOString().split('T')[0],
        avatar: memberData.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        projects: memberData.projects || [],
        tasksCompleted: 0,
        hoursWorked: 0,
        rating: 0,
      };

      setTeamMembers(prev => [...prev, newMember]);
      return { success: true, member: newMember };
    } catch (error) {
      console.error('Error adding team member:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [teamMembers, setTeamMembers]);

  // Update existing team member
  const updateMember = useCallback((id, updates) => {
    setLoading(true);

    try {
      // Validate updates if they contain critical fields
      if (updates.email) {
        const emailValidation = validateEmail(updates.email);
        if (!emailValidation.valid) {
          throw new Error(emailValidation.message);
        }

        // Check for duplicate email (excluding current member)
        const emailExists = teamMembers.some(m => m.id !== id && m.email === updates.email);
        if (emailExists) {
          throw new Error('A team member with this email already exists');
        }
      }

      if (updates.phone) {
        const phoneValidation = validatePhone(updates.phone);
        if (!phoneValidation.valid) {
          throw new Error(phoneValidation.message);
        }
      }

      setTeamMembers(prev =>
        prev.map(member =>
          member.id === id ? { ...member, ...updates } : member
        )
      );

      return { success: true };
    } catch (error) {
      console.error('Error updating team member:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [teamMembers, setTeamMembers]);

  // Delete team member
  const deleteMember = useCallback((id) => {
    setLoading(true);

    try {
      setTeamMembers(prev => prev.filter(member => member.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting team member:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [setTeamMembers]);

  // Get member by ID
  const getMemberById = useCallback((id) => {
    return teamMembers.find(member => member.id === id);
  }, [teamMembers]);

  // Update member status
  const updateStatus = useCallback((id, status) => {
    return updateMember(id, { status });
  }, [updateMember]);

  // Assign member to project
  const assignToProject = useCallback((memberId, projectId) => {
    const member = getMemberById(memberId);
    if (!member) return { success: false, error: 'Member not found' };

    const updatedProjects = [...(member.projects || [])];
    if (!updatedProjects.includes(projectId)) {
      updatedProjects.push(projectId);
    }

    return updateMember(memberId, { projects: updatedProjects });
  }, [getMemberById, updateMember]);

  // Remove member from project
  const removeFromProject = useCallback((memberId, projectId) => {
    const member = getMemberById(memberId);
    if (!member) return { success: false, error: 'Member not found' };

    const updatedProjects = (member.projects || []).filter(pid => pid !== projectId);
    return updateMember(memberId, { projects: updatedProjects });
  }, [getMemberById, updateMember]);

  // Update member rating
  const updateRating = useCallback((id, rating) => {
    if (rating < 0 || rating > 5) {
      return { success: false, error: 'Rating must be between 0 and 5' };
    }
    return updateMember(id, { rating });
  }, [updateMember]);

  // Statistics
  const statistics = useMemo(() => {
    const byDepartment = groupBy(teamMembers, 'department');
    const byStatus = groupBy(teamMembers, 'status');
    
    const avgRating = teamMembers.length > 0
      ? teamMembers.reduce((sum, m) => sum + (m.rating || 0), 0) / teamMembers.length
      : 0;

    const totalTasksCompleted = teamMembers.reduce((sum, m) => sum + (m.tasksCompleted || 0), 0);
    const totalHoursWorked = teamMembers.reduce((sum, m) => sum + (m.hoursWorked || 0), 0);

    const onlineCount = teamMembers.filter(m => m.status === 'online').length;
    const offlineCount = teamMembers.filter(m => m.status === 'offline').length;

    return {
      total: teamMembers.length,
      byDepartment: Object.keys(byDepartment).map(dept => ({
        department: dept,
        count: byDepartment[dept].length
      })),
      byStatus: Object.keys(byStatus).map(status => ({
        status,
        count: byStatus[status].length
      })),
      avgRating: avgRating.toFixed(1),
      totalTasksCompleted,
      totalHoursWorked,
      onlineCount,
      offlineCount,
      activePercentage: teamMembers.length > 0 
        ? Math.round((onlineCount / teamMembers.length) * 100) 
        : 0
    };
  }, [teamMembers]);

  // Get members by department
  const getMembersByDepartment = useCallback((department) => {
    return teamMembers.filter(m => m.department === department);
  }, [teamMembers]);

  // Get online members
  const getOnlineMembers = useCallback(() => {
    return teamMembers.filter(m => m.status === 'online');
  }, [teamMembers]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setFilterDepartment('all');
    setFilterStatus('all');
    setSortConfig({ key: 'name', order: 'asc' });
  }, []);

  // Sort members
  const sortMembers = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  return {
    // Data
    members: filteredMembers,
    allMembers: teamMembers,
    loading,

    // Filters
    searchTerm,
    setSearchTerm,
    filterDepartment,
    setFilterDepartment,
    filterStatus,
    setFilterStatus,
    sortConfig,

    // Actions
    addMember,
    updateMember,
    deleteMember,
    getMemberById,
    updateStatus,
    assignToProject,
    removeFromProject,
    updateRating,
    sortMembers,
    resetFilters,

    // Helpers
    getMembersByDepartment,
    getOnlineMembers,

    // Statistics
    statistics,
  };
};