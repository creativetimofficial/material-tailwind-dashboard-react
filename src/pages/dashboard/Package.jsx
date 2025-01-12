import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { LoaderCircle, Package, DollarSign } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/Auth";
import PackagesApi from "@/api/Packages.api";

export function ViewPackage() {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    PackagesApi.getPackage(id, auth)
      .then((res) => {
        setLoading(false);
        const data = res.data.data; // Correctly access the nested data object
        setPackageData(data);

        // Safely access features and courses
        const coursesList = data?.features?.courses || [];
        setCourses(coursesList);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, auth]);

  return (
    <div className="w-full min-h-screen p-4 flex flex-col justify-start items-start gap-4">
      {loading ? (
        <div className="w-full mt-40 flex justify-center items-center">
          <LoaderCircle size={60} className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="mx-0 mt-0 mb-4 h-64 xl:h-[30rem] w-full">
            <img
              src={packageData?.photo || ""}
              alt={packageData?.name || "Package"}
              className="h-full w-full object-cover rounded-2xl"
            />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-4">
            <h1 className="text-3xl font-bold text-blue-gray-800">
              {packageData?.name || "Package Name"}
            </h1>
            <div className="w-full flex md:flex-row flex-col justify-between items-start gap-4">
              <div className="w-full flex justify-start items-center gap-10">
                <p className="text-xl font-bold  flex items-center gap-2 text-green-600">
                  <DollarSign className="h-6 w-6" />
                  {packageData?.price || "0"}$
                </p>
                <p className="text-xl font-bold text-blue-gray-800 flex items-center gap-2">
                  <Package className="h-6 w-6" />
                  Signal Access: {packageData?.features?.signalAccess ? "Yes" : "No"}
                </p>
              </div>
              <Button color="lightBlue" size="regular" ripple="light">
                Subscribe
              </Button>
            </div>
            <Typography variant="small" className="text-blue-gray-500 w-full">
              {packageData?.description || "No description available."}
            </Typography>
          </div>
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {courses.map(({ courseImage, courseTitle, courseDescription, _id }) => (
              <Card
                key={_id}
                color="#dfe9ed11"
                className="h-[300px] bg-blue-gray-100/20"
                shadow={false}
              >
                <CardHeader
                  floated={false}
                  color="gray"
                  className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                >
                  <img
                    src={courseImage || ""}
                    alt={courseTitle || "Course"}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody className="py-0 px-1">
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    {courseTitle || "No Title"}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                    title={courseDescription}
                  >
                    {courseDescription?.slice(0, 40) || "No Description"}...
                  </Typography>
                </CardBody>
                <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                  <Link to={`/dashboard/course/${_id}`}>
                    <Button variant="outlined" size="sm">
                      View Course
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ViewPackage;
