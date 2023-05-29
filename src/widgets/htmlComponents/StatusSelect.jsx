import useStatus from "@/apiHooks/status/useStatus";
import { Select, Option } from "@material-tailwind/react";
import React, { useState } from "react";

const SelectStatus = ({ fetchComplains }) => {
  const statuses = useStatus();
  const [selectedItem, setSelectedItem] = useState("");
  const handleSelectItem = (event) => {
    setSelectedItem(event);
    fetchComplains(event);
  };
  return (
    <Select value={""} onChange={handleSelectItem}>
      <Option value="">All Status</Option>
      {statuses?.map((status) => (
        <Option key={status._id} value={status._id}>
          {status.name}
        </Option>
      ))}
    </Select>
  );
};

export default SelectStatus;
