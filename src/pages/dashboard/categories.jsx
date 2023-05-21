import useGetCategory from "@/apiHooks/Category/useGetCategory";
import React, { useEffect, useState } from "react";
import CategoryCard from "@/widgets/Category/CategoryCard";
import AddNewCategoryButton from "@/widgets/Category/AddNewCategoryButton";
export const Categories = () => {
  const { data, getCatogery } = useGetCategory();
  const [updater, setupdater] = useState(false);

  useEffect(() => {
    getCatogery();
  }, [updater]);

  return (
    <>
      <div>
        <h1 className="p-10 text-center text-3xl font-medium">Categories</h1>
        <AddNewCategoryButton updater={setupdater} />
        {/* Card Mapping */}
        <div className=" mt-20 flex flex-wrap items-center justify-center gap-7">
          {data?.map((e) => (
            <CategoryCard
              updater={setupdater}
              key={e._id}
              id={e._id}
              name={e.name}
              subcategories={e.subcategories}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
