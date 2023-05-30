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
const ComplainTable = ({
  fetchComplains,
  pending,
  headings,
  complains,
  show,
  setshow,
  employee,
  statuses,
  setstatus,
  admin,
  official,
  selectedEmployee,
  setselectedEmployee,
  assignComplain,
  data,
  setworker,
  handleUpdate,
}) => {
  return (
    <>
      <div>
        {!complains && <span>Loading...</span>}
        {complains?.length === 0 && (
          <span className="text-3xl text-gray-700">No Complains Found</span>
        )}
        {complains &&
          complains?.map((item) => (
            <div
              className="grid grid-cols-[1fr,1fr,4fr,1fr,1fr,1fr,1fr]"
              key={item._id}
            >
              <div className="border-b border-blue-gray-50 py-3 px-5">
                {item.category.name}
              </div>
              <div className="border-b border-blue-gray-50 py-3 px-5">
                {item.subcategory.name}
              </div>
              <div className="border-b border-blue-gray-50 py-3 px-5">
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
                      ? "See Less"
                      : "...See More"}
                  </span>
                )}
              </div>

              <div className="border-b border-blue-gray-50 py-3 px-5">
                {formatDistanceToNow(new Date(item.date), {
                  addSuffix: true,
                })}
              </div>
              <div className="border-b border-blue-gray-50 py-3 px-5 ">
                {!admin && <ComplainStatus name={item?.status?.name} />}
                {admin && (
                  <StatusSelect
                    disable={official}
                    data={statuses}
                    setvalue={setstatus}
                    id={item?.status?._id}
                  />
                )}
              </div>
              {/* Assignied to Staff */}
              {admin && (
                <div className="border-b border-blue-gray-50 py-3 px-5 ">
                  <WorkerSelect
                    disable={official}
                    setvalue={setworker}
                    data={data}
                    id={item?.worker?._id}
                  />
                </div>
              )}
              {/* Edit Button */}
              {admin && !official && (
                <div className="cursor-pointer border-blue-gray-50 py-3 px-5 ">
                  <PencilSquareIcon
                    width={25}
                    className=""
                    onClick={() => handleUpdate(item?._id)}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default ComplainTable;
