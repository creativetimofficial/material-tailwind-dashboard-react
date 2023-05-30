import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRegister from "../../apiHooks/user/useRegister";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

export function SignUp() {
  const signin = true;
  const registerUser = useRegister();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [registrationNumber, setregistrationNumber] = useState("");
  const [houseNo, sethouseNo] = useState("");
  const [streetNo, setstreetNo] = useState("");
  const [block, setblock] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Getting Category Id
    // const { _id } = data?.find((o) => o.name === category);
    registerUser(
      {
        name,
        email,
        password,
        confirmPassword,
        phoneNumber,
        registrationNumber,
        houseNo,
        streetNo,
        block,
        role: "Resident",
      },
      signin
    );
    // Reset the form fields
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Input
                label="Name"
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                required={false}
                type="email"
                label="Email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                required
                type="text"
                label="Phone Number"
                size="lg"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
              />
              <Input
                required
                type="text"
                label="Registration Number"
                size="lg"
                value={registrationNumber}
                onChange={(e) => setregistrationNumber(e.target.value)}
              />
              <Input
                required
                type="text"
                label="House Number"
                size="lg"
                value={houseNo}
                onChange={(e) => sethouseNo(e.target.value)}
              />
              <Input
                required
                type="text"
                label="Street Number"
                size="lg"
                value={streetNo}
                onChange={(e) => setstreetNo(e.target.value)}
              />
              <Select
                label="Select Block"
                placeholder="Select Block"
                onChange={(e) => setblock(e)}
              >
                <Option value="Block A">Block A</Option>
                <Option value="Block B">Block B</Option>
                <Option value="Block C">Block C</Option>
                <Option value="Block D">Block D</Option>
              </Select>

              <Input
                type="password"
                label="Password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                label="Confirm Password"
                size="lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="-ml-2.5">
                <Checkbox label="I agree the Terms and Conditions" />
              </div>
            </CardBody>

            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth type="submit">
                Register
              </Button>

              <Typography variant="small" className="mt-6 flex justify-center">
                Already have an account?
                <Link to="/login">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign in
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
