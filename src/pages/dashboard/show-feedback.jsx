import useGetFeedback from "@/apiHooks/feedback/useGetFeedback";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { formatDistanceToNow } from "date-fns";
export const ShowFeedback = () => {
  const { loading, feedbackList } = useGetFeedback();
  return (
    <div className="flex ">
      {feedbackList.map((feedback) => (
        <Card
          color="white"
          shadow={false}
          className="border-sky-500 m-5 w-full max-w-[26rem] border-2 border-solid p-5"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-5"
          >
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  {feedback.userId.name}
                </Typography>
                <div
                  className={`flex items-center gap-0 ${
                    feedback.feedback === "satisfied"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {feedback.feedback === "satisfied"
                    ? "Satisfied"
                    : "Not Satisfied"}
                </div>
              </div>
              <div className="flex justify-between">
                <Typography color="blue-gray">
                  {feedback.userId.phoneNumber}
                </Typography>
                <div className="font-bold">{feedback.complainId.official.name}</div>
              </div>
              <Typography color="blue-gray">
                {formatDistanceToNow(new Date(feedback.date), {
                  addSuffix: true,
                })}
              </Typography>
              <Typography color="blue-gray">
                {/* Assignee:{feedback.complainId.official.name} */}
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <Typography>&quot;{feedback.description}&quot;</Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ShowFeedback;
