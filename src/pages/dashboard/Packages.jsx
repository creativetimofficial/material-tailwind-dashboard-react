import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import PageNumbers from "@/components/pageNumbers";
import CategoryFilter from "@/components/CategoryFilter";
import { useAuth } from "@/hooks/Auth";
import PackagesApi from "@/api/Packages.api";

export function Packages() {
  const [packages, setPackages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const { search } = useAuth();

  const categories = ["trading", "e-commerce", "business", "marketing"];

  const next = (num) => {
    if (num) {
      setPage(num);
      return;
    }
    if (page + 1 > totalPages) return;
    setPage(page + 1);
  };

  const prev = () => {
    if (page - 1 <= 0) return;
    setPage(page - 1);
  };

  useEffect(() => {
    setLoading(true);
    PackagesApi.getAll()
      .then((res) => {
        setLoading(false);

        // Ensure response structure matches your API response
        const allData = res.data.data.map((pkg) => ({
          ...pkg,
          courses: pkg.features.courses, // Extract courses from features
        }));

        setAllPackages(allData); // Store all packages fetched
        setTotalPages(Math.ceil(allData.length / 10)); // Assuming 10 items per page
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    // Filter packages locally
    const filteredPackages = selectedCategories.length > 0
      ? allPackages.filter((pkg) =>
        pkg.features.courses.some((course) =>
          selectedCategories.includes(course.category) &&
          (search
            ? course.courseTitle.toLowerCase().includes(search.toLowerCase())
            : true)
        )
      )
      : allPackages.filter((pkg) =>
        search
          ? pkg.features.courses.some((course) =>
            course.courseTitle.toLowerCase().includes(search.toLowerCase())
          )
          : true
      );

    setPackages(
      filteredPackages.slice((page - 1) * 10, page * 10) // Paginate locally
    );
  }, [selectedCategories, search, allPackages, page]);

  const handleCategorySelect = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start gap-10">
      {/* <CategoryFilter
        categories={categories}
        onCategoryChange={handleCategorySelect}
      /> */}

      <div className="w-full mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
        {!loading &&
          packages.map(({ _id, name, photo, description, features }) => (
            <Card key={_id} color="#dfe9ed11" className="h-auto bg-blue-gray-100/20" shadow={false}>
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
        {loading && (
          <div className="w-full col-span-4 flex justify-center items-center">
            <Loader2 size={60} className="animate-spin" />
          </div>
        )}
      </div>
      <div className="flex justify-center items-center w-full">
        {totalPages > 1 && (
          <PageNumbers
            page={page}
            pagesNumber={totalPages}
            next={next}
            prev={prev}
          />
        )}
      </div>
    </div>
  );
}

export default Packages;
