import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [loginStats, setLoginStats] = useState(null);

  useEffect(() => {
    const fetchLoginStats = async () => {
      try {
        const token = localStorage.getItem("token");  // nhớ lưu token trước đó
        const response = await axios.get(
          "https://api-ndolv2.nongdanonline.cc/user-dashboard/login-stats",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setLoginStats(response.data);
      } catch (error) {
        console.error("Error fetching login stats:", error);
      }
    };
    fetchLoginStats();
  }, []);

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {loginStats ? (
        <>
          <Card className="p-4 flex items-center">
            <UserIcon className="w-8 h-8 text-blue-500 mr-4" />
            <div>
              <Typography variant="h6">Today's Login</Typography>
              <Typography variant="h4">{loginStats.todayLogin}</Typography>
            </div>
          </Card>
          <Card className="p-4 flex items-center">
            <UserIcon className="w-8 h-8 text-green-500 mr-4" />
            <div>
              <Typography variant="h6">Yesterday's Login</Typography>
              <Typography variant="h4">{loginStats.yesterdayLogin}</Typography>
            </div>
          </Card>
          <Card className="p-4 flex items-center">
            <UserIcon className="w-8 h-8 text-orange-500 mr-4" />
            <div>
              <Typography variant="h6">Last 7 Days Login</Typography>
              <Typography variant="h4">{loginStats.last7DaysLogin}</Typography>
            </div>
          </Card>
          <Card className="p-4 flex items-center">
            <UserIcon className="w-8 h-8 text-red-500 mr-4" />
            <div>
              <Typography variant="h6">Last 30 Days Login</Typography>
              <Typography variant="h4">{loginStats.last30DaysLogin}</Typography>
            </div>
          </Card>
        </>
      ) : (
        <Typography>Loading login stats...</Typography>
      )}
    </div>
  );
}
