import React from 'react';
import { Button } from '../ui';
import { EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Input, Typography } from '@material-tailwind/react';

export const ForgotPasswordForm = React.memo(({ onSubmit, onBack }) => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit?.({ email });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div>
          <Typography variant="h5" className="font-bold text-gray-900 mb-2">
            Check Your Email
          </Typography>
          <Typography variant="small" className="text-gray-600">
            We've sent a password reset link to <strong>{email}</strong>
          </Typography>
        </div>

        <Button fullWidth variant="outlined" icon={ArrowLeftIcon} onClick={onBack}>
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to login
        </button>

        <Typography variant="h5" className="font-bold text-gray-900 mb-2">
          Forgot Password?
        </Typography>
        <Typography variant="small" className="text-gray-600">
          Enter your email and we'll send you a link to reset your password
        </Typography>
      </div>

      {/* Email */}
      <div>
        <Input
          type="email"
          label="Email Address"
          icon={<EnvelopeIcon className="h-5 w-5" />}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          error={!!error}
        />
        {error && (
          <Typography variant="small" color="red" className="mt-1">
            {error}
          </Typography>
        )}
      </div>

      {/* Submit Button */}
      <Button fullWidth loading={loading} disabled={loading} type="submit">
        Send Reset Link
      </Button>
    </form>
  );
});

ForgotPasswordForm.displayName = 'ForgotPasswordForm';
