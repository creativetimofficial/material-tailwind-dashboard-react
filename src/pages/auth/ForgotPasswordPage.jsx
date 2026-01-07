import React from 'react';
import { AuthLayout, ForgotPasswordForm } from '../../components/auth';
import { useAuth } from '../../context';

export const ForgotPasswordPage = React.memo(() => {
  const { forgotPassword } = useAuth();

  return (
    <AuthLayout title="Forgot Password" subtitle="Reset your password">
      <ForgotPasswordForm onSubmit={forgotPassword} onBack={() => window.history.back()} />
    </AuthLayout>
  );
});

ForgotPasswordPage.displayName = 'ForgotPasswordPage';
