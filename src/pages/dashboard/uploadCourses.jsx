import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/Auth";
import { Upload, Plus, Book, Video, ChevronDown, ChevronRight, Edit, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { CoursesApi } from "@/api";
// import { CoursesApi } from "@/api";

const CourseManagement = () => {
  const [courses, setCourses] = useState();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });
  const [newLesson, setNewLesson] = useState({ title: "", description: "", file: null });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(null); // State for delete confirmation
const [editLesson, setEditLesson] = useState(null); // Stores the lesson being edited

  const {auth, socket } = useAuth();
  useEffect(() => {
    socket.on("uploadProgress", (data) => {
      setProgress(data.progress);
    });

    // Fetch existing courses
    fetchCourses();

    return () => {
      // socket.off("uploadProgress");
    };
  }, []);

  const fetchCourses = async () => {
  try {
    const response = await CoursesApi.getAllCourses(10, 1);
    console.log(response)
    const transformedCourses = response.data.courses.map((course) => ({
      id: course._id, // Map _id to id
      title: course.courseTitle, // Map courseTitle to title
      description: course.courseDescription, // Map courseDescription to description
      image: course.courseImage, // Use courseImage
      lessons: course.lessons.map(({_id,lessonTitle,lessonDescription}) => ({
        id: _id, // Keep lesson IDs (optionally resolve full lesson data here)
        title: lessonTitle, // Placeholder if no full data is available
        description: lessonDescription, // Placeholder if no full data is available
      })),
      members: course.members, // Keep members as-is
      totalMembers: course.totalMembers, // Keep total members
      category: course.category, // Use category
    }));
    console.log(transformedCourses)
    setCourses(transformedCourses);
  } catch (err) {
    setError("Failed to fetch courses");
  }
};
    useEffect(()=>{
        console.log(courses,'the co')
    },[courses])

  const handleCreateCourse = async () => {
     const formData = new FormData();
  formData.append("file", newCourse.image); 
  formData.append("courseTitle", newCourse.title);
  formData.append("courseDescription", newCourse.description);
  formData.append("coursePrice", newCourse.price);
  formData.append("category", newCourse.category);
  formData.append("folder", "courses");
  console.log(newCourse)
    try {
      // Replace with your actual API endpoint
    //   const response = await CoursesApi.addCourse(formData,auth);
    const response = await axios.post("https://sea-turtle-app-rwcjs.ondigitalocean.app/api/v1/course/addCourse", formData, {
        headers: {
        "token":auth,
          "Content-Type": "multipart/form-data",
          "x-socket-id": socket.id,
        },
      });
      setCourses([...courses, newCourse]);
      setIsAddingCourse(false);
      setNewCourse({ title: "", description: "" });
    } catch (err) {
      setError("Failed to create course");
    }
  };

  const handleUploadLesson = async () => {
    if (!newLesson.file || !selectedCourse) {
      setError("Please select a file and course");
      return;
    }

    const formData = new FormData();
    formData.append("video", newLesson.file);
    formData.append("image", newLesson.image);
    formData.append("lessonTitle", newLesson.title);
    formData.append("lessonDescription", newLesson.description);
    formData.append("courseId", selectedCourse.id);
    formData.append("folder", "lessons");

    try {
      setUploading(true);
      setProgress(0);
      setError("");

      const response = await axios.post(`https://sea-turtle-app-rwcjs.ondigitalocean.app/api/v1/course/${selectedCourse.id}/lessons`, formData, {
        headers: {
        "token":auth,
          "Content-Type": "multipart/form-data",
          "x-socket-id": socket.id,
        },
      });
    //   let data = {...courses}
    //   let idex = data.findIndex(e=>e.id === selectedCourse.id)
    //   data[idex].lessons.push(
    //     {
    //     id: 'test', 
    //     title: newLesson.title, 
    //     description: newLesson.description, 
    //   }
    //   )
      // Update the course with the new lesson
      fetchCourses();
      setIsAddingLesson(false);
      setNewLesson({ title: "", description: "", file: null });
    } catch (err) {
      setError("Failed to upload lesson");
    } finally {
      setUploading(false);
    }
  };
 const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`https://sea-turtle-app-rwcjs.ondigitalocean.app/api/v1/course/${courseId}`, {
        headers: { token: auth },
      });

      setCourses(courses.filter((course) => course.id !== courseId));
      setSelectedCourse(null);
      setConfirmDelete(null); // Close confirmation dialog
    } catch (err) {
      setError("Failed to delete course");
    }
  };

const handleDeleteLesson = async (lessonId, courseId) => {
    try {
      await axios.delete(`https://sea-turtle-app-rwcjs.ondigitalocean.app/api/v1/course/lessons/${lessonId}`, {
        headers: { token: auth },
      });

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId
            ? { ...course, lessons: course.lessons.filter((lesson) => lesson.id !== lessonId) }
            : course
        )
      );
      setConfirmDelete(null); // Close confirmation dialog
    } catch (err) {
      setError("Failed to delete lesson");
    }
  };
