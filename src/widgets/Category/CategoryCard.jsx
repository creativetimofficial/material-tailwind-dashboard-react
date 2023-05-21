import React, { useState } from "react";
import SubCategoryCard from "./SubCategoryCard";
import AddSubCategoryButton from "./AddSubCategoryButton";
import useDeleteCategory from "@/apiHooks/Category/useDeleteCategory";

const CategoryCard = ({ name, id, subcategories, updater }) => {
  const deleteCategory = useDeleteCategory({ updater });
  return (
    <>
      <div
        key={id}
        className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-black p-4"
      >
        {/* Category Name */}
        <div className="flex w-full  text-2xl font-semibold">
          <h1 className="mx-auto">{name}</h1>
          <span
            className="flex cursor-pointer justify-end text-center text-red-800"
            onClick={() => deleteCategory(id, "category")}
          >
            X
          </span>
        </div>
        {subcategories?.map((e, index) => (
          <SubCategoryCard
            updater={updater}
            key={index}
            name={e.name}
            id={e._id}
          />
        ))}
        <div className="w-full">
          <AddSubCategoryButton updater={updater} categoryId={id} />
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
