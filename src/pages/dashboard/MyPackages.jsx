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
import PackagesApi from "@/api/Packages.api";
function MyPackages() {
  const [packages, setpackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth, search } = useAuth()
  const [selectedCategories, setSelectedCategories] = useState([])
  const categories = ["trading", "e-commerce", "business", "marketing"]
  useEffect(() => {
    // Filter locally without triggering a new fetch
    const filteredpackages = selectedCategories.length > 0
      ? packages.filter(packageIncomeing =>
        selectedCategories.includes(packageIncomeing.category) &&
        (search ? packageIncomeing.name.toLowerCase().includes(search.toLowerCase()) : true)
      )
      : packages.filter(packageIncomeing =>
        search ? packageIncomeing.name.toLowerCase().includes(search.toLowerCase()) : true
      );

    setpackages(filteredpackages);
  }, [selectedCategories, search]); // Dependencies include allCourses for dynamic filtering


  const handleCategorySelect = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
  };

  useEffect(() => {
    setLoading(true);
    // const token = localStorage.getItem("token");
    PackagesApi.myPackages(auth)
      .then((res) => {
        setLoading(false);
        setpackages(res.data.packages);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4 min-h-screen">
      {/* <CategoryFilter
        categories={categories}
        onCategoryChange={handleCategorySelect}
      /> */}
      <div className='w-full mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4'>
        {!loading && packages.map(({ _id, name, photo, description, features }) => (
          <Card key={_id} color="#dfe9ed11" className="h-fit bg-blue-gray-100/20" shadow={false}>
            <CardHeader
              floated={false}
              color="gray"
              className="mx-0 mt-0 mb-4 h-64 xl:h-40"
            >
              <img
                src={photo}
                alt={name}
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody className="py-0 px-1">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                Package
              </Typography>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mt-1 mb-2"
              >
                {name}
              </Typography>
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
                title={description}
              >
                {description.slice(0, 50)}...
              </Typography>
            </CardBody>
            <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
              <Link to={`/dashboard/package/${_id}`}>
                <Button variant="outlined" size="sm">
                  View Package
                </Button>
              </Link>
              <div>
                {features?.courses?.map(
                  ({ courseImage, courseTitle, _id }, key) => (
                    <Tooltip key={_id} content={courseTitle}>
                      <Avatar
                        src={
                          courseImage ||
                          "https://via.placeholder.com/40"
                        }
                        alt={courseTitle}
                        size="xs"
                        variant="circular"
                        className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                          }`}
                      />
                    </Tooltip>
                  )
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {packages.length === 0 && !loading && <div className='w-fit self-center h-screen flex flex-col justify-start items-center'>
        <span className="lg:text-7xl md:text-4xl text-3xl font-bold mb-6">(┬┬﹏┬┬)</span>
        <span className="text-lg font-semibold mb-2">You are not subscribed to any packages yet</span>
        <Link to={'/dashboard/packages'} className="underline hover:text-blue-400 transition">Check our packages</Link>
      </div>}
      {loading && <div className='w-full col-span-4 flex justify-center items-center'><Loader2 size={60} className='animate-spin' /></div>}
    </div>
  )
}

export default MyPackages