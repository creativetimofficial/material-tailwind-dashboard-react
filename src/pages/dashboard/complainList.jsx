import React, { useEffect, useState } from "react";
import useGetComplain from "@/apiHooks/complain/useGetComplain";
import { formatDistanceToNow } from "date-fns";
import { Typography, Select, Option } from "@material-tailwind/react";
import DropdownStatus from "./dropdownStatus";

export const ComplainList = ({ admin }) => {
  const [complains, setComplains] = useState();
  const { fetchComplains, loading } = useGetComplain(setComplains, admin);

  // Test COde
  const [show, setshow] = useState({
    id: "",
    display: false,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    fetchComplains();
  }, []);

  return (
    <div>
      <DropdownStatus fetchComplains={fetchComplains} />
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {[
              "Categories",
              "Subcategories",
              "Description",
              "Date",
              "Status",
              "Assigned To",
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
          {!complains && <div>Loading...</div>}
          {complains?.length === 0 && (
            <div className="text-3xl text-gray-700">No Complains Found</div>
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
                  {1 == 1 && <span>{item.description?.substring(0, 40)}</span>}

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
                      className="text-sm"
                    >
                      {show.id === item._id && show.display
                        ? "See Less"
                        : "...See More"}
                    </span>
                  )}
                </td>

                <td className="border-b border-blue-gray-50 py-3 px-5">
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </td>
                <td className="border-b border-blue-gray-50 py-3 px-5 font-bold text-yellow-800">
                  {item.status.name}
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
