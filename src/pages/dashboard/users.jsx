import ViewEmployee from "@/widgets/employee/viewEmployee";
import Residents from "@/widgets/users/residents";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import ShowButtons from "@/widgets/htmlComponents/ShowButtons";
export const Users = () => {
  const [show, setshow] = useState(0);
  return (
    <>
      <div>
        {/* <ShowButtons
          button1={"View Officers"}
          button2={"View Residents"}
          setshow={setshow}
        /> */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={() => setshow(0)}>{"View Officials"}</Button>
          <Button onClick={() => setshow(1)}>{"View Residents"}</Button>
          <Button onClick={() => setshow(2)}>{"View Committee"}</Button>
        </div>
        <div className="mt-10 flex items-center justify-center ">
          {show === 0 && (
            <div className="">
              <ViewEmployee />
            </div>
          )}
          {show === 2 && (
            <div className="">
              <ViewEmployee committee />
            </div>
          )}
          {show === 1 && (
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
