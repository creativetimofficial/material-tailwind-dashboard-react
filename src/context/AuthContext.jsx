import React from 'react';
import { useLocalStorage } from '../hooks';
import {
  loginWithEmail,
  signupWithEmail,
  loginWithGoogle,
  loginWithGithub,
  logoutUser,
} from '../lib/authService';

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('dashboard_user', null);
  const [loading, setLoading] = React.useState(false);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await loginWithEmail({ email, password });
      setUser(res.user);
      return { success: true, user: res.user };
    } catch (e) {
      return { success: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await signupWithEmail({ email, password });
      setUser(res.user);
      return { success: true, user: res.user };
    } catch (e) {
      return { success: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    const res = await loginWithGoogle();
    setUser(res.user);
  };

  const githubLogin = async () => {
    const res = await loginWithGithub();
    setUser(res.user);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    googleLogin,
    githubLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
