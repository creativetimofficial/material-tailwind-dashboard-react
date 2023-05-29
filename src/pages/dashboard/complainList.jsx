import React, { useEffect, useState } from "react";
import useGetComplain from "@/apiHooks/complain/useGetComplain";
import { formatDistanceToNow } from "date-fns";
import { Typography } from "@material-tailwind/react";
import { ArrowPathIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
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
export const ComplainList = ({ admin, employee }) => {
  // Select Options Data Passed Through Props
  const { data } = useGetWorker();
  const { data: officals } = useGetEmployees();
  const statuses = useStatus();
  //
  const updateStatus = useUpdateStatus();
  //
  const [complains, setComplains] = useState();
  const { fetchComplains, loading, pending } = useGetComplain(
    setComplains,
    admin
  );

  // Select Component States Passed Thorugh Props

  const [selectedEmployee, setselectedEmployee] = useState("");
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
    if (employee) {
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

  const tableHeadings = [
    "Categories",
    "Subcategories",
    "Description",
    "Date",
    "Status",
    "Assign Worker",
    "Action",
    "Assigned To",
    "Edit",
  ];

  if (!admin) {
    tableHeadings.pop();
    tableHeadings.pop();
  }

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
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {headings?.map((el) => (
              <th
                key={el}
                className="border-b border-blue-gray-50 py-3 px-5 text-left"
              >
                <Typography
                  variant="small"
                  className="text-[11px] font-bold uppercase text-blue-gray-400"
                >
                  {el}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!complains && <span>Loading...</span>}
          {complains?.length === 0 && (
            <span className="text-3xl text-gray-700">No Complains Found</span>
          )}
          {complains?.map((item) => (
            <>
              <tr className="border-2 border-black" key={item._id}>
                <td className="border-b border-blue-gray-50 py-3 px-5">
                  {item.category.name}
                </td>
                <td className="border-b border-blue-gray-50 py-3 px-5">
                  {item.subcategory.name}
                </td>
                <td className="border-b border-blue-gray-50 py-3 px-5">
                  {1 === 1 && <span>{item.description?.substring(0, 40)}</span>}

                  {show.id === item._id && show.display && (
                    <span>{item.description?.substring(40)}</span>
                  )}

                  {item.description.length > 40 && (
                    <span
                      onClick={() =>
                        setshow((prev) => ({
                          ...prev,
                          display: show.id === item._id ? !show.display : true,
                          id: item._id,
                        }))
                      }
                      className="text-sm text-blue-800"
                    >
                      {show.id === item._id && show.display
                        ? "   See Less"
                        : "...See More"}
                    </span>
                  )}
                </td>

                <td className="border-b border-blue-gray-50 py-3 px-5">
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </td>
                <td className="border-b border-blue-gray-50 py-3 px-5 ">
                  {!employee && <ComplainStatus name={item?.status?.name} />}
                  {employee && (
                    <StatusSelect
                      data={statuses}
                      setvalue={setstatus}
                      id={item?.status?._id}
                    />
                  )}
                </td>
                {/* Assignied to Staff */}
                {admin && (
                  <td className="border-b border-blue-gray-50 py-3 px-5 ">
                    <EmployeeSelect
                      data={officals}
                      employee={item.assignedTo?._id}
                      setEmployee={setselectedEmployee}
                    />
                  </td>
                )}
                {/* Edit Button */}
                {admin && (
                  <td className=" cursor-pointer border-blue-gray-50 py-3 px-5 ">
                    <PencilSquareIcon
                      width={25}
                      className=""
                      onClick={() => {
                        assignComplain({
                          _id: item?._id,
                          assignedTo: selectedEmployee,
                        });
                      }}
                    />
                  </td>
                )}
                {employee && (
                  <td className="border-b border-blue-gray-50 py-3 px-5 ">
                    <WorkerSelect
                      setvalue={setworker}
                      data={data}
                      id={item?.worker?._id}
                    />
                  </td>
                )}
                {employee && (
                  <td className="border-b border-blue-gray-50 py-3 px-5 ">
                    <PencilSquareIcon
                      width={25}
                      className="cursor-pointer"
                      onClick={() => {
                        handleUpdate(item?._id);
                        fetchComplains();
                      }}
                    />
                  </td>
                )}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplainList;
