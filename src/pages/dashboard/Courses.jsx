import { CoursesApi } from '@/api'
import PageNumbers from '@/components/pageNumbers'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
import { Link } from 'react-router-dom';
import CategoryFilter from '@/components/CategoryFilter';
import { useAuth } from '@/hooks/Auth';

export function Courses() {
  const [courses, setCourses] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const { search } = useAuth()

  const categories = ["trading", "e-commerce", "business", "marketing"]

  const next = (num) => {
    if (num) {
      setPage(num)
      return
    }
    if (page + 1 > totalPages) return
    setPage(page + 1)
  }

  const prev = () => {
    if (page - 1 <= 0) return
    setPage(page - 1)
  }

  useEffect(() => {
    setLoading(true);
    CoursesApi.getAllCourses(10, page)
      .then((res) => {
        setLoading(false);
        setAllCourses(res.data.courses); // Store all courses fetched
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    // Filter locally without triggering a new fetch
    const filteredCourses = selectedCategories.length > 0
      ? allCourses.filter(course =>
        selectedCategories.includes(course.category) &&
        (search ? course.courseTitle.toLowerCase().includes(search.toLowerCase()) : true)
      )
      : allCourses.filter(course =>
        search ? course.courseTitle.toLowerCase().includes(search.toLowerCase()) : true
      );

    setCourses(filteredCourses);
  }, [selectedCategories, search, allCourses]); // Dependencies include allCourses for dynamic filtering


  const handleCategorySelect = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
  };

  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-start gap-10'>
      <CategoryFilter
        categories={categories}
        onCategoryChange={handleCategorySelect}
      />

      <div className='w-full mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4'>
        {!loading && courses.map(
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
                <div>
                  {members.map(({ photoLink, firstName, lastName, _id }, key) => (
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
                </div>
              </CardFooter>
            </Card>
          )
        )}
        {loading && <div className='w-full col-span-4 flex justify-center items-center'><Loader2 size={60} className='animate-spin' /></div>}
      </div>
      <div className='flex justify-center items-center w-full'>
        {totalPages > 1 &&
          <PageNumbers
            page={page}
            pagesNumber={totalPages}
            next={next}
            prev={prev}
          />
        }
      </div>
    </div>
  )
}

export default Courses