import { Button } from "@material-tailwind/react";
import { set } from "date-fns";
import React, { useState } from "react";

export const Employee = () => {
  const [show, setshow] = useState(false);

  return (
    <>
      <div>
        {/* Buttons */}
        <div className="mt-3 flex items-center justify-center gap-x-6">
          <Button onClick={() => setshow(true)}>View Employees</Button>
          <Button onClick={() => setshow(false)}>Add Employees</Button>
        </div>
        <div className="mt-32 flex items-center justify-center text-2xl">
          {show && <div className="">View Eplmoyess Component</div>}
          {!show && <div className="">Add Eplmoyess Component</div>}
        </div>
      </div>
    </>
  );
};

export default Employee;
