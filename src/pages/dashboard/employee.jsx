import ViewEmployee from "@/widgets/employee/viewEmployee";
import AddEmployee from "@/widgets/employee/AddEmployee";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import ShowButtons from "@/widgets/htmlComponents/ShowButtons";

export const Employee = () => {
  const [show, setshow] = useState(false);

  return (
    <>
      <div>
        <ShowButtons
          button2={"View Employees"}
          button1={"Add Employees"}
          setshow={setshow}
        />

        <div className="mt-10 flex items-center justify-center ">
          {!show && (
            <div className="">
              <ViewEmployee />
            </div>
          )}
          {show && (
            <div className="">
              <AddEmployee show={setshow} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Employee;
