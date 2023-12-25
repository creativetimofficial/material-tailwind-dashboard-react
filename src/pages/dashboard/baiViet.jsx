import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Textarea,
  Select,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { DayPicker } from "react-day-picker";
import vi from 'date-fns/locale/vi'
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { format, parse } from 'date-fns';

export function BaiViet() {
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const alerts = ["gray", "green", "orange", "red"];
  const formatDate = "yyyy-MM-dd HH:mm";
  const [combinedDateTime, setCombinedDateTime] = React.useState(new Date());

  const handleDate = (selectedDate) => {
    const parsedDate = parse(selectedDate, formatDate, new Date());
    setCombinedDateTime(parsedDate);
  }

  const handleChangeTime = (selectedTime) => {
    const [hours, minutes] = selectedTime.split(':');
    const updatedDateTime = new Date(combinedDateTime);
    updatedDateTime.setHours(parseInt(hours, 10));
    updatedDateTime.setMinutes(parseInt(minutes, 10));
    setCombinedDateTime(updatedDateTime);
  }

  let footer = <p>Please pick a day.</p>;
  if (combinedDateTime) {
    footer = <p>You picked {format(combinedDateTime, formatDate)}</p>;
  }

  return (
    <div className="">
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
            Bài viết
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col p-4 mb-2">
          <form className="flex flex-row gap-4 mx-auto w-full flex-wrap lg:flex-nowrap">
            {/* CONTENT */}
            <div className="flex flex-col gap-4 w-full">
              <img
                className="h-72 w-full rounded-lg object-cover object-center"
                src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                alt="nature image"
              />
              <Input
                size="lg"
                placeholder="Tiêu đề"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Textarea color="gray" variant="outlined" label="Content" rows={12}/>
            </div>
           
            {/* OPTIONS */}
            <div className="flex flex-col gap-4 w-full">
              <Select
                label="Thể loại"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>

              {/* SELECT DATE TIME */}
              <Popover placement="bottom">
                  <PopoverHandler>
                    <Input
                      label="Ngày xuất bản"
                      onChange={handleDate}
                      value={combinedDateTime ? format(combinedDateTime, formatDate) : ""}
                    />
                  </PopoverHandler>
                  <PopoverContent>
                    <DayPicker
                      mode="single"
                      sselected={combinedDateTime}
                      onSelect={setCombinedDateTime}
                      required
                      locale={vi}
                      showOutsideDays
                      footer={footer}
                      className="border-0"
                      classNames={{
                        caption: "flex justify-center py-2 mb-4 relative items-center",
                        caption_label: "text-sm font-medium text-gray-900",
                        nav: "flex items-center",
                        nav_button:
                          "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                        nav_button_previous: "absolute left-1.5",
                        nav_button_next: "absolute right-1.5",
                        table: "w-full border-collapse",
                        head_row: "flex font-medium text-gray-900",
                        head_cell: "m-0.5 w-9 font-normal text-sm",
                        row: "flex w-full mt-2",
                        cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal",
                        day_range_end: "day-range-end",
                        day_selected:
                          "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                        day_today: "rounded-md bg-gray-200 text-gray-900",
                        day_outside:
                          "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                        day_disabled: "text-gray-500 opacity-50",
                        day_hidden: "invisible",
                      }}
                      components={{
                        IconLeft: ({ ...props }) => (
                          <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                        ),
                        IconRight: ({ ...props }) => (
                          <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                        ),
                      }}
                    />

                  <TimePicker locale="sv-sv" onChange={handleChangeTime} value={combinedDateTime} />
                  </PopoverContent>
                </Popover>
              <Textarea color="gray" variant="outlined" label="Ghi chú" rows={2}/>
              <Button fullWidth>
                Lưu
              </Button>
            </div>
          </form>
        </CardBody>

      </Card>
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
            Alerts with Icon
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
          {alerts.map((color) => (
            <Alert
              key={color}
              open={showAlertsWithIcon[color]}
              color={color}
              icon={
                <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
              }
              onClose={() => setShowAlertsWithIcon((current) => ({
                ...current,
                [color]: false,
              }))}
            >
              A simple {color} alert with an <a href="#">example link</a>. Give
              it a click if you like.
            </Alert>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

export default BaiViet;
