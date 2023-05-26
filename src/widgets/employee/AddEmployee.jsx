import useAddEmployee from "@/apiHooks/employee/useAddEmployee";
import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

const AddEmployee = ({ show }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [designation, setdesignation] = useState("");

  //   Test cOde
  const [updater, setupdater] = useState(false);
  useEffect(() => {
    console.log("updater");
  }, [updater]);

  const addEmployee = useAddEmployee(setupdater, show);
  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee({
      name,
      email,
      password,
      confirmPassword,
      phoneNumber,
      designation,
    });
    setpassword("");
    setconfirmPassword("");
  };
  return (
    <>
      <div>
        <div className="p-7 text-center text-2xl font-medium">
          Employee Form
        </div>
        <form className="w-[25vw] space-y-6" onSubmit={handleSubmit}>
          <Input
            size="lg"
            required
            value={name}
            label="Enter Name"
            type="text"
            onChange={(e) => setname(e.target.value)}
          />
          <Input
            size="lg"
            required
            value={email}
            type="email"
            label="Enter Email"
            onChange={(e) => setemail(e.target.value)}
          />
          <Input
            size="lg"
            required
            value={password}
            type="password"
            label="Enter Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <Input
            size="lg"
            required
            value={confirmPassword}
            type="password"
            label="Enter Confirm Password"
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <Input
            size="lg"
            required
            value={phoneNumber}
            type="text"
            label="Enter Phone Number"
            onChange={(e) => setphoneNumber(e.target.value)}
          />
          <Input
            size="lg"
            required
            value={designation}
            type="text"
            label="Enter Designation"
            onChange={(e) => setdesignation(e.target.value)}
          />
          <Button className="w-full" type="submit" color="green">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
