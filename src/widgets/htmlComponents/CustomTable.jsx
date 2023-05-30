import React from "react";

const CustomTable = ({ headings, tableData }) => {
  const tableCell = () => {
    return (
      <td className="whitespace-nowrap px-6 py-4 font-medium">
        {"data?.name"}
      </td>
    );
  };
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full border-2 border-gray-600 text-left text-sm font-light">
              <thead className="dark:border-neutral-500 border-b font-medium">
                <tr>
                  {headings?.map((e, i) => (
                    <th key={i} scope="col" className="px-6 py-4">
                      {e}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData?.map((data) => {
                  console.log(data?.email);
                  return (
                    <tr
                      key={data?._id}
                      className="dark:border-neutral-500 border-b"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {data?.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {data?.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {data?.designation}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {data?.phoneNumber}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
