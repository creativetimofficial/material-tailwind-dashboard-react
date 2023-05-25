import React from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
Button
const logout = () => {
  return (
    <Button variant="outlined" className="flex items-center space-x-1 rounded-md px-4 py-2 ">
      <ArrowLeftOnRectangleIcon className="h-5 w-5" />
      <span>Logout</span>
    </Button>
  );
};

export default logout;
