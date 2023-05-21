import api from "@/apiConfig/axiosInstance";
import { toast } from "react-hot-toast";
import useGetCategory from "./useGetCategory";
const useAddSubCategory = (setshow, updater, setsubCategory) => {
  const { getCatogery } = useGetCategory();
  const addSubCategory = async (name, categoryId) => {
    try {
      const { status, data } = await api.post("/subcategory", {
        name,
        categoryId,
      });
      if (status === 201) {
        console.log(data);
        setshow(false);
        setsubCategory("");
        getCatogery();
        toast.success("SubCategory Added Successfully");
        updater((o) => !o);
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
    }
  };
  return addSubCategory;
};

export default useAddSubCategory;
