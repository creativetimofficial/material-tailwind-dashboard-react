import useSearchUser from "@/apiHooks/user/useSearchUser";
import { Input } from "@material-tailwind/react";
import React, { useState } from "react";

const SearchInput = ({ setuserId }) => {
  const [check, setCheck] = useState("");
  const [open, setopen] = useState(false);
  const { searchUser, users } = useSearchUser();
  console.log(users);
  const handleChange = (text) => {
    console.log(text);
    setCheck(text);
    searchUser(text);
    setopen(true);
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
        {open && check !== "" && (
          <div className="max-h-200 absolute z-50 h-52 overflow-auto  overflow-y-auto border border-gray-300 bg-white shadow">
            {users?.map((e, index) => (
              <div
                onClick={() => {
                  console.log(e?._id);
                  setuserId(e?._id);
                  setopen(false);
                  setCheck(e?.name);
                }}
                className="cursor-pointer border border-gray-300 py-2 px-4 hover:bg-gray-200"
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
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchInput;
