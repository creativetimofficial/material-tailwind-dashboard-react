import useGetCategory from "@/apiHooks/Category/useGetCategory";
import React, { useEffect } from "react";
import CategoryCard from "@/widgets/Category/CategoryCard";
export const Categories = () => {
  const { data, getCatogery } = useGetCategory();
  //   useEffect(() => {
  //     getCatogery();
  //   }, []);

  return (
    <>
      <div>
        <h1 className="p-10 text-center text-3xl font-medium">Categories</h1>
        {/* Card Mapping */}
        <div className=" flex flex-wrap items-center justify-center gap-7">
          {data?.map((e) => (
            <CategoryCard
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
