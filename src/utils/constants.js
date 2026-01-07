// Project Priority Levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

// Project Status
export const PROJECT_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Team Member Status
export const MEMBER_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  AWAY: 'away',
  BUSY: 'busy',
};

// Departments
export const DEPARTMENTS = {
  ENGINEERING: 'engineering',
  PRODUCT: 'product',
  DESIGN: 'design',
  MARKETING: 'marketing',
  SALES: 'sales',
  HR: 'hr',
  FINANCE: 'finance',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
};

// Priority Colors
export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.LOW]: 'green',
  [PRIORITY_LEVELS.MEDIUM]: 'blue',
  [PRIORITY_LEVELS.HIGH]: 'orange',
  [PRIORITY_LEVELS.CRITICAL]: 'red',
};

// Status Colors
export const STATUS_COLORS = {
  [PROJECT_STATUS.ACTIVE]: 'green',
  [PROJECT_STATUS.PAUSED]: 'orange',
  [PROJECT_STATUS.COMPLETED]: 'blue',
  [PROJECT_STATUS.CANCELLED]: 'red',
};

// Member Status Colors
export const MEMBER_STATUS_COLORS = {
  [MEMBER_STATUS.ONLINE]: 'green',
  [MEMBER_STATUS.OFFLINE]: 'gray',
  [MEMBER_STATUS.AWAY]: 'yellow',
  [MEMBER_STATUS.BUSY]: 'red',
};

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  WITH_TIME: 'MM/DD/YYYY HH:mm',
  TIME_ONLY: 'HH:mm',
};

// Pagination
export const ITEMS_PER_PAGE = 10;
export const DEFAULT_PAGE = 1;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'dashboard_user',
  AUTH_TOKEN: 'dashboard_auth_token',
  THEME: 'dashboard_theme',
  SETTINGS: 'dashboard_settings',
  FILTERS: 'dashboard_filters',
};

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  SIGNUP: '/api/auth/signup',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  PROJECTS: '/api/projects',
  TEAM: '/api/team',
  NOTIFICATIONS: '/api/notifications',
  PROFILE: '/api/profile',
  SETTINGS: '/api/settings',
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-()]+$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 50,
  MAX_BIO_LENGTH: 500,
  MIN_PROJECT_NAME_LENGTH: 3,
  MAX_PROJECT_NAME_LENGTH: 100,
};

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#2563eb',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#3b82f6',
  PURPLE: '#8b5cf6',
  PINK: '#ec4899',
};

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
};
