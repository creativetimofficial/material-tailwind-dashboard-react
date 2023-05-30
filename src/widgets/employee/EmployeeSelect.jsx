import useGetEmployees from "@/apiHooks/employee/useGetEmployees";
import { Option, Select } from "@material-tailwind/react";
import React, { useEffect } from "react";

const EmployeeSelect = ({ setEmployee, employee, data }) => {
  const defaultSelect = data?.find((e) => e?._id === employee);
  return (
    <>
      <Select
        label="Select Employee"
        value={defaultSelect?._id}
        className="rounded-lg  border-[1.5px] border-gray-500 px-2 py-1"
        onChange={(o) => setEmployee(o)}
      >
        {data?.map((e) => (
          <Option key={e?._id} value={e?._id}>
            {e?.name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default EmployeeSelect;
