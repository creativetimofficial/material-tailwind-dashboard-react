import useStatus from "@/apiHooks/status/useStatus";
import { Select, Option, Button } from "@material-tailwind/react";
import React, { useState } from "react";

const SelectStatus = ({ fetchComplains, setSearch }) => {
  const statuses = useStatus();
  const [selectedItem, setSelectedItem] = useState("");
  const handleSelectItem = (event) => {
    setSelectedItem(event);
    //   if (!event) {
    //     return fetchComplains();
    //   }
    //   fetchComplains({ status: event });
    // };
  };
  const handleSearch = () => {
    if (!selectedItem) {
      return fetchComplains();
    }
    fetchComplains({ status: selectedItem });
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <Select
          value={""}
          onChange={(e) => setSearch((p) => ({ ...p, status: e }))}
        >
          <Option value="">All Status</Option>
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
