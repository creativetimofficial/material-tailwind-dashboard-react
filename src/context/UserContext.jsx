import { createContext, useContext, useState } from "react";
import useVerifyUser from "@/apiHooks/user/useVerifyUser";
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  console.log("Rendering At First and Every REnder");
  // User State
  const [user, setuser] = useState();
  useVerifyUser(setuser);

  return (
    <UserContext.Provider value={{ setuser, user }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);
export { UserContextProvider, useUserContext };
