import React, { useState } from "react";
import SelectStatus from "../htmlComponents/StatusSelect";
import { Button, Input } from "@material-tailwind/react";
import DateSelector from "../htmlComponents/DateSelector";

const ComplainSearch = ({ fetchComplains }) => {
  const [searchData, setsearchData] = useState({});
  const [user, setuser] = useState("");
  const [userPayload, setuserPayload] = useState({});
  console.log(searchData);
  const handleSearch = () => {
    if (user) {
      setuserPayload((prev) => ({
        ...prev,
        name: undefined,
        phoneNumber: undefined,
      }));
      const regex = /^[a-zA-Z]+$/;
      const check = regex.test(user)
        ? setuserPayload((prev) => ({ ...prev, name: user }))
        : setuserPayload((prev) => ({ ...prev, phoneNumber: user }));

      if (!Object.keys(userPayload)?.length) {
        setsearchData((prev) => ({ ...prev, user: userPayload }));
      }
      console.log(searchData, "akjsghdjagdsj");
      return;
    }
    if (!Object.keys(searchData)?.length) {
      console.log("Check Rmpty");
      return;
    }
    fetchComplains(searchData);
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
            onChange={(e) => setuser(e.target.value)}
          />
        </div>
        <Button onClick={handleSearch}>Search Complaints</Button>
      </div>
    </>
  );
};

export default ComplainSearch;
