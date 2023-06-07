import React, { useState } from "react";
import SelectStatus from "../htmlComponents/StatusSelect";
import { Button, Input } from "@material-tailwind/react";
import DateSelector from "../htmlComponents/DateSelector";

const ComplainSearch = ({ fetchComplains }) => {
  const [searchData, setsearchData] = useState({});
  const [user, setuser] = useState("");
  let check;
  const checkOnChange = (e) => {
    const regex = /^[a-zA-Z]+$/;
    const regex2 = /^[a-zA-Z\s]*$/;
    const teste = regex2.test(e);
    const vals = teste ? { name: e } : { phoneNumber: e };
    check = vals;
    console.log(check);
  };
  const handleSearch = () => {
    console.log({ ...searchData, user: check });
    fetchComplains({ ...searchData, user: check });
  };
  return (
    <>
      <div className="flex  gap-6">
        <SelectStatus setSearch={setsearchData} />
        <DateSelector setSearch={setsearchData} />
        <div>
          <Input
            className="w-62"
            label="Search Number or Name"
            type="text"
            onChange={(e) => checkOnChange(e.target.value)}
          />
        </div>
        <Button onClick={handleSearch}>Search Complaints</Button>
      </div>
    </>
  );
};

export default ComplainSearch;
