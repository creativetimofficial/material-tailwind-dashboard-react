import ViewEmployee from "@/widgets/employee/viewEmployee";
import Residents from "@/widgets/users/residents";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

export const Users = () => {
  const [show, setshow] = useState(true);
  return (
    <>
      <div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={() => setshow(true)}>View Officers</Button>
          <Button onClick={() => setshow(false)}>View Residents</Button>
        </div>
        <div className="mt-10 flex items-center justify-center ">
          {show && (
            <div className="">
              <ViewEmployee />
            </div>
          )}
          {!show && (
            <div className="">
              <Residents />
              </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
