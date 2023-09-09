import CurrentUserContext from "@/context/currentUser";
import { Admin } from "@/entities/admin.entity";
import { ReactNodeChildren } from "@/types";
import { useState } from "react";

export const CurrentUserProvider = ({ children }: ReactNodeChildren) => {
  // State
  const [currentUser, setCurrentUser] = useState<Admin | null>(null);

  // Actions
  const login = (user: Admin) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const contextValue = {
    // State
    currentUser,

    // Actions
    login,
    logout,
  };

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
};
