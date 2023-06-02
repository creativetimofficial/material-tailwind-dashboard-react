import React, { useState } from "react";
import { Option, Select } from "@material-tailwind/react";
import useAssignComplain from "@/apiHooks/complain/useAssignComplain";
const WorkerSelect = ({ id, data, setvalue, disable, complainId }) => {
  const assignComplain = useAssignComplain();

  const handleChange = (worker) => {
    // setvalue(e);
    assignComplain({
      _id: complainId,
      worker,
    });
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
