import React, { useEffect, useState } from "react";
import useGetUsers from "@/apiHooks/user/userGetUsers";
import { Typography } from "@material-tailwind/react";

export const Residents = () => {
  const { loading, fetchUsers, users } = useGetUsers();

  useEffect(() => {
    fetchUsers({ role: "Resident" });
  }, []);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            {[
              "Name",
              "Email",
              "Phone Number",
              "Registration Number",
              "Address",
            ].map((el) => (
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
            ))}
          </tr>
        </thead>
        <tbody>
          {loading && <div>Loading...</div>}
          {users?.length === 0 && (
            <div className=" text-gray-700">No Users Found</div>
          )}
          {users?.map((user) => (
            <tr className="border-2 border-black" key={user._id}>
              <td className="border-b border-blue-gray-50 py-3 px-5">
                {user.name}
              </td>
              <td className="border-b border-blue-gray-50 py-3 px-5">
                {user.email}
              </td>
              <td className="border-b border-blue-gray-50 py-3 px-5">
                {user.phoneNumber}
              </td>
              <td className="border-b border-blue-gray-50 py-3 px-5">
                {user.registrationNumber}
              </td>
              <td className="border-b border-blue-gray-50 py-3 px-5">
                H {user.houseNo}, St {user.streetNo}, {user.block}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Residents;
