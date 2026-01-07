// ============================================
// hooks/useAuth.js
// ============================================

import React from 'react';
import { useLocalStorage } from './useLocalStorage';
import { setAuthToken, removeAuthToken, isTokenExpired } from '../utils/auth';

export const useAuth = () => {
  const [user, setUser] = useLocalStorage('dashboard_user', null);
  const [token, setToken] = useLocalStorage('dashboard_auth_token', null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Check if user is authenticated
  const isAuthenticated = React.useMemo(() => {
    if (!user || !token) return false;
    if (isTokenExpired(token)) {
      // Token expired, clear auth data
      setUser(null);
      setToken(null);
      removeAuthToken();
      return false;
    }
    return true;
  }, [user, token, setUser, setToken]);

  // Login function
  const login = React.useCallback(
    async (credentials) => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock response
        const mockUser = {
          id: Date.now(),
          name: credentials.name || 'User',
          email: credentials.email,
          role: 'admin',
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        };

        const mockToken = `mock-jwt-token-${Date.now()}`;

        // Save to state and storage
        setUser(mockUser);
        setToken(mockToken);
        setAuthToken(mockToken);

        return { success: true, user: mockUser };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [setUser, setToken]
  );

  // Signup function
  const signup = React.useCallback(
    async (userData) => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock response
        const mockUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: 'user',
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        };

        const mockToken = `mock-jwt-token-${Date.now()}`;

        // Save to state and storage
        setUser(mockUser);
        setToken(mockToken);
        setAuthToken(mockToken);

        return { success: true, user: mockUser };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [setUser, setToken]
  );

  // Logout function
  const logout = React.useCallback(() => {
    setUser(null);
    setToken(null);
    removeAuthToken();
    setError(null);
  }, [setUser, setToken]);

  // Forgot password function
  const forgotPassword = React.useCallback(async (email) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, message: 'Password reset link sent to your email' };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update user profile
  const updateUser = React.useCallback(
    (updates) => {
      setUser((prev) => (prev ? { ...prev, ...updates } : null));
    },
    [setUser]
  );

  // Refresh token
  const refreshToken = React.useCallback(async () => {
    if (!token) return { success: false };

    setLoading(true);
    try {
      // Simulate API call to refresh token
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newToken = `refreshed-token-${Date.now()}`;
      setToken(newToken);
      setAuthToken(newToken);

      return { success: true, token: newToken };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [token, setToken]);

  // Check token validity on mount
  React.useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [token, logout]);

  return {
    // State
    user,
    token,
    loading,
    error,
    isAuthenticated,

    // Actions
    login,
    signup,
    logout,
    forgotPassword,
    updateUser,
    refreshToken,

    // Clear error
    clearError: () => setError(null),
  };
};
