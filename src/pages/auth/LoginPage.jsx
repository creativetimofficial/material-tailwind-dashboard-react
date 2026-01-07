import React from 'react';
import { AuthLayout, LoginForm } from '../../components/auth';
import { useAuth } from '../../context';

export const LoginPage = () => {
  const { login, googleLogin, githubLogin } = useAuth();

  return (
    <AuthLayout>
      <LoginForm
        onLogin={login}
        onForgotPassword={() => {}}
        onSignUp={() => {}}
        onGoogleLogin={googleLogin}
        onGithubLogin={githubLogin}
      />
    </AuthLayout>
  );
};

LoginPage.displayName = 'LoginPage';
