import React, { useState } from "react";
import { Option, Select } from "@material-tailwind/react";
const WorkerSelect = ({ id, data, setvalue, disable }) => {
  const handleChange = (e) => {
    setvalue(e);
  };
  const defaultVal = data?.find((e) => e?._id === id);
  const options = data?.map((e) => {
    return (
      <Option key={e?._id} value={e?._id}>
        <h1 className="py-2 font-bold">
          {e?.name} <span className="font-thin">({e?.field})</span>
        </h1>
      </Option>
    );
  });

  return (
    <>
      <Select
        disabled={disable}
        // value={defaultVal?._id}
        value={defaultVal?._id}
        onChange={handleChange}
        label="Select Worker"
      >
        {options}
      </Select>
    </>
  );
};

export default WorkerSelect;
