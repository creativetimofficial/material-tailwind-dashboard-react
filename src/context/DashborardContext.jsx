import React from 'react';

const DashboardContext = React.createContext(null);

export const DashboardProvider = ({ children }) => {
  const [globalState, setGlobalState] = React.useState({
    sidebarOpen: true,
    theme: 'light',
    lastUpdated: new Date(),
  });

  const updateGlobalState = React.useCallback((updates) => {
    setGlobalState((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleSidebar = React.useCallback(() => {
    setGlobalState((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  }, []);

  const setTheme = React.useCallback((theme) => {
    setGlobalState((prev) => ({ ...prev, theme }));
  }, []);

  const value = React.useMemo(
    () => ({
      ...globalState,
      updateGlobalState,
      toggleSidebar,
      setTheme,
    }),
    [globalState, updateGlobalState, toggleSidebar, setTheme]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => {
  const context = React.useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
