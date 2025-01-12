import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useAuth } from "@/hooks/Auth";
import { useEffect, useState } from "react";
import { AuthApi } from "@/api";
import { Loader2, X } from "lucide-react";
import { usePopup } from "@/hooks/Popup";
import { useSnackbar } from "@/hooks/SnackBar";

export function Profile() {
  const { auth } = useAuth();
  const { popup } = usePopup()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (auth) {
      setLoading(true)
      AuthApi.getUserData(auth)
        .then(res => {
          setLoading(false)
          setUser(res.data.user)
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
        })
    }
  }, [])

  return (
    <>
      {!loading && user && <>
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background.jpg')] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src={user?.photoLink || "https://res.cloudinary.com/dqdt57lxl/image/upload/v1733091929/jhl718s0eucpxdyqpzqh.png"}
                  alt={user?.name}
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    member
                  </Typography>
                </div>
              </div>
            </div>
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-1 xl:grid-cols-1">
              <ProfileInfoCard
                title="Profile Information"
                details={{
                  "first name": user?.firstName,
                  email: user?.email,
                }}
                action={
                  <Tooltip content="Edit Profile">
                    <PencilIcon onClick={() => popup.run(<EditUserDataModal setClose={() => popup.close()} />)} className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                  </Tooltip>
                }
              />
            </div>
            <div className="px-4 pb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Courses
              </Typography>
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                Enrolled Courses
              </Typography>
              <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                {user?.myCourses.map(
                  ({ courseId: { courseImage, courseTitle, courseDescription, category, _id } }) => (
                    <Card key={_id} color="#dfe9ed11" className="h-[300px] bg-blue-gray-100/20" shadow={false}>
                      <CardHeader
                        floated={false}
                        color="gray"
                        className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                      >
                        <img
                          src={courseImage}
                          alt={courseTitle}
                          className="h-full w-full object-cover"
                        />
                      </CardHeader>
                      <CardBody className="py-0 px-1">
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          {category}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mt-1 mb-2"
                        >
                          {courseTitle}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                          title={courseDescription}
                        >
                          {courseDescription.slice(0, 20)}
                        </Typography>
                      </CardBody>
                      <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                        <Link to={"/dashboard/course/" + _id}>
                          <Button variant="outlined" size="sm">
                            view Course
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  )
                )}
              </div>
            </div>
          </CardBody>
        </Card >
      </>
      }
      {loading && <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>}
      {!loading && !user && <div className="flex items-center justify-center h-screen">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          No Data Found
        </Typography>
      </div>
      }
    </>
  );
}

const EditUserDataModal = ({ setClose }) => {
  const { auth, account } = useAuth();
  const { openSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(!loading)
    AuthApi.EditUserData(user, auth)
      .then(res => {
        setLoading(false)
        console.log(res)
        openSnackbar("Profile Updated Successfuly", { type: "success" })
        setClose()
      })
      .catch(err => {
        setLoading(false)
        openSnackbar(err.response.data.message, { type: "error" })
        console.log(err)
      })
  }

  return (
    <div className="lg:w-[30rem] w-64 bg-white rounded-lg shadow-lg p-4 border-2">
      <div className="w-full flex justify-between items-center mb-4">
        <Typography variant="h4" color="blue-gray">
          Edit Profile
        </Typography>
        <button onClick={setClose} title={"close"}>
          <X className="h-5 w-5 cursor-pointer text-blue-gray-500 rounded-full hover:bg-blue-gray-50 transition hover:text-red-400" />
        </button>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-3">
        <label className="flex flex-col w-full gap-1 justify-start items-start">
          <span className="text-sm">First Name</span>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            value={user.firstName}
            placeholder="First Name"
            className="w-full border border-blue-gray-200 p-2 rounded-lg"
          />
        </label>
        <label className="flex flex-col w-full gap-1 justify-start items-start">
          <span className="text-sm">Last Name</span>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            value={user.lastName}
            placeholder="Last Name"
            className="w-full border border-blue-gray-200 p-2 rounded-lg"
          />
        </label>
        <label className="flex flex-col w-full gap-1 justify-start items-start">
          <span className="text-sm">Email</span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={user.email}
            className="w-full border border-blue-gray-200 p-2 rounded-lg"
          />
        </label>
        <button onClick={handleSubmit} className="w-full mt-4 bg-[#383838] hover:bg-[#252525] transition text-white p-2 rounded-lg flex justify-center items-center gap-2">
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Save Changes"}
        </button>
      </div>
    </div>
  )
}

export default Profile;
