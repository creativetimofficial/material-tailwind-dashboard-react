import React from 'react';
import { Button } from '../ui';
import { UserIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Input, Checkbox, Typography } from '@material-tailwind/react';

export const SignUpForm = React.memo(({ onSignUp, onLogin }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await onSignUp?.(formData);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Typography variant="h5" className="font-bold text-gray-900 mb-2">
          Create Account
        </Typography>
        <Typography variant="small" className="text-gray-600">
          Sign up to get started
        </Typography>
      </div>

      {/* Name */}
      <div>
        <Input
          type="text"
          label="Full Name"
          icon={<UserIcon className="h-5 w-5" />}
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={!!errors.name}
        />
        {errors.name && (
          <Typography variant="small" color="red" className="mt-1">
            {errors.name}
          </Typography>
        )}
      </div>

      {/* Email */}
      <div>
        <Input
          type="email"
          label="Email Address"
          icon={<EnvelopeIcon className="h-5 w-5" />}
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={!!errors.email}
        />
        {errors.email && (
          <Typography variant="small" color="red" className="mt-1">
            {errors.email}
          </Typography>
        )}
      </div>

      {/* Phone */}
      <div>
        <Input
          type="tel"
          label="Phone Number (Optional)"
          icon={<PhoneIcon className="h-5 w-5" />}
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>

      {/* Password */}
      <div>
        <Input
          type="password"
          label="Password"
          icon={<LockClosedIcon className="h-5 w-5" />}
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={!!errors.password}
        />
        {errors.password && (
          <Typography variant="small" color="red" className="mt-1">
            {errors.password}
          </Typography>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <Input
          type="password"
          label="Confirm Password"
          icon={<LockClosedIcon className="h-5 w-5" />}
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <Typography variant="small" color="red" className="mt-1">
            {errors.confirmPassword}
          </Typography>
        )}
      </div>

      {/* Terms */}
      <div>
        <Checkbox
          label={
            <Typography variant="small" className="text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Terms and Conditions
              </a>
            </Typography>
          }
          checked={formData.agreeTerms}
          onChange={(e) => handleChange('agreeTerms', e.target.checked)}
        />
        {errors.agreeTerms && (
          <Typography variant="small" color="red" className="mt-1">
            {errors.agreeTerms}
          </Typography>
        )}
      </div>

      {/* Error Message */}
      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <Typography variant="small" color="red">
            {errors.submit}
          </Typography>
        </div>
      )}

      {/* Submit Button */}
      <Button fullWidth loading={loading} disabled={loading} type="submit">
        Create Account
      </Button>

      {/* Login Link */}
      <div className="text-center">
        <Typography variant="small" className="text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onLogin}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Sign in
          </button>
        </Typography>
      </div>
    </form>
  );
});

SignUpForm.displayName = 'SignUpForm';
