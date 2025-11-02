import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { stationsTableData } from "@/data";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";

const URL = "https://sg5.fusionsolar.huawei.com/thirdData/stations";
const TOKEN = "n-aps57x9fnv08tc6rld0b7wao9cel8btic9pg9clf3w1c2qrzdfo6tgs5g41i1cc7btiks6an461gnxtj5ctiilarvvpehcqm3tbsdj2p06fxc6g81gmrtcvude1ceojt";

export function Fetch() {

    const [pageNo,setPageNo] = useState(1);    
    const [startTime,setStartTime] = useState();  
    const [endTime,setEndTime] = useState();  

    const postData = {
        pageNo: pageNo//,
        //startTime: startTime,
        //endTime: endTime
    };
    useEffect(async ()=> {

        function getStations(){}
            debugger;
            console.log(JSON.stringify(postData));
            const response = await fetch(URL,{
                    method: 'POST', 
                    headers: {
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true',
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Max-Age':'86400',
                        'xsrf-token':TOKEN
                    },
                    body: JSON.stringify(postData)
                });
            const data = await response.json();
            console.log(data);
    }
    );

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
        <Button className="flex items-center gap-2" variant="outlined" size="md" color="green" onClick={(e)=>refreshData()}>Refresh
         <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
       </Button>
       <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Stations Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Plant Name", "Code", "Address", "longitude", "latitude", "Capacity","Grid Date",""].map(
                  (el) => (
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
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {stationsTableData.map(
                ({ plantName, plantCode, plantAddress, longitude, latitude, capacity, gridConnectionDate }, key) => {
                  const className = `py-3 px-5 ${
                    key === stationsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={plantName}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src="/img/factory-svgrepo-com.svg" alt={plantName} size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {plantName}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {plantCode}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {plantAddress}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {longitude}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {latitude}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {capacity}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {gridConnectionDate}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Pagination></Pagination>
    </div>
  );
}

export default Fetch;
