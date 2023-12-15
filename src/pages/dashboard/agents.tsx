import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@material-tailwind/react";

import userImage from "../../assets/img/user.png";

import { studentsTableData } from "@/data";
import { ModalContext } from "@/context/modalContext";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { useSignal } from "@dilane3/gx";
import { AgentsState } from "@/gx/signals/agents.signal";
import { formatDate } from "@/utils";

export default function Agents() {
  const { handleOpen, dispatch } = useContext(ModalContext);

  // Global state
  const { agents } = useSignal<AgentsState>("agents");

  const handleOpenCreateAgentModal = () => {
    if (!dispatch) return;

    dispatch!({ type: "ADD_AGENT" });
    handleOpen();
  };
  
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader className="mb-8 p-6 bg-primary flex items-center justify-between w-full">
          <Typography variant="h6" color="white">
            List of Agents
          </Typography>

          <Button onClick={handleOpenCreateAgentModal} className="flex items-center gap-3 bg-white text-primary" size="md">
            <PlusCircleIcon strokeWidth={2} className="h-6 w-6" /> Add an agent
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["info", "role", "sexe", "phone", "registered at", "Action"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {agents.map(
                ({ fullName, firstName, email, avatar, phone, sexe, role, createdAt }, key) => {
                  const className = `py-3 px-5 ${
                    key === studentsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={key}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={userImage} alt={firstName} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold capitalize"
                            >
                              {fullName}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600 capitalize">
                          {role.label}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600 capitalize">
                          {sexe}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phone}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {formatDate(createdAt)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
