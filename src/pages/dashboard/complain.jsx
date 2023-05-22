import React, { useEffect, useState } from "react";
import { Button, Textarea } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
// import { Textarea } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import useGetCategory from "@/apiHooks/Category/useGetCategory";
import { toast } from "react-hot-toast";
import useAddComplain from "@/apiHooks/complain/useAddComplain";
export const Complain = () => {
  const { data, getCatogery } = useGetCategory();
  const addComplain = useAddComplain();
  useEffect(() => {
    getCatogery();
  }, []);
  const [name, setname] = useState("Huzaifa");
  const [userId, setUserId] = useState("123");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [email, setEmail] = useState("huzaifahkhan00@gmail.com");
  const [description, setDescription] = useState("");

  // SubCategory List
  const [subcategories, setsubcategories] = useState([]);

  // Making Categories For Selectors
  const handleParentSelect = (e) => {
    setsubcategories([]);
    const subCat = data?.find((o) => o.name === e);
    if (subCat) {
      setsubcategories(subCat?.subcategories);
    }
    setCategory(e);
  };
  // Handling Form Submit

  const handleSubmit = (e) => {
    e.preventDefault();
    // Getting Category Id
    const { _id } = data?.find((o) => o.name === category);
    addComplain({
      userId,
      name,
      category: _id,
      subcategory,
      email,
      description,
    });
    // Reset the form fields
    setUserId("");
    setCategory("");
    setSubCategory("");
    setEmail("");
    setDescription("");
  };
  return (
    <div>
      <form className="space-y-10" onSubmit={handleSubmit}>
        <div>
        <label>Name:</label>
        <Input
          value={name}
          onChange={(e) => setname(e.target.value)}
          size="lg"
        />
        </div>
        <div>
        <label>Email:</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="lg"
        />
        </div>
        {/* Parent Selector */}
        <div>
          <Select
            defaultValue={category}
            onChange={(e) => handleParentSelect(e)}
            label="Select Category"
            size="lg"
          >
            {data?.map((category, index) => (
              <Option key={index} value={category?.name}>
                {category?.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Child Selector */}

        <div>
          <Select
            disabled={subcategories?.length > 0 ? false : true}
            onChange={(e) => setSubCategory(e)}
            label="Select Sub Category"
            size="lg"
          >
            {subcategories?.map((category, index) => (
              <Option key={index} value={category?._id}>
                {category?.name}
              </Option>
            ))}
          </Select>
        </div>

        <Textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description:"
          size="lg"
          style={{ height: "100px", resize: "vertical" }}
        />

        <Button type="submit" color="green">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Complain;
