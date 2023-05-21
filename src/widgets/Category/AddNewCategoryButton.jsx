import useAddCategory from "@/apiHooks/Category/useAddCategory";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";

const AddNewCategoryButton = ({ updater }) => {
  const [show, setshow] = useState(false);
  const [name, setname] = useState("");
  const addCategory = useAddCategory({ updater, setshow, setname });

  const handleSubmit = () => {
    addCategory(name);
  };
  return (
    <>
      {!show && (
        <Button
          onClick={() => setshow(!show)}
          variant="gradient"
          color="white"
          size="lg"
          className="mx-auto flex items-center gap-3 border-2"
        >
          <PlusCircleIcon strokeWidth={2} className="h-5 w-5" /> Create Category
        </Button>
      )}
      {/* /////////////////////////// */}
      {show && (
        <>
          <div className="flex items-center justify-center">
            <div className="flex w-52 flex-col gap-4">
              <Input
                onChange={(e) => setname(e.target.value)}
                label="Category Name"
              />
              <div className="flex justify-between">
                <Button onClick={handleSubmit}>Add+</Button>
                <Button onClick={() => setshow(false)} color="red">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddNewCategoryButton;
