import useSearchUser from "@/apiHooks/user/useSearchUser";
import { Input } from "@material-tailwind/react";
import React, { useState } from "react";

const SearchInput = () => {
  const [check, setcheck] = useState("");

  const { searchUser, users } = useSearchUser();
  console.log(users);
  const handleChange = (text) => {
    console.log(text);
    setcheck(text);
    searchUser(text);
  };
  return (
    <>
      <div>
        <Input
          label="Search Resident"
          type="text"
          value={check}
          onChange={(e) => handleChange(e.target.value)}
        />
        {check && (
          <div>
            {users?.map((e, index) => (
              <>
                <div
                  onClick={() => {
                    console.log(e?._id);
                    setcheck("");
                  }}
                  className="cursor-pointer border border-gray-300 hover:bg-gray-200"
                  key={index}
                >
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold">
                      Name: <span className="font-thin">{e?.name}</span>
                    </span>
                    <span className="font-semibold">
                      PhoneNumber:{" "}
                      <span className="font-thin">{e?.phoneNumber}</span>
                    </span>
                    <span className="font-semibold">
                      Registration:{" "}
                      <span className="font-thin">{e?.registrationNumber}</span>
                    </span>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchInput;
