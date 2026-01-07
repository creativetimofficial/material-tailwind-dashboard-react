import { STORAGE_KEYS } from './';

/**
 * Store authentication token
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }
};

/**
 * Get authentication token
 */
export const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Remove authentication token
 */
export const removeAuthToken = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Store user data
 */
export const setUserData = (user) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

/**
 * Get user data
 */
export const getUserData = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Remove user data
 */
export const removeUserData = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  const user = getUserData();
  return !!(token && user);
};

/**
 * Clear all auth data
 */
export const clearAuthData = () => {
  removeAuthToken();
  removeUserData();
};

/**
 * Decode JWT token (basic implementation)
 */
export const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

/**
 * Check and refresh token if needed
 */
export const checkTokenValidity = () => {
  const token = getAuthToken();

  if (!token) return false;

  if (isTokenExpired(token)) {
    clearAuthData();
    return false;
  }

  return true;
};

/**
 * Get user role from token
 */
export const getUserRole = () => {
  const token = getAuthToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.role || null;
};

/**
 * Check if user has permission
 */
export const hasPermission = (requiredRole) => {
  const userRole = getUserRole();
  if (!userRole) return false;

  const roleHierarchy = {
    user: 1,
    moderator: 2,
    admin: 3,
    superadmin: 4,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};
