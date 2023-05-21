import useDeleteSubCategory from "@/apiHooks/Category/useDeleteSubCategory";
import React from "react";

const SubCategoryCard = ({ name, id, updater }) => {
  const deleteSubCategory = useDeleteSubCategory(updater);
  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <div className=" flex  h-10 cursor-pointer items-center justify-between gap-x-8 rounded-full bg-green-500 px-3 text-xl text-white">
          <span>{name}</span>{" "}
          <span onClick={() => deleteSubCategory(id, "subcategory")}>X</span>
        </div>
      </div>
    </>
  );
};

export default SubCategoryCard;
