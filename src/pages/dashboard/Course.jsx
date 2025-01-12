import { CoursesApi } from '@/api';
import { useAuth } from '@/hooks/Auth';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { LoaderCircle, Star, Video } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

export function Course() {
  const { id } = useParams();
  const [course, setCourse] = React.useState(null);
  const [lessons, setLessons] = React.useState([]); // Filtered lessons
  const [allLessons, setAllLessons] = React.useState([]); // All lessons
  const [loading, setLoading] = React.useState(false);
  const { auth, search } = useAuth();

  React.useEffect(() => {
    setLoading(true);
    CoursesApi.getCourseLesson(id, auth)
      .then((res) => {
        setLoading(false);
        const courseData = res.data.CourseLessons;
        setCourse(courseData);
        setAllLessons(courseData.lessons); // Store all lessons
        setLessons(courseData.lessons); // Initially display all lessons
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id, auth]);

  React.useEffect(() => {
    // Filter lessons dynamically based on search
    const filteredLessons = search
      ? allLessons.filter((lesson) =>
        lesson.lessonTitle.toLowerCase().includes(search.toLowerCase())
      )
      : allLessons;

    setLessons(filteredLessons);
  }, [search, allLessons]);

  const purchaseCourse = () => {
    CoursesApi.AddtoMyCourses(id, auth)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
              src={course?.courseImage}
              alt={course?.courseTitle}
              className="h-full w-full object-cover rounded-2xl"
            />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-4">
            <h1 className="text-3xl font-bold text-blue-gray-800">
              {course?.courseTitle}
            </h1>
            <div className="w-full flex md:flex-row flex-col justify-between items-start gap-4">
              <div className="w-full flex justify-start items-center gap-10">
                <p className="text-xl font-bold text-blue-gray-800">
                  {course?.coursePrice}$
                </p>
                <p className="text-xl font-bold text-blue-gray-800">
                  {course?.category}
                </p>
                <p className="text-xl font-bold text-blue-gray-800">
                  <div className="flex justify-center items-center gap-2">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        <Star
                          className={`h-6 w-6 ${index < course?.rate
                            ? 'text-yellow-700 fill-yellow-400'
                            : 'text-gray-300'
                            }`}
                        />
                      </span>
                    ))}
                  </div>
                </p>
              </div>
              <Button onClick={purchaseCourse} color="lightBlue" size="regular" ripple="light">
                Enroll
              </Button>
            </div>
            <Typography
              variant="small"
              className="text-blue-gray-500 w-full"
            >
              {course?.courseDescription}
            </Typography>
          </div>
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {lessons.map(
              ({ lessonCover, lessonTitle, lessonDescription, lessonVideo, _id }) => (
                <Card
                  key={lessonTitle}
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
                      src={lessonCover}
                      alt={lessonTitle}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody className="py-0 px-1">
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {lessonTitle}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mt-1 mb-2"
                    >
                      <Video className="h-6 w-6" />
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                      title={lessonDescription}
                    >
                      {lessonDescription.slice(0, 40)}
                    </Typography>
                  </CardBody>
                  <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                    <Link
                      to={`/dashboard/lesson/${_id}/course/${id}`}
                      state={lessonVideo}
                    >
                      <Button variant="outlined" size="sm">
                        View Lesson
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Course;
