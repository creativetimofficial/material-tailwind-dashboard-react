import React from 'react';
import { AuthLayout, SignUpForm } from '../../components/auth';
import { useAuth } from '../../context';

export const SignUpPage = React.memo(() => {
  const { signup, login } = useAuth();

  return (
    <AuthLayout title="Get Started" subtitle="Create your account">
      <SignUpForm onSignUp={signup} onLogin={login} />
    </AuthLayout>
  );
});

SignUpPage.displayName = 'SignUpPage';
