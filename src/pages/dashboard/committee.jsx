import ViewEmployee from "@/widgets/employee/viewEmployee";
import AddEmployee from "@/widgets/employee/AddEmployee";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import ShowButtons from "@/widgets/htmlComponents/ShowButtons";

export const Committee = () => {
  const [show, setshow] = useState(false);

  return (
    <>
      <div>
        <ShowButtons
          button2={"View Committee Users"}
          button1={"Add Committee Users"}
          setshow={setshow}
        />

        <div className="mt-10 flex items-center justify-center ">
          {!show && (
            <div className="">
              <ViewEmployee committee />
            </div>
          )}
          {show && (
            <div className="">
              <AddEmployee committee show={setshow} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Committee;
