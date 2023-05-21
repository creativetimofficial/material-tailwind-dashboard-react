import useAddSubCategory from "@/apiHooks/Category/useAddSubCategory";
import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const AddSubCategoryButton = ({ categoryId, updater }) => {
  const [show, setshow] = useState(false);
  const [subCategory, setsubCategory] = useState("");
  const addSubCategory = useAddSubCategory(setshow, updater, setsubCategory);

  const handleCategory = async () => {
    if (!subCategory) {
      return toast.error("Please Enter Category");
    }
    addSubCategory(subCategory, categoryId);
  };
  return (
    <>
      <div className="">
        {show && (
          <>
            <div className="mt-3 flex flex-col gap-2">
              <Input
                value={subCategory}
                onChange={(e) => setsubCategory(e.target.value)}
                label="Add New Category"
                className="rounded-lg border border-black px-2"
                type="text"
              />
              <div className="flex  justify-between">
                <Button onClick={handleCategory}>Add New</Button>
                <Button color="red" onClick={() => setshow(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
        {!show && (
          <div
            onClick={() => setshow(true)}
            className="flex  h-10 cursor-pointer items-center justify-between gap-x-8 rounded-full bg-gray-600 px-3 text-xl text-white "
          >
            <span>Add New</span> <span>+</span>
          </div>
        )}
      </div>
    </>
  );
};

export default AddSubCategoryButton;
