import React, { useEffect, useState } from "react";
import useGetComplain from "@/apiHooks/complain/useGetComplain";
import { formatDistanceToNow } from "date-fns";
import { Typography } from "@material-tailwind/react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import EmployeeSelect from "@/widgets/employee/EmployeeSelect";
import useAssignComplain from "@/apiHooks/complain/useAssignComplain";
import ComplainStatus from "@/widgets/complain/ComplainStatus";
import SelectStatus from "@/widgets/htmlComponents/StatusSelect";
import WorkerSelect from "@/widgets/worker/WorkerSelect";
import useGetWorker from "@/apiHooks/worker/useGetWorker";
import useGetEmployees from "@/apiHooks/employee/useGetEmployees";
import useUpdateStatus from "@/apiHooks/status/useUpdateStatus";
import StatusSelect from "@/widgets/complain/StatusSelect";
import useStatus from "@/apiHooks/status/useStatus";
import ComplainTable from "@/widgets/complain/complain-table";
import useGetUsers from "@/apiHooks/user/userGetUsers";
export const ComplainList = ({ admin, official }) => {
  const { fetchUsers, users } = useGetUsers();
  useEffect(() => {
    fetchUsers({ role: "Worker" });
  }, []);

  const statuses = useStatus();

  //
  const updateStatus = useUpdateStatus();
  //
  const { fetchComplains, loading, pending, complains } = useGetComplain();

  // Select Component States Passed Thorugh Props

  // const [selectedEmployee, setselectedEmployee] = useState("");
  const [worker, setworker] = useState("");
  const [status, setstatus] = useState("");
  const assignComplain = useAssignComplain(fetchComplains);
  // Making Table Arrays
  const [headings, setheadings] = useState([
    "Categories",
    "Subcategories",
    "Description",
    "Date",
    "Status",
    "Assign Worker",
    "Action",
    "Assigned To",
    "Edit",
  ]);
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

  const handleUpdate = (_id) => {
    console.log(_id, "Complain IDDDDDDD");
    console.log(worker);

    if (worker) {
      assignComplain({
        _id,
        worker,
      });
    }
    if (status) {
      updateStatus({
        _id,
        status,
      });
    }
  };

  // const tableHeadings = [
  //   "Categories",
  //   "Subcategories",
  //   "Description",
  //   "Date",
  //   "Status",
  //   "Assign Worker",
  //   "Action",
  //   "Assigned To",
  //   "Edit",
  // ];

  // if (!admin) {
  //   tableHeadings.pop();
  //   tableHeadings.pop();
  // }

  // Test COde
  const [show, setshow] = useState({
    id: "",
    display: false,
  });

  if (loading) {
    return <span>Loading...</span>;
  }

  useEffect(() => {
    fetchComplains();
  }, []);

  return (
    <div>
      <SelectStatus fetchComplains={fetchComplains} />
      <h1 className="py-5 text-center text-2xl ">
        You have {pending} Pending Complains
      </h1>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <div className="grid grid-cols-[1fr,1fr,3fr,1fr,1fr,1fr,1fr]">
                {headings?.map((el) => (
                  <div
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </div>
                ))}
              </div>
              <div>
                <ComplainTable
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
                  assignComplain={assignComplain}
                  data={users}
                  setworker={setworker}
                  handleUpdate={handleUpdate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ComplainTable
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
        assignComplain={assignComplain}
        data={users}
        setworker={setworker}
        handleUpdate={handleUpdate}
      /> */}
    </div>
  );
};

export default ComplainList;
