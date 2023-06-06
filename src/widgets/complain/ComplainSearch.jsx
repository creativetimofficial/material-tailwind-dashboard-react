import React, { useState } from "react";
import SelectStatus from "../htmlComponents/StatusSelect";
import { Button } from "@material-tailwind/react";

const ComplainSearch = ({ fetchComplains }) => {
  const [searchData, setsearchData] = useState({});
  console.log(searchData);

  // const handleSearch = () => {
  //     if (!selectedItem) {
  //       return fetchComplains();
  //     }
  //     fetchComplains({ status: selectedItem });
  //   };
  return (
    <>
      <div>
        <SelectStatus setSearch={setsearchData} />
        <Button
        // onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </>
  );
};

export default ComplainSearch;
