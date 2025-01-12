import { AuthApi } from "@/api";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function SignUp() {
  const [userData, setUserData] = useState({
    sponserId: "",
    email: "",
    firstName: "",
    lastName: "",
    name: "",
    password: "",
    agree: false,
    invitationId: null,
  })
  const [loading, setLoading] = useState(false)
  const searchQuery = new URLSearchParams(location.search);
  const sponser = searchQuery.get('sponser');
  const invitationId = searchQuery.get('invitationId');


  useEffect(() => {
    if (sponser && invitationId) {
      setUserData((prev) => ({
        ...prev,
        sponserId: sponser,
        invitationId: invitationId
      }))
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userData)
    AuthApi.SignUp(userData)
      .then((res) => {
        console.log(res)

      })
      .catch((err) => {
        console.log(err)
      })
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "agree") {
      setUserData((prev) => ({
        ...prev,
        [name]: !userData.agree
      }))
      return
    }
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img

          src="/img/background.jpg"
          className="h-[800px] w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-4">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Sponser ID
            </Typography>
            <Input
              size="lg"
              placeholder="123abcd123"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              type="text"
              required
              name="sponserId"
              value={userData.sponserId}
              disabled={userData.sponserId ? true : false}
              onChange={handleChange}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              First Name
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Last Name
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              name
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <Checkbox
            checked={userData.agree}
            onChange={handleChange}
            name="agree"
            required
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <Link
                  to="/terms/terms-and-conditions"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </Link>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6 h-12 flex justify-center items-center gap-2" fullWidth>
            Register Now
            {loading &&
              <span className="flex justify-center items-center w-fit h-fit animate-spin">
                <Loader2 color="white" size={16} strokeWidth={3} />
              </span>
            }
          </Button>


          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
