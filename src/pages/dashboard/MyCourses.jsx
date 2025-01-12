import { CoursesApi } from "@/api";
import CategoryFilter from "@/components/CategoryFilter";
import { useAuth } from "@/hooks/Auth";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([])
  const { auth, search } = useAuth()
  const [selectedCategories, setSelectedCategories] = useState([])
  const categories = ["trading", "e-commerce", "business", "marketing"]
  useEffect(() => {
    // Filter locally without triggering a new fetch
    const filteredCourses = selectedCategories.length > 0
      ? courses.filter(course =>
        selectedCategories.includes(course.category) &&
        (search ? course.courseTitle.toLowerCase().includes(search.toLowerCase()) : true)
      )
      : courses.filter(course =>
        search ? course.courseTitle.toLowerCase().includes(search.toLowerCase()) : true
      );

    setSelectedCourses(filteredCourses);
  }, [selectedCategories, search]); // Dependencies include allCourses for dynamic filtering


  const handleCategorySelect = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
  };

  useEffect(() => {
    setLoading(true);
    // const token = localStorage.getItem("token");
    CoursesApi.MyCourses(auth)
      .then((res) => {
        setLoading(false);
        setCourses(res.data.myCourses);
        setSelectedCategories([...new Set(res.data.myCourses.map(course => course.category))])
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);


  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start gap-4">
      <CategoryFilter
        categories={categories}
        onCategoryChange={handleCategorySelect}
      />
      <div className='w-full mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4'>
        {!loading && selectedCourses.map(
          ({ courseImage, courseTitle, courseDescription, category, members, _id }) => (
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
                {/* <div>
                  {members?.map(({ photoLink, firstName, lastName, _id }, key) => (
                    <Tooltip key={_id} content={firstName + " " + lastName}>
                      <Avatar
                        src={photoLink || "https://res.cloudinary.com/dqdt57lxl/image/upload/v1733091929/jhl718s0eucpxdyqpzqh.png"}
                        alt={firstName + " " + lastName}
                        size="xs"
                        variant="circular"
                        className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                          }`}
                      />
                    </Tooltip>
                  ))}
                </div> */}
              </CardFooter>
            </Card>
          )
        )}
      </div>
      {courses.length === 0 && !loading && <div className='w-fit self-center h-screen flex flex-col justify-start items-center'>
        <span className="lg:text-7xl md:text-4xl text-3xl font-bold mb-6">(┬┬﹏┬┬)</span>
        <span className="text-lg font-semibold mb-2">You are not enrolled in any courses yet</span>
        <Link to={'/dashboard/courses'} className="underline hover:text-blue-400 transition">Check our Courses</Link>
      </div>}
      {loading && <div className='w-full col-span-4 flex justify-center items-center'><Loader2 size={60} className='animate-spin' /></div>}
    </div>
  )
}

export default MyCourses