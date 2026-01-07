// ============================================
// hooks/useProfile.js
// ============================================

import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { validateEmail, validatePhone, validateRequired, validateLength } from '../utils/validators';
import { VALIDATION_RULES } from '../utils/constants';

const initialProfileData = {
  name: "Richard Davis",
  title: "Chief Executive Officer",
  email: "richard.davis@company.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Experienced technology executive with over 15 years of leadership in enterprise software development. Focused on building high-performing teams and delivering innovative solutions.",
  avatar: "https://i.pravatar.cc/300?img=33",
  company: "TechCorp Industries",
  website: "https://techcorp.com",
  timezone: "PST",
  language: "English",
  socialLinks: {
    linkedin: "",
    twitter: "",
    github: "",
  }
};

export const useProfile = () => {
  const [profileData, setProfileData] = useLocalStorage('dashboard_profile', initialProfileData);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profileData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Start editing
  const startEditing = useCallback(() => {
    setTempProfile(profileData);
    setIsEditing(true);
    setErrors({});
  }, [profileData]);

  // Cancel editing
  const cancelEditing = useCallback(() => {
    setTempProfile(profileData);
    setIsEditing(false);
    setErrors({});
  }, [profileData]);

  // Update temp profile field
  const updateField = useCallback((field, value) => {
    setTempProfile(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  // Update social link
  const updateSocialLink = useCallback((platform, url) => {
    setTempProfile(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: url
      }
    }));
  }, []);

  // Validate profile data
  const validateProfile = useCallback((data) => {
    const newErrors = {};

    // Validate name
    const nameValidation = validateRequired(data.name, 'Name');
    if (!nameValidation.valid) {
      newErrors.name = nameValidation.message;
    } else {
      const lengthValidation = validateLength(
        data.name, 
        2, 
        VALIDATION_RULES.MAX_NAME_LENGTH, 
        'Name'
      );
      if (!lengthValidation.valid) {
        newErrors.name = lengthValidation.message;
      }
    }

    // Validate email
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.message;
    }

    // Validate phone (if provided)
    if (data.phone) {
      const phoneValidation = validatePhone(data.phone);
      if (!phoneValidation.valid) {
        newErrors.phone = phoneValidation.message;
      }
    }

    // Validate bio length (if provided)
    if (data.bio) {
      const bioValidation = validateLength(
        data.bio,
        0,
        VALIDATION_RULES.MAX_BIO_LENGTH,
        'Bio'
      );
      if (!bioValidation.valid) {
        newErrors.bio = bioValidation.message;
      }
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  }, []);

  // Save profile
  const saveProfile = useCallback(() => {
    setLoading(true);

    try {
      // Validate profile data
      const validation = validateProfile(tempProfile);
      
      if (!validation.isValid) {
        setErrors(validation.errors);
        setLoading(false);
        return { success: false, errors: validation.errors };
      }

      // Save profile
      setProfileData(tempProfile);
      setIsEditing(false);
      setErrors({});
      
      return { success: true };
    } catch (error) {
      console.error('Error saving profile:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [tempProfile, validateProfile, setProfileData]);

  // Update avatar
  const updateAvatar = useCallback((avatarUrl) => {
    setLoading(true);

    try {
      setProfileData(prev => ({
        ...prev,
        avatar: avatarUrl
      }));
      
      if (isEditing) {
        setTempProfile(prev => ({
          ...prev,
          avatar: avatarUrl
        }));
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error updating avatar:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [setProfileData, isEditing]);

  // Reset profile to defaults
  const resetProfile = useCallback(() => {
    setProfileData(initialProfileData);
    setTempProfile(initialProfileData);
    setIsEditing(false);
    setErrors({});
  }, [setProfileData]);

  // Quick update (without validation)
  const quickUpdate = useCallback((field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  }, [setProfileData]);

  return {
    // Data
    profile: profileData,
    tempProfile,
    isEditing,
    loading,
    errors,

    // Actions
    startEditing,
    cancelEditing,
    saveProfile,
    updateField,
    updateSocialLink,
    updateAvatar,
    resetProfile,
    quickUpdate,

    // Validation
    validateProfile,
  };
};