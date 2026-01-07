// ============================================
// hooks/useNotifications.js
// ============================================

import { useState, useCallback, useMemo } from 'react';
import { initialNotifications } from '../data/initialNotifications';
import { useLocalStorage } from './useLocalStorage';
import { sortBy, groupBy } from '../utils/helpers';

export const useNotifications = () => {
  const [notifications, setNotifications] = useLocalStorage('dashboard_notifications', initialNotifications);
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    let result = [...notifications];

    // Filter by type
    if (filterType !== 'all') {
      result = result.filter(n => n.type === filterType);
    }

    // Filter by category
    if (filterCategory !== 'all') {
      result = result.filter(n => n.category === filterCategory);
    }

    // Filter by read status
    if (showOnlyUnread) {
      result = result.filter(n => !n.read);
    }

    // Sort by timestamp (newest first)
    result = sortBy(result, 'timestamp', 'desc');

    return result;
  }, [notifications, filterType, filterCategory, showOnlyUnread]);

  // Add new notification
  const addNotification = useCallback((notificationData) => {
    setLoading(true);

    try {
      const newNotification = {
        ...notificationData,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        priority: notificationData.priority || 'medium',
      };

      setNotifications(prev => [newNotification, ...prev]);
      return { success: true, notification: newNotification };
    } catch (error) {
      console.error('Error adding notification:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [setNotifications]);

  // Mark notification as read
  const markAsRead = useCallback((id) => {
    setLoading(true);

    try {
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
      return { success: true };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [setNotifications]);

  // Mark notification as unread
  const markAsUnread = useCallback((id) => {
    setLoading(true);

    try {
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, read: false } : notif
        )
      );
      return { success: true };
    } catch (error) {
      console.error('Error marking notification as unread:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [setNotifications]);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setLoading(true);

    try {
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
      return { success: true };
    } catch (error) {
      console.error('Error marking all as read:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [setNotifications]);

  // Delete notification
  const deleteNotification = useCallback((id) => {
    setLoading(true);

    try {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting notification:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [setNotifications]);

  // Delete all read notifications
  const deleteAllRead = useCallback(() => {
    setLoading(true);

    try {
      setNotifications(prev => prev.filter(notif => !notif.read));
      return { success: true };
    } catch (error) {
      console.error('Error deleting read notifications:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [setNotifications]);

  // Clear all notifications
  const clearAll = useCallback(() => {
    setLoading(true);

    try {
      setNotifications([]);
      return { success: true };
    } catch (error) {
      console.error('Error clearing notifications:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [setNotifications]);

  // Get notification by ID
  const getNotificationById = useCallback((id) => {
    return notifications.find(notif => notif.id === id);
  }, [notifications]);

  // Statistics
  const statistics = useMemo(() => {
    const unreadCount = notifications.filter(n => !n.read).length;
    const byType = groupBy(notifications, 'type');
    const byCategory = groupBy(notifications, 'category');
    const byPriority = groupBy(notifications, 'priority');

    // Get counts for each type
    const typeCounts = {
      success: byType.success?.length || 0,
      warning: byType.warning?.length || 0,
      error: byType.error?.length || 0,
      info: byType.info?.length || 0,
    };

    // Get recent notifications (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = notifications.filter(n => 
      new Date(n.timestamp) > oneDayAgo
    ).length;

    return {
      total: notifications.length,
      unreadCount,
      readCount: notifications.length - unreadCount,
      recentCount,
      byType: Object.keys(byType).map(type => ({
        type,
        count: byType[type].length
      })),
      byCategory: Object.keys(byCategory).map(category => ({
        category,
        count: byCategory[category].length
      })),
      byPriority: Object.keys(byPriority).map(priority => ({
        priority,
        count: byPriority[priority].length
      })),
      typeCounts,
    };
  }, [notifications]);

  // Get unread notifications
  const getUnreadNotifications = useCallback(() => {
    return notifications.filter(n => !n.read);
  }, [notifications]);

  // Get recent notifications (limit)
  const getRecentNotifications = useCallback((limit = 5) => {
    return sortBy(notifications, 'timestamp', 'desc').slice(0, limit);
  }, [notifications]);

  // Get notifications by type
  const getNotificationsByType = useCallback((type) => {
    return notifications.filter(n => n.type === type);
  }, [notifications]);

  // Get notifications by category
  const getNotificationsByCategory = useCallback((category) => {
    return notifications.filter(n => n.category === category);
  }, [notifications]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilterType('all');
    setFilterCategory('all');
    setShowOnlyUnread(false);
  }, []);

  return {
    // Data
    notifications: filteredNotifications,
    allNotifications: notifications,
    loading,

    // Filters
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    showOnlyUnread,
    setShowOnlyUnread,

    // Actions
    addNotification,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    deleteNotification,
    deleteAllRead,
    clearAll,
    getNotificationById,
    resetFilters,

    // Helpers
    getUnreadNotifications,
    getRecentNotifications,
    getNotificationsByType,
    getNotificationsByCategory,

    // Statistics
    statistics,
  };
};