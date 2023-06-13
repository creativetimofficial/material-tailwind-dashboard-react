import useStatus from "@/apiHooks/status/useStatus";
import { Select, Option, Button } from "@material-tailwind/react";
import React, { useState } from "react";

const SelectStatus = ({ setSearch }) => {
  const [valStatus, setvalStatus] = useState('')
  console.log(valStatus)
  const statuses = useStatus();
  const handleState = (status) => {
    setvalStatus(status)
    if (!status) {
      return setSearch((p) => ({ ...p, status: undefined }));
    }
    setSearch((p) => ({ ...p, status }));
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <Select  label="Select Status" onChange={handleState}>
          {/* <Option value=""  >All Status</Option> */}
          {statuses?.map((status) => (
            <Option key={status._id} value={status._id}>
              {status.name}
            </Option>
          ))}
        </Select>
      </div>
    </>
  );
};

export default SelectStatus;
