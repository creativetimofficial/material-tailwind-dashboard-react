import ViewEmployee from "@/widgets/employee/viewEmployee";
import Residents from "@/widgets/users/residents";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import ShowButtons from "@/widgets/htmlComponents/ShowButtons";
export const Users = () => {
  const [show, setshow] = useState(true);
  return (
    <>
      <div>
        <ShowButtons
          button1={"View Officers"}
          button2={"View Residents"}
          setshow={setshow}
        />
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
