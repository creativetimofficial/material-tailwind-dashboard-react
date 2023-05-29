import { Option, Select } from "@material-tailwind/react";
import React from "react";

const StatusSelect = ({ setvalue, data, id }) => {
  const defaultVal = data?.find((e) => e?._id === id);
  return (
    <>
      <Select
        label="Select Status"
        value={defaultVal?._id}
        className="rounded-lg  border-[1.5px] border-gray-500 px-2 py-1"
        onChange={(o) => setvalue(o)}
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

export default StatusSelect;
