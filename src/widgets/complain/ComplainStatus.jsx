import React from "react";

const ComplainStatus = ({ name }) => {
  const colorr =
    name === "Pending" ? "#ae1b1b" : name === "In-Progress" && "#3890e3";
  return (
    // <span className={`rounded-xl bg-[${"black"}] px-4  py-1.5 text-white`}>
    <div className="status-btns w-32 text-center">
      <div className={`rounded-xl bg-black px-4  py-1.5 text-white`}>
        {name}
      </div>
    </div>
  );
};

export default ComplainStatus;
