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
import ComplainLoading from "../loading/ComplainLoading";
import UserData from "./user-data-popup";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
const ComplainTable = ({
  loading,
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
  console.log(complains);
  return (
    <>
      {loading && (
        <div className="flex  items-center justify-center">
          <ComplainLoading />
        </div>
      )}
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {complains?.length < 0 && !loading && (
                  <div className="flex h-screen items-center justify-center text-3xl text-gray-700">
                    No Complains Found
                  </div>
                )}
                {/* {loading && complains.length > 0 && <span>Loading...</span>} */}
                {!loading && complains?.length > 0 && (
                  <table className="min-w-full text-left text-sm font-light ease-in">
                    <thead className="dark:border-neutral-500 border-b font-medium">
                      <tr>
                        {headings?.map((e, index) => (
                          <th key={index}>{e}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {complains?.map((item) => (
                        <tr
                          key={item?._id}
                          className="dark:border-neutral-500 border-b"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {item.category.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.subcategory.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <UserData
                              userName={item?.name}
                              id={item?._id}
                              userId={item?.userId}
                            />
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <span>{item.description?.substring(0, 40)}</span>

                            {show.id === item._id && show.display && (
                              <span>{item.description?.substring(40)}</span>
                            )}

                            {item.description.length > 40 && (
                              <span
                                onClick={() =>
                                  setshow((prev) => ({
                                    ...prev,
                                    display:
                                      show.id === item._id
                                        ? !show.display
                                        : true,
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
                          </td>
                          {admin && (
                            <td className="whitespace-nowrap px-6 py-4">
                              <Popover
                                placement="bottom"
                                animate={{
                                  mount: { scale: 1, y: 0 },
                                  unmount: { scale: 0, y: 25 },
                                }}
                              >
                                <PopoverHandler>
                                  <Button variant="text">{item.official?.name}</Button>
                                </PopoverHandler>
                                <PopoverContent>
                                  
                                  
                                  {item.statusChangeTime}
                                  {/* {formatDistanceToNow(
                                    new Date(item.statusChangeTime),
                                    {
                                      addSuffix: true,
                                    }
                                  )} */}
                                </PopoverContent>
                              </Popover>
                            </td>
                          )}

                          <td className="whitespace-nowrap px-6 py-4">
                            {formatDistanceToNow(new Date(item.date), {
                              addSuffix: true,
                            })}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {!admin && (
                              <ComplainStatus name={item?.status?.name} />
                            )}
                            {admin && (
                              <StatusSelect
                                disable={official}
                                data={statuses}
                                setvalue={setstatus}
                                id={item?.status?._id}
                                complainId={item?._id}
                              />
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {admin && (
                              <WorkerSelect
                                disable={official}
                                setvalue={setworker}
                                data={data}
                                id={item?.worker?._id}
                                complainId={item?._id}
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplainTable;
