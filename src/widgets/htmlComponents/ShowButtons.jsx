import { Button } from "@material-tailwind/react";
import React from "react";

const ShowButtons = ({ setshow, button1, button2 }) => {
  return (
    <>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button onClick={() => setshow(true)}>{button1}</Button>
        <Button onClick={() => setshow(false)}>{button2}</Button>
      </div>
    </>
  );
};

export default ShowButtons;
