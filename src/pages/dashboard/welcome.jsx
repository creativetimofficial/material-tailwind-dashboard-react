import React from "react";
import welcome2 from "/img/welcome2.svg";
import { useUserContext } from "@/context/UserContext";
export const Welcome = () => {
  const { user } = useUserContext();
  return (
    <>
      <img src={welcome2} alt="" className="m-auto w-[35vw]" />
      <div className="flex justify-center font-sans text-4xl font-bold">
        Welcome &nbsp; <span className=""> {user?.name}</span>
      </div>
    </>
  );
};

export default Welcome;
