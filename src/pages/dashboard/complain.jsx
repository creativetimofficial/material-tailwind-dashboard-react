import React, { useState } from "react";
import { Button, Textarea } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
// import { Textarea } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
export const Complain = () => {
  const [name] = useState("Huzaifa");
  const [userId, setUserId] = useState("123");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [email, setEmail] = useState("huzaifahkhan00@gmail.com");
  const [description, setDescription] = useState("");

  const categories = ["Technical", "Security", "Welfare", "Medical"];
  const subcategories = ["Technical", "Security", "Welfare", "Medical"];
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission
    console.log("Submitted:", {
      userId,
      name,
      category,
      subcategory,
      email,
      description,
    });
    // Reset the form fields
    return
    setUserId("");

    setCategory("");
    setSubCategory("");
    setEmail("");
    setDescription("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-3"></div>
        <label>Name:</label>
        <Input
          value={name}
          // onChange={(e) => setName(e.target.value)}
          size="lg"
          disabled
        />
        <div className="p-3"></div>
        <label>Email:</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email:"
          size="lg"
          disabled
        />
        <div className="p-5"></div>
        <div>
          <Select onChange={(e)=>setCategory(e)} 
              
              label="Categories" size="lg">
            {categories.map((category, index) => (
              <Option  key={index} value={category}  >
                {category}
              </Option>
            ))}
          </Select>
        </div>

        <div className="p-5"></div>
        <div>
        <Select onChange={(e)=>setSubCategory(e)} 
              
              label="Categories" size="lg">
            {categories.map((category, index) => (
              <Option  key={index} value={category}  >
                {category}
              </Option>
            ))}
          </Select>
        </div>

        <div className="p-5"></div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description:"
          size="lg"
          style={{ height: "100px", resize: "vertical" }}
        />
        <div className="p-5"></div>

        <Button type="submit" color="green">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Complain;
