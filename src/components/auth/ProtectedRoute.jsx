import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../ui';
import { useAuth } from '../../context';

export const ProtectedRoute = React.memo(({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/sign-in', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
});

ProtectedRoute.displayName = 'ProtectedRoute';
