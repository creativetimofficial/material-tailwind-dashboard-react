import { createContext, useContext, useState } from "react";
import useVerifyUser from "@/apiHooks/user/useVerifyUser";
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const user1 = JSON.parse(localStorage.getItem("user"));

  // User State
  const [user, setuser] = useState(null);
  useVerifyUser(user1, setuser);

  return (
    <UserContext.Provider value={{ setuser, user, user1 }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);
export { UserContextProvider, useUserContext };
