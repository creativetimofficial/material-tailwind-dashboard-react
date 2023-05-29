import React, { useEffect, useState } from "react";
import useGetEmployees from "@/apiHooks/employee/useGetEmployees";
import { Typography, Select, Option } from "@material-tailwind/react";

export const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const { loading, fetchEmployees, data } = useGetEmployees();

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <table className="w-full ">
        <thead>
          <tr>
            {["Name", "Email", "Designation", "Phone number"].map((el) => (
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
          {data?.length === 0 && !loading && (
            <div className=" text-gray-700">No Employees Found</div>
          )}
          {data?.map((employee) => (
            <tr className="border-2 border-black" key={employee._id}>
              <td className="border-b border-blue-gray-50 py-3 px-5">
                {employee.name}
              </td>
              <td className="border-b border-blue-gray-50 py-3 px-5">
                {employee.email}
              </td>
              <td className="border-b border-blue-gray-50 py-3 px-5">
                {employee.designation}
              </td>
              <td className="border-b border-blue-gray-50 py-3 px-5">
                {employee.phoneNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmployee;
