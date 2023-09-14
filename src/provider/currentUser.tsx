import CurrentUserContext from "@/context/currentUser";
import { User } from "@/entities/user.entity";
import { ReactNodeChildren } from "@/types";
import { useState } from "react";

export const CurrentUserProvider = ({ children }: ReactNodeChildren) => {
  // State
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Actions
  const login = (user: User) => {
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
