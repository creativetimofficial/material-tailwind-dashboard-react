import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { LoaderCircle, Plus, Trash, Pencil } from "lucide-react";
import { useAuth } from "@/hooks/Auth";
import { CoursesApi } from "@/api";

export function PackagesManager() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [availableCourses, setAvailableCourses] = useState([]);
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    packageTitle: "",
    packagePrice: "",
    packageDescription: "",
    expirationDate: "",
    accessSignals: false,
    courses: [],
    generations: [{ id: 1, percentage: 0 }],
    photo: null,
  });
  const [editingPackage, setEditingPackage] = useState(null);

  useEffect(() => {
    fetchPackages();
    fetchCourses();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://sea-turtle-app-rwcjs.ondigitalocean.app/api/v1/package/`, {
        headers: { token: `${auth}` },
      });
      const data = await res.json();
      setPackages(data.data || []);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await CoursesApi.getAllCourses();
      const data = res.data;
      setAvailableCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
    }
  };

  const handleSave = async () => {
    const form = new FormData();
    form.append("packageTitle", formData.packageTitle);
    form.append("packagePrice", formData.packagePrice);
    form.append("courses", JSON.stringify(formData.courses));
    form.append("packageDescription", formData.packageDescription);
    form.append("accessSignals", formData.accessSignals);
    form.append("generations", JSON.stringify(formData.generations));
    form.append("expirationDate", formData.expirationDate);
    if (formData.photo) {
      form.append("photo", formData.photo);
    }

    try {
      const token = auth;
      const url = editingPackage
        ? `https://sea-turtle-app-rwcjs.ondigitalocean.app/api/v1/package/${editingPackage._id}`
        : "https://sea-turtle-app-rwcjs.ondigitalocean.app/api/v1/package/create";

      const res = await fetch(url, {
        method: editingPackage ? "PUT" : "POST",
        headers: { token },
        body: form,
      });

      if (!res.ok) {
        throw new Error("Failed to save package");
      }

      await fetchPackages();
      setShowDialog(false);
      setEditingPackage(null);
      resetForm();
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        const res = await fetch(`https://sea-turtle-app-rwcjs.ondigitalocean.app/api/v1/package/${id}`, {
          method: "DELETE",
          headers: { token: `${auth}` },
        });

        if (!res.ok) {
          throw new Error("Failed to delete package");
        }

        await fetchPackages();
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      packageTitle: "",
      packagePrice: "",
      packageDescription: "",
      expirationDate: "",
      accessSignals: false,
      courses: [],
      generations: [{ id: 1, percentage: 0 }],
      photo: null,
    });
  };

  const openDialogForEdit = (pkg) => {
  setEditingPackage(pkg);
  setFormData({
    packageTitle: pkg.name,
    packagePrice: pkg.price,
    packageDescription: pkg.description,
    expirationDate: pkg.expirationDate,
    accessSignals: pkg.features.signalAccess,
    courses: pkg.features.courses.map((course) => ({
      id: course._id,
      label: course.courseTitle, // Ensure `courseTitle` exists in the data
    })),
    generations: pkg.features.generations || [{ id: 1, percentage: 0 }],
    photo: null,
  });
  setShowDialog(true);
};


  const addGeneration = () => {
    setFormData((prev) => ({
      ...prev,
      generations: [
        ...prev.generations,
        { id: prev.generations.length + 1, percentage: 0 },
      ],
    }));
  };

  const removeGeneration = (id) => {
    setFormData((prev) => ({
      ...prev,
      generations: prev.generations.filter((gen) => gen.id < id),
    }));
  };

 const handleCourseSelect = (courseId, courseTitle) => {
  setFormData((prev) => {
    const isSelected = prev.courses?.some((course) => course.id === courseId) || false;
    return {
      ...prev,
      courses: isSelected
        ? prev.courses.filter((course) => course.id !== courseId)
        : [...(prev.courses || []), { id: courseId, label: courseTitle }],
    };
  });
};



  return (
    <div className="w-full min-h-screen p-6 flex flex-col gap-6 bg-gray-100">
      <div className="flex justify-between items-center bg-white shadow p-4 rounded-md">
        <h1 className="text-2xl font-semibold text-gray-800">
          Manage Packages
        </h1>
        <Button
          onClick={() => {
            resetForm();
            setEditingPackage(null);
            setShowDialog(true);
          }}
          variant="gradient"
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Package
        </Button>
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center">
          <LoaderCircle size={60} className="animate-spin" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
          {packages.map(({ _id, name, photo, description, features }) => (
            <Card key={_id} color="#dfe9ed11" className="h-auto bg-blue-gray-100/20">
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
                <Typography variant="small" className="font-normal text-blue-gray-500">
                  Package
                </Typography>
                <Typography variant="h5" color="blue-gray" className="mt-1 mb-2">
                  {name}
                </Typography>
                <div className="flex flex-row justify-between">
                <Typography variant="small" className="font-normal text-blue-gray-500">
                  {description.slice(0, 50)}...
                </Typography>
              <div className="flex -space-x-2">
              {features?.courses?.map(({ courseImage, courseTitle, _id }, index) => (
                <img
                  key={_id}
                  src={courseImage || "https://via.placeholder.com/40"}
                  alt={courseTitle}
                  title={courseTitle}
                  className="h-4 w-4 rounded-full border-2 border-white"
                  />
                ))}
            </div>
                </div>
                
              </CardBody>
              <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                <Button
                  size="sm"
                  variant="outlined"
                  className="flex items-center gap-2"
                  onClick={() => openDialogForEdit({ _id, name, photo, description, features })}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outlined"
                  color="red"
                  className="flex items-center gap-2"
                  onClick={() => handleDelete(_id)}
                >
                  <Trash className="h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog className="overflow-scroll h-[100dvh]"  open={showDialog} handler={() => setShowDialog(false)}>
        <DialogHeader>
          {editingPackage ? "Edit Package" : "Add Package"}
        </DialogHeader>
        <DialogBody className="flex flex-col gap-2 " divider>
          <Input
            label="Title"
            name="packageTitle"
            value={formData.packageTitle}
            onChange={handleFormChange}
          />
          <Input
            label="Price"
            name="packagePrice"
            value={formData.packagePrice}
            type="number"
            onChange={handleFormChange}
          />
          <Textarea
            label="Description"
            name="packageDescription"
            value={formData.packageDescription}
            onChange={handleFormChange}
          />
          <Input
            label="Expiration Date"
            name="expirationDate"
            type="date"
            value={formData.expirationDate}
            onChange={handleFormChange}
          />
          <Checkbox
            label="Signal Access"
            name="accessSignals"
            checked={formData.accessSignals}
            onChange={handleFormChange}
          />

          {/* Photo Uploader with Preview */}
          <div className="my-4">
            <Typography variant="h6" className="mb-2">
              Upload Photo
            </Typography>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              onChange={handleFileChange}
            />
            {formData.photo && (
              <div className="mt-4">
                <Typography variant="small" className="text-gray-500 mb-2">
                  Image Preview:
                </Typography>
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Preview"
                  className="w-full h-auto max-h-40 rounded-lg border border-gray-200 object-cover"
                />
              </div>
            )}
          </div>

         <div className="my-4">
          <Typography variant="h6">Courses</Typography>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {availableCourses.map(({ _id, courseTitle }) => (
              <Checkbox
                key={_id}
                label={courseTitle}
                checked={formData.courses?.some((course) => course.id === _id) || false}
                onChange={() => handleCourseSelect(_id, courseTitle)}
              />
            ))}
          </div>
        </div>



          <div className="my-4">
            <Typography variant="h6">Generation Percentages</Typography>
            {formData.generations.map(({ id, percentage }) => (
              <div key={id} className="flex items-center gap-4 mt-2">
                <Typography>Generation {id}</Typography>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={percentage}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      generations: prev.generations.map((gen) =>
                        gen.id === id ? { ...gen, percentage: e.target.value } : gen
                      ),
                    }))
                  }
                />
                {id > 1 && (
                  <Button
                    size="sm"
                    color="red"
                    onClick={() => removeGeneration(id)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            {formData.generations.length < 5 && (
              <Button size="sm" color="blue" onClick={addGeneration}>
                Add Generation
              </Button>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setShowDialog(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button variant="gradient" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default PackagesManager;
