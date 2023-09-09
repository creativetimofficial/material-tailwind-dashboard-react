import { Admin } from "@/entities/admin.entity";
import { createContext } from "react";

type CurrentUserContextType = {
  // State
  currentUser: Admin | null;

  // Actions
  login: (user: Admin) => void;
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
