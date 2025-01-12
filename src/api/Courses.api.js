import axiosClient from "@/api/axiosClient";
import MyCourses from "@/pages/dashboard/MyCourses";

export const CoursesApi = {
  getAllCourses: (limit, page) => {
    const url = "/course/";
    return axiosClient.get(url, { params: { limit: limit, page: page } });
  },

  addCourse: (data, token) => {
    const url = "/course/addCourse/";
    return axiosClient.post(url, data, { headers: { token: token } });
  },

  getCourseLesson: (id, token) => {
    const url = `/course/${id}/lessons`;
    return axiosClient.get(url, { headers: { token: token } });
  },

  getLessonById: (id, token) => {
    const url = `/lessons/${id}`;
    return axiosClient.get(url, { headers: { token: token } });
  },

  deleteCourse: (id, token) => {
    const url = `/course/${id}`;
    return axiosClient.delete(url, { headers: { token: token } });
  },

  editCourse: (id, data, token) => {
    const url = `/course/edit/${id}`;
    return axiosClient.post(url, data, { headers: { token: token } });
  },

  addLessonToCourse: (id, data, token) => {
    const url = `/course/${id}/lessons`;
    return axiosClient.post(url, data, { headers: { token: token } });
  },

  deleteLesson: (id, token) => {
    const url = `/course/lessons/${id}`;
    return axiosClient.delete(url, { headers: { token: token, "Content-Type": 'multipart/form-data' } });
  },
  MyCourses: (token) => {
    const url = `/course/myCourses/if-you-find-this-you-are-a-hacker`;
    return axiosClient.get(url, { headers: { token: token } });
  },
  AddtoMyCourses: (id, token) => {
    const url = `/user/addToMyCourses/${id}`;
    return axiosClient.post(url, {}, { headers: { token: token } });
  }
};

export default CoursesApi;