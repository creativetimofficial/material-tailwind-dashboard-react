import React, { useEffect, useState } from "react";
import useGetComplain from "@/apiHooks/complain/useGetComplain";
import useStatus from "@/apiHooks/status/useStatus";
import ComplainTable from "@/widgets/complain/complain-table";
import useGetUsers from "@/apiHooks/user/userGetUsers";
import ComplainSearch from "@/widgets/complain/ComplainSearch";

export const ComplainList = ({ admin, official }) => {
  const { fetchUsers, users } = useGetUsers();
  const { fetchComplains, loading, pending, complains } = useGetComplain();
  const statuses = useStatus();
  console.log(complains, "Total Complains");
  // const [selectedEmployee, setselectedEmployee] = useState("");
  const [worker, setworker] = useState("");
  const [status, setstatus] = useState("");
  const [show, setshow] = useState({
    id: "",
    display: false,
  });
  const [headings, setheadings] = useState([
    "Categories",
    "Subcategories",
    "Complainee",
    "Description","By",
    "Date",
    "Status",
    "Assign Worker",
    "Action",
    "Assigned To",
    "Edit",
  ]);
  useEffect(() => {
    fetchUsers({ role: "Worker" });
  }, []);
  // Making Table Arrays

  useEffect(() => {
    if (admin) {
      const stringsToDelete = ["Assign Worker", "Action"];
      setheadings(headings.filter((s) => !stringsToDelete.includes(s)));
      return;
    }
    if (official) {
      const stringsToDelete = ["Assigned To", "Edit"];
      setheadings(headings.filter((s) => !stringsToDelete.includes(s)));
      return;
    }
    setheadings([
      "Categories",
      "Subcategories",
      "Description",
      "Date",
      "Status",
    ]);
  }, []);

  useEffect(() => {
    fetchComplains();
  }, []);

  return (
    <div>
      <ComplainSearch fetchComplains={fetchComplains} />
      <div className="mt-10"></div>
      <ComplainTable
        loading={loading}
        fetchComplains={fetchComplains}
        pending={pending}
        headings={headings}
        complains={complains}
        show={show}
        setshow={setshow}
        statuses={statuses}
        setstatus={setstatus}
        admin={admin}
        official={official}
        data={users}
        setworker={setworker}
        // handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default ComplainList;
