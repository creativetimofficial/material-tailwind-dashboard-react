import React, { useState } from "react";
import useGetComplain from "@/apiHooks/complain/useGetComplain";
import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns/esm";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
export const ComplainList = () => {
  // const complaints = useGetComplain();
  const { complains, loading } = useGetComplain();
  // Test COde
  const [show, setshow] = useState({
    id: "",
    display: false,
  });
  console.log(complains);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {[
              "Categories",
              "Subcategories",
              "Description",
              "Date",
              "Status",
            ].map((el) => (
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
                  {1 == 1 && <span>{item.description?.substring(0, 40)}</span>}

                  {show.id === item._id && show.display && (
                    <span>{item.description?.substring(40)}</span>
                  )}

                  <span
                    onClick={() =>
                      setshow((prev) => ({
                        ...prev,
                        display: show.id === item._id ? !show.display : true,
                        id: item._id,
                      }))
                    }
                    className="bg-red-300"
                  >
                    {show.id === item._id && show.display
                      ? "See Less"
                      : "...See More"}
                  </span>
                </td>

                <td className="border-b border-blue-gray-50 py-3 px-5">
                {formatDistanceToNow((new Date(item.date)), { addSuffix: false })}
                {/* {item.date} */}
                </td>
                <td className="border-b border-blue-gray-50 py-3 px-5">
                  {item.status}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplainList;
