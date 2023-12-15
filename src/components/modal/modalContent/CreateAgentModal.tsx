import { createAgent } from "@/api/agents";
import { ModalContext } from "@/context/modalContext";
import { Role, RoleEnum } from "@/entities/role.entity";
import { User } from "@/entities/user.entity";
import { AgentsActions } from "@/gx/signals/agents.signal";
import { useActions } from "@dilane3/gx";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const CreateAgentModal = () => {
  const { handleOpen } = useContext(ModalContext);

  // Local state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Global actions
  const { addAgent } = useActions<AgentsActions>("agents");

  // Handlers
  const handleChange = (e: any, target: string) => {
    switch (target) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "phoneNumber":
        setPhoneNumber(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
    }
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !phoneNumber || !email) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    const { data } = await createAgent({
      firstName,
      lastName,
      phone: phoneNumber,
      email,
    });

    if (data) {
      const agent = new User({
        id: data.id,
        firstName,
        lastName,
        email,
        phone: phoneNumber,
        sexe: "male",
        avatar: "",
        createdAt: new Date(data.user.createdAt),
        role: new Role({
          label: RoleEnum.AGENT,
          description: "agent"
        })
      })

      addAgent(agent);

      toast.success("Agent added successfully");
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
        Add an agent
      </Typography>
      <CardBody className="flex flex-col gap-4">
        <Input
          crossOrigin={null}
          label="First Name"
          size="lg"
          value={firstName}
          onChange={(e: any) => handleChange(e, "firstName")}
        />

        <Input
          crossOrigin={null}
          label="Last Name"
          size="lg"
          value={lastName}
          onChange={(e: any) => handleChange(e, "lastName")}
        />

        <Input
          crossOrigin={null}
          label="Email"
          size="lg"
          value={email}
          onChange={(e: any) => handleChange(e, "email")}
        />

        <Input
          crossOrigin={null}
          label="Phone Number"
          type="number"
          size="lg"
          value={phoneNumber}
          onChange={(e: any) => handleChange(e, "phoneNumber")}
        />
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

export default CreateAgentModal;
