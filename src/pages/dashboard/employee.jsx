
import AddEmployee from "@/widgets/employee/AddEmployee";
import ViewEmployee from "@/widgets/employee/viewEmployee";
import AddEmployee from "@/widgets/employee/AddEmployee";
import { Button } from "@material-tailwind/react";
import { set } from "date-fns";
import React, { useState } from "react";

export const Employee = () => {
  const [show, setshow] = useState(true);

  return (
    <>
      <div>
        {/* Buttons */}
        <div className="mt-3 flex items-center justify-center gap-x-6">
          <Button onClick={() => setshow(false)}>View Employees</Button>
          <Button onClick={() => setshow(true)}>Add Employees</Button>
        </div>
        <div className="mt-20 flex items-center justify-center ">
          {!show && <div className="">View Eplmoyess Component</div>}
          {show && (
            <div className="">
              <AddEmployee />
            </div>
          )}

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={() => setshow(false)}>View Employees</Button>
          <Button onClick={() => setshow(true)}>Add Employees</Button>
        </div>
        <div className="mt-10 flex items-center justify-center ">
          {!show && <div className="">
            <ViewEmployee/>
            </div>}
          {show && (
            <div className="">
              <AddEmployee />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Employee;