const handleEditLesson = async () => {
  const formData = new FormData();
  formData.append("lessonTitle", editLesson.title);
  formData.append("lessonDescription", editLesson.description);

  if (editLesson.video) {
    formData.append("video", editLesson.video);
  }
  if (editLesson.image) {
    formData.append("image", editLesson.image);
  }

  try {
    const response = await axios.put(
      `https://sea-turtle-app-rwcjs.ondigitalocean.app/api/v1/course/editLesson/${editLesson.id}`,
      formData,
      {
        headers: {
          token: auth,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const updatedLesson = response.data.lesson;

    // Update the lessons in the selected course
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...course,
              lessons: course.lessons.map((lesson) =>
                lesson.id === updatedLesson._id ? updatedLesson : lesson
              ),
            }
          : course
      )
    );

    setEditLesson(null); // Close modal
  } catch (err) {
    setError("Failed to update lesson");
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Courses Sidebar */}
          <div className="col-span-4 bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Courses</h2>
                <button
                  onClick={() => setIsAddingCourse(true)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              {courses&&courses.map((course) => {
                return (
                <div
                  key={course.id}
                  className={`p-3 rounded-lg cursor-pointer mb-2 ${
                    selectedCourse?.id === course.id
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    <span className="font-medium flex-1">{course.title}</span>
                     <button
                    onClick={() => setConfirmDelete({ type: "course", id: course.id })}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                </div>
              )})}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-8 bg-white rounded-lg shadow">
            {selectedCourse ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold">{selectedCourse.title}</h2>
                    <p className="text-gray-500">{selectedCourse.description}</p>
                  </div>
                  <button
                    onClick={() => setIsAddingLesson(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Lesson
                  </button>
                </div>

                {/* Lessons List */}
                <div className="space-y-4">
                  {selectedCourse.lessons?.map((lesson) => (
                    <div key={lesson.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Video className="h-5 w-5 text-gray-400" />
                          <div>
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="text-sm text-gray-500">{lesson.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                                setEditLesson({
                                id: lesson.id,
                                title: lesson.title,
                                description: lesson.description,
                                })
                            }
                            className="p-2 text-gray-400 hover:text-blue-600"
                            >
                            <Edit className="h-4 w-4" />
                            </button>
                         <button
                        onClick={() => setConfirmDelete({ type: "lesson", id: lesson.id })}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                Select a course or create a new one to get started
              </div>
            )}
          </div>
        </div>
      </div>
            {editLesson && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Edit Lesson</h3>
      <div className="space-y-4">
        {/* Lesson Title */}
        <input
          type="text"
          value={editLesson.title}
          onChange={(e) => setEditLesson({ ...editLesson, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Lesson Title"
        />

        {/* Lesson Description */}
        <textarea
          value={editLesson.description}
          onChange={(e) => setEditLesson({ ...editLesson, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Lesson Description"
        />

        {/* Lesson Video */}
        <input
          type="file"
          onChange={(e) => setEditLesson({ ...editLesson, video: e.target.files[0] })}
          className="w-full"
          accept="video/*"
        />

        {/* Lesson Image */}
        <input
          type="file"
          onChange={(e) => setEditLesson({ ...editLesson, image: e.target.files[0] })}
          className="w-full"
          accept="image/*"
        />
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => setEditLesson(null)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleEditLesson}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

      {/* Add Course Modal */}
      {isAddingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Course</h2>
            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Image
                </label>
                <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
                onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                }}
                onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith("image/")) {
                setNewCourse({ ...newCourse, image: file });
                }
                }}
                >
                <input
                type="file"
                onChange={(e) => setNewCourse({ ...newCourse, image: e.target.files[0] })}
                accept="image/*"
                className="hidden"
                id="course-image"
                />
                <label htmlFor="course-image" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                {newCourse.image ? newCourse.image.name : "Drag and drop or click to select an image"}
                </p>
                </label>
                </div>
                </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course description"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  price
                </label>
                <input
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course price"
                  type="number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  category
                </label>
                <select
                 onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                value={newCourse.category}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                 <option value={'trading'}>trading</option>
                 <option value={'e-commerce'}>e-commerce</option>
                 <option value={'business'}>business</option>
                 <option value={'marketing'}>marketing</option>
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsAddingCourse(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCourse}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">
              {confirmDelete.type === "course"
                ? "Are you sure you want to delete this course?"
                : "Are you sure you want to delete this lesson?"}
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  confirmDelete.type === "course"
                    ? handleDeleteCourse(confirmDelete.id)
                    : handleDeleteLesson(confirmDelete.id, selectedCourse.id)
                }
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add Lesson Modal */}
      {isAddingLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Lesson</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson Title
                </label>
                <input
                  type="text"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter lesson title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter lesson description"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video 
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith('video/')) {
                      setNewLesson({ ...newLesson, file });
                    }
                  }}
                >
                  <input
                    type="file"
                    onChange={(e) => setNewLesson({ ...newLesson, file: e.target.files[0] })}
                    accept="video/*"
                    className="hidden"
                    id="lesson-video"
                  />
                  <label htmlFor="lesson-video" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      {newLesson.file ? newLesson.file.name : "Drag and drop or click to select video"}
                    </p>
                  </label>
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  cover 
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith('image/')) {
                      setNewLesson({ ...newLesson, image:file });
                    }
                  }}
                >
                  <input
                    type="file"
                    onChange={(e) => setNewLesson({ ...newLesson, image: e.target.files[0] })}
                    accept="image/*"
                    className="hidden"
                    id="lesson-image"
                  />
                  <label htmlFor="lesson-image" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      {newLesson.image ? newLesson.image.name : "Drag and drop or click to select image"}
                    </p>
                  </label>
                </div>
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 text-center">{progress}% uploaded</p>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 rounded-lg flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsAddingLesson(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadLesson}
                  disabled={uploading || !newLesson.file}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    uploading || !newLesson.file
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {uploading ? "Uploading..." : "Add Lesson"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;