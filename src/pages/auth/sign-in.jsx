import { AuthApi } from "@/api";
import { useAuth } from "@/hooks/Auth";
import { useSnackbar } from "@/hooks/SnackBar";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export function SignIn() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const {openSnackbar} = useSnackbar()
  const {setAuth,setAccount} = useAuth()
  const nav = useNavigate()
  const handleSubmit = (e)=>{
    e.preventDefault()
    setLoading(true)
    AuthApi.SignIn({email,password})
    .then((res)=>{
      setAccount(res.data.account);
      setAuth(res.data.token);
      setLoading(false)
      nav("/dashboard/home")
      openSnackbar("Sign In Successfully",{
        type:"success",
        duration:3000
      })
    })
    .catch((err)=>{
      setLoading(false)
      console.log(err.response.data.error)
      openSnackbar(err.response.data.error,{
        type:"error",
        duration:3000
      })
    })
  }
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              type="email"
              required
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              required
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="mt-6 flex justify-center items-center gap-2" fullWidth>
            Sign In 
            {loading && 
              <span className="flex justify-center items-center w-fit h-fit animate-spin">
                <Loader2 color="white" size={12} strokeWidth={3}/>
              </span>
            }
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/background.jpg"
          className="h-[600px] w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
