import useGetWorker from "@/apiHooks/worker/useGetWorker";
import { Typography } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import React, { useEffect } from "react";
import useDeleteWorker from "@/apiHooks/worker/useDeleteWorker";

const ListWorkers = () => {
  const { data, loading, getWorkers } = useGetWorker();
  const deleteWorker = useDeleteWorker(getWorkers);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* <h1 className="my-10 text-center ">Your Workers</h1> */}
        <h1 className="p-7 text-center text-2xl font-medium ">Your Workers</h1>
        <table className="w-[50vw]">
          <thead>
            <tr>
              {["Name", "Field", "Delete"].map((el) => (
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
            {loading && <div>Loading...</div>}

            {data?.length === 0 && !loading && (
              <div className=" text-gray-700">No Workers Found</div>
            )}

            {!loading &&
              data?.map((worker) => (
                <tr className="border-2 border-black" key={worker._id}>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    {worker.name}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    {worker.field}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    <TrashIcon
                      onClick={() => deleteWorker(worker?._id)}
                      color="red"
                      className="w-7 cursor-pointer hover:text-red-500"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListWorkers;
