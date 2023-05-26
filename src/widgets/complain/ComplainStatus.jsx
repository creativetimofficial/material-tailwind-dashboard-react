import React from "react";

const ComplainStatus = ({ name }) => {
  const colorr =
    name === "Pending" ? "#ae1b1b" : name === "In-Progress" && "#3890e3";
  return (
    <span className={`rounded-xl bg-[${colorr}] px-4  py-1.5 text-white`}>
      {name}
    </span>
  );
};

export default ComplainStatus;
