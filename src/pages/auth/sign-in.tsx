import { redirect, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import lockBackground from "../../../src/assets/img/lock_background.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "@/api/auth";

export function SignIn() {
  // Navigation
  const navigate = useNavigate();

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handlers
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const handleSubmit = async () => {
    // verify email and password
    if (email && password) {
      setLoading(true);
      const { data, error } = await login(email, password);

      if (error) {
        toast.error("Login failed");
      } else {
        toast.success("Login successful");

        navigate("/dashboard/home");
      }

      setLoading(false);
    } else {
      toast.warning("Email and password are required");
    }
  };

  return (
    <>
      <img
        src={lockBackground}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <Typography variant="h2">
            <p className="text-slate-900 mt-4 text-center">Sign In</p>
          </Typography>
          <Typography variant="h7">
            <p className="mt-2 text-center text-gray-600">
              Welcome back! Please sign in to continue.
            </p>
          </Typography>
          <CardBody className="flex flex-col gap-4">
            <Input
              crossOrigin={null}
              type="email"
              label="Email"
              size="lg"
              value={email}
              onChange={handleEmailChange}
            />
            <Input
              crossOrigin={null}
              type="password"
              label="Password"
              size="lg"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="-ml-2.5">
              <Checkbox crossOrigin={null} label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth>
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
