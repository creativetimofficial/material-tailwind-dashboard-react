import { User } from "@/entities/user.entity";
import { createContext } from "react";

type CurrentUserContextType = {
  // State
  currentUser: User | null;

  // Actions
  login: (user: User) => void;
  logout: VoidFunction;
};

const CurrentUserContext = createContext<CurrentUserContextType>({
  // State
  currentUser: null,

  // Actions
  login: () => {},
  logout: () => {},
});

export default CurrentUserContext;
