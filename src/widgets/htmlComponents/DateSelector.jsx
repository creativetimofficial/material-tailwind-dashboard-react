import { Option, Select } from "@material-tailwind/react";
import React from "react";

const DateSelector = ({ setSearch }) => {
  const handleDateChange = (e) => {
    if (e === "today") {
      console.log("today");

      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);

      tomorrow.setDate(today.getDate() + 1);

      const date = { $gte: today, $lt: tomorrow };
      //   console.log(date);
      return setSearch((p) => ({ ...p, date }));
    }
    if (e === "week") {
      const today = new Date();
      const startOfRange = new Date(today);
      startOfRange.setDate(today.getDate() - 10); // Set to 10 days ago
      startOfRange.setHours(0, 0, 0, 0);

      const endOfRange = new Date(today);
      const date = {
        $gte: startOfRange,
        $lte: endOfRange,
      };
      return setSearch((p) => ({ ...p, date }));
    }
    // if (e === "week") {
    //   const today = new Date();
    //   const startOfWeek = new Date(today);
    //   startOfWeek.setDate(today.getDate() - today.getDay()); // Set to the first day (Sunday) of the current week
    //   startOfWeek.setHours(0, 0, 0, 0);

    //   const endOfWeek = new Date(today);
    //   endOfWeek.setDate(startOfWeek.getDate() + 7); // Set to the last day (Saturday) of the current week
    //   endOfWeek.setHours(23, 59, 59, 999);

    //   // Search for posts within the current week
    //   const date = {
    //     $gte: startOfWeek,
    //     $lt: endOfWeek,
    //   };
    //   return setSearch((p) => ({ ...p, date }));
    // }
    if (e === "month") {
      const today = new Date();
      const startOfRange = new Date(today);
      startOfRange.setDate(today.getDate() - 30); // Set to 30 days ago
      startOfRange.setHours(0, 0, 0, 0);

      const endOfRange = new Date(today);
      endOfRange.setHours(23, 59, 59, 999);
      const date = {
        $gte: startOfRange,
        $lt: endOfRange,
      };
      return setSearch((p) => ({ ...p, date }));
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <Select label="Search By Date" onChange={handleDateChange}>
          <Option>All Complains</Option>
          <Option value="today">Today Complaints</Option>
          <Option value="week">Week's Complaints</Option>
          <Option value="month">Month's Complaints</Option>
        </Select>
      </div>
    </>
  );
};

export default DateSelector;
