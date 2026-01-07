import React from 'react';
import { Button } from '../ui';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Input, Checkbox, Typography } from '@material-tailwind/react';

export const LoginForm = React.memo(
  ({ onLogin, onForgotPassword, onSignUp, onGoogleLogin, onGithubLogin }) => {
    const [formData, setFormData] = React.useState({
      email: '',
      password: '',
      remember: false,
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

      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validate()) return;

      setLoading(true);
      try {
        await onLogin?.(formData);
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
            Welcome Back
          </Typography>
          <Typography variant="small" className="text-gray-600">
            Sign in to your account to continue
          </Typography>
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

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <Checkbox
            label={
              <Typography variant="small" className="text-gray-700">
                Remember me
              </Typography>
            }
            checked={formData.remember}
            onChange={(e) => handleChange('remember', e.target.checked)}
          />
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Forgot password?
          </button>
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
          Sign In
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <Typography variant="small" className="text-gray-500">
            or continue with
          </Typography>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social Login */}
        <div className="flex gap-3">
          <Button fullWidth variant="outlined" type="button" onClick={onGoogleLogin}>
            Google
          </Button>

          <Button fullWidth variant="outlined" type="button" onClick={onGithubLogin}>
            GitHub
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <Typography variant="small" className="text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSignUp}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign up
            </button>
          </Typography>
        </div>
      </form>
    );
  }
);

LoginForm.displayName = 'LoginForm';
