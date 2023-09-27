import { Link } from "react-router-dom";
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

export function SignUp() {
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
            <p className="text-slate-900 mt-4 text-center">Sign Up</p>
          </Typography>{" "}
          <Typography variant="h7">
            <p className="mt-2 text-center text-gray-600">
              Create an account to get started.
            </p>
          </Typography>
          <CardBody className="flex flex-col gap-4">
            <Input crossOrigin={null} label="Name" size="lg" />
            <Input crossOrigin={null} type="email" label="Email" size="lg" />
            <Input
              crossOrigin={null}
              type="password"
              label="Password"
              size="lg"
            />
            <div className="-ml-2.5">
              <Checkbox
                crossOrigin={null}
                label="I agree the Terms and Conditions"
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
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
        </Card>
      </div>
    </>
  );
}

export default SignUp;
