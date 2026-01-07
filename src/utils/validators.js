import { VALIDATION_RULES } from './';

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {object} Validation result
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valid: false, message: 'Email is required' };
  }

  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    return { valid: false, message: 'Invalid email format' };
  }

  return { valid: true, message: '' };
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {object} Validation result
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required' };
  }

  if (password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
    return {
      valid: false,
      message: `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters`,
    };
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }

  return { valid: true, message: '' };
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {object} Validation result
 */
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, message: 'Phone number is required' };
  }

  if (!VALIDATION_RULES.PHONE_REGEX.test(phone)) {
    return { valid: false, message: 'Invalid phone number format' };
  }

  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10) {
    return { valid: false, message: 'Phone number must be at least 10 digits' };
  }

  return { valid: true, message: '' };
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {object} Validation result
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (value === null || value === undefined || value === '') {
    return { valid: false, message: `${fieldName} is required` };
  }

  if (typeof value === 'string' && value.trim() === '') {
    return { valid: false, message: `${fieldName} is required` };
  }

  return { valid: true, message: '' };
};

/**
 * Validate text length
 * @param {string} text - Text to validate
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @param {string} fieldName - Field name for error message
 * @returns {object} Validation result
 */
export const validateLength = (text, minLength, maxLength, fieldName = 'This field') => {
  if (!text || typeof text !== 'string') {
    return { valid: false, message: `${fieldName} is required` };
  }

  if (text.length < minLength) {
    return {
      valid: false,
      message: `${fieldName} must be at least ${minLength} characters`,
    };
  }

  if (text.length > maxLength) {
    return {
      valid: false,
      message: `${fieldName} must be no more than ${maxLength} characters`,
    };
  }

  return { valid: true, message: '' };
};

/**
 * Validate project name
 * @param {string} name - Project name to validate
 * @returns {object} Validation result
 */
export const validateProjectName = (name) => {
  const requiredCheck = validateRequired(name, 'Project name');
  if (!requiredCheck.valid) return requiredCheck;

  return validateLength(
    name,
    VALIDATION_RULES.MIN_PROJECT_NAME_LENGTH,
    VALIDATION_RULES.MAX_PROJECT_NAME_LENGTH,
    'Project name'
  );
};

/**
 * Validate budget amount
 * @param {string|number} budget - Budget to validate
 * @returns {object} Validation result
 */
export const validateBudget = (budget) => {
  if (!budget) {
    return { valid: false, message: 'Budget is required' };
  }

  // Remove currency symbols and commas
  const cleanBudget = typeof budget === 'string' ? budget.replace(/[$,]/g, '') : budget;

  const amount = parseFloat(cleanBudget);

  if (isNaN(amount)) {
    return { valid: false, message: 'Budget must be a valid number' };
  }

  if (amount <= 0) {
    return { valid: false, message: 'Budget must be greater than 0' };
  }

  if (amount > 10000000) {
    return { valid: false, message: 'Budget cannot exceed $10,000,000' };
  }

  return { valid: true, message: '' };
};

/**
 * Validate date
 * @param {string} date - Date to validate
 * @param {boolean} futureOnly - Only allow future dates
 * @returns {object} Validation result
 */
export const validateDate = (date, futureOnly = false) => {
  if (!date) {
    return { valid: false, message: 'Date is required' };
  }

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return { valid: false, message: 'Invalid date format' };
  }

  if (futureOnly && dateObj < new Date()) {
    return { valid: false, message: 'Date must be in the future' };
  }

  return { valid: true, message: '' };
};

/**
 * Validate completion percentage
 * @param {number} percentage - Percentage to validate
 * @returns {object} Validation result
 */
export const validatePercentage = (percentage) => {
  const num = parseFloat(percentage);

  if (isNaN(num)) {
    return { valid: false, message: 'Percentage must be a number' };
  }

  if (num < 0 || num > 100) {
    return { valid: false, message: 'Percentage must be between 0 and 100' };
  }

  return { valid: true, message: '' };
};

/**
 * Validate form data
 * @param {object} data - Form data to validate
 * @param {object} rules - Validation rules
 * @returns {object} Validation result with errors
 */
export const validateForm = (data, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = data[field];

    if (rule.required) {
      const result = validateRequired(value, rule.label || field);
      if (!result.valid) {
        errors[field] = result.message;
        isValid = false;
        return;
      }
    }

    if (rule.type === 'email' && value) {
      const result = validateEmail(value);
      if (!result.valid) {
        errors[field] = result.message;
        isValid = false;
      }
    }

    if (rule.type === 'password' && value) {
      const result = validatePassword(value);
      if (!result.valid) {
        errors[field] = result.message;
        isValid = false;
      }
    }

    if (rule.type === 'phone' && value) {
      const result = validatePhone(value);
      if (!result.valid) {
        errors[field] = result.message;
        isValid = false;
      }
    }

    if (rule.minLength || rule.maxLength) {
      const result = validateLength(
        value,
        rule.minLength || 0,
        rule.maxLength || Infinity,
        rule.label || field
      );
      if (!result.valid) {
        errors[field] = result.message;
        isValid = false;
      }
    }

    if (rule.custom && typeof rule.custom === 'function') {
      const result = rule.custom(value);
      if (!result.valid) {
        errors[field] = result.message;
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};
