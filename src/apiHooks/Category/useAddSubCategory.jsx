import { toast } from "react-hot-toast";
import useGetCategory from "./useGetCategory";
import useAxios from "@/apiConfig/axiosInstance";
const useAddSubCategory = (setshow, updater, setsubCategory) => {
  const api = useAxios();

  const { getCatogery } = useGetCategory();
  const addSubCategory = async (name, categoryId) => {
    try {
      const { status, data } = await api.post("/subcategory", {
        name,
        categoryId,
      });
      if (status === 201) {
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
