import React, { useState } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import useGetComplainee from "@/apiHooks/user/useGetComplainee";
const UserData = ({ userName, id, userId }) => {
  const { loading, complainee } = useGetComplainee(userId);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openCardId, setOpenCardId] = useState(null);
  const handleUserModal = (userName, cardId, userId) => {
    // useComp{}
    console.log(userId);
    console.log(userName);
    console.log(cardId);
    // setIsDialogOpen(true);
    // setOpenCardId(cardId);
  };
  return (
    <>
      {/* <div onClick={() => handleUserModal(id)}>{userName}</div> */}
      <Popover
        placement="bottom"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <PopoverHandler>
          <Button
            variant="text"
            onClick={() => handleUserModal(userName, id, userId)}
          >
            {userName}
          </Button>
        </PopoverHandler>
        <PopoverContent>
          <table className="">
            <tbody>
              <tr>
                <td className="font-bold">Name:</td>
                <td>{complainee.name}</td>
              </tr>
              <tr>
                <td className="font-bold">Phone No:</td>
                <td>{complainee.phoneNumber}</td>
              </tr>
              <tr>
                <td className="font-bold">Role:</td>
                <td>{complainee.role}</td>
              </tr>
              <tr>
                <td className="font-bold">Email:</td>
                <td>{complainee.email}</td>
              </tr>
              <tr>
                <td className="font-bold">Reg No:</td>
                <td>{complainee.registrationNumber}</td>
              </tr>
              <tr>
                <td className="font-bold">House No:</td>
                <td>{complainee.houseNo}</td>
              </tr>
              <tr>
                <td className="font-bold">Street No:</td>
                <td>{complainee.streetNo}</td>
              </tr>
              <tr>
                <td className="font-bold">Block:</td>
                <td>{complainee.block}</td>
              </tr>
            </tbody>
          </table>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UserData;
