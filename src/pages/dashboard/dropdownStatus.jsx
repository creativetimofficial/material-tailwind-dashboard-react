import useGetComplain from "@/apiHooks/complain/useGetComplain";
import useStatus from "@/apiHooks/status/useStatus";
import { Typography, Select, Option } from "@material-tailwind/react";
import React, { useState } from "react";

const dropdownStatus = ({ fetchComplains }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const statuses = useStatus();

  const handleSelectItem = (event) => {
    setSelectedItem(event);
    fetchComplains(event);
  };
  return (
    <div>
      <Select value={selectedItem} onChange={handleSelectItem}>
        <Option value="">All Status</Option>
        {statuses.map((status) => (
          <Option key={status._id} value={status._id}>
            {status.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default dropdownStatus;
