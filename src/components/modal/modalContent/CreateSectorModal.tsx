import { createFaculty } from "@/api/faculty";
import { createSector } from "@/api/sector";
import { ModalContext } from "@/context/modalContext";
import { Faculty } from "@/entities/faculty.entity";
import { Sector } from "@/entities/sector.entity";
import { FacultiesActions, FacultiesState } from "@/gx/signals/faculties.signal";
import { SectorsActions } from "@/gx/signals/sectors.signal";
import { useActions, useSignal } from "@dilane3/gx";
import {
  Button,
  Select,
  Option,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const CreateSectorModal = () => {
  const { handleOpen } = useContext(ModalContext);

  // Local state
  const [name, setName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [loading, setLoading] = useState(false);

  // Global state
  const { faculties } = useSignal<FacultiesState>("faculties");

  // Global actions
  const { addSector } = useActions<SectorsActions>("sectors");

  // Handlers
  const handleNameChange = (e: any) => setName(e.target.value);
  const handleFacultyChange = (value: string | undefined) => {
    if (value) setFacultyId(value);
  };

  const handleSubmit = async () => {
    if (!name || !facultyId) {
      toast.error("Name and faculty are required");
      return;
    }

    setLoading(true);

    const { data } = await createSector({ name, facultyId });

    setLoading(false);

    if (data) {
      const sector = new Sector({ ...data, facultyId });

      addSector(sector);

      toast.success("Sector created successfully");
      handleOpen();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="w-full">
      <Typography
        type="h2"
        className="uppercase text-2xl text-center mt-8 text-primary font-bold"
      >
        Add a new sector
      </Typography>
      <CardBody className="flex flex-col gap-4">
        <Input
          crossOrigin={null}
          label="Name"
          size="lg"
          value={name}
          onChange={handleNameChange}
          className="font-nunitoRegular capitalize"
          labelProps={{ className: "font-nunitoRegular" }}
        />

        <select
          className="w-full h-10 border border-gray-300 rounded-md px-2 text-gray-700 font-nunitoRegular"
          value={facultyId}
          onChange={(e: any) => handleFacultyChange(e.target.value)}
        >
          <option value="" disabled selected className="font-nunitoRegular">
            Select a faculty
          </option>

          {faculties.map((faculty, index) => {
            return (
              <option
                key={index}
                value={faculty.id}
                className="capitalize font-nunitoRegular"
              >
                {faculty.name}
              </option>
            );
          })}
        </select>
      </CardBody>
      <CardFooter className="pt-0 flex justify-between">
        <Button
          variant="filled"
          className="bg-gray-400 uppercase"
          onClick={handleOpen}
        >
          Cancel
        </Button>
        <Button
          variant="filled"
          className="bg-primary uppercase"
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Add"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateSectorModal;
