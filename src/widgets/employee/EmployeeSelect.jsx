import useGetEmployees from "@/apiHooks/employee/useGetEmployees";
import React, { useEffect } from "react";

const EmployeeSelect = ({ setEmployee, employee }) => {
  const { loading, fetchEmployees, data } = useGetEmployees();
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <select
        className="rounded-lg  border-[1.5px] border-gray-500 px-2 py-1"
        onChange={(o) => setEmployee(o.target.value)}
        name=""
        id=""
      >
        <option value="">Select Employee</option>
        {data?.map((e) => (
          <option
            selected={e?._id === employee && "selected"}
            key={e?._id}
            value={e?._id}
          >
            {e?.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default EmployeeSelect;
