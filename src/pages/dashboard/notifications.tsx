import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

// Define types for state and alert colors
type AlertColor = "gray" | "green" | "orange" | "red"; // Add other Material Tailwind colors if used

interface AlertVisibilityState {
  gray: boolean;
  green: boolean;
  orange: boolean;
  red: boolean;
  // Potentially other colors if needed, ensure this matches 'alerts' array
}

export function Notifications() {
  const [showAlerts, setShowAlerts] = React.useState<AlertVisibilityState>({
    gray: true, // Changed from blue to gray to match 'alerts' array
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState<AlertVisibilityState>({
    gray: true, // Changed from blue to gray to match 'alerts' array
    green: true,
    orange: true,
    red: true,
  });
  const alerts: AlertColor[] = ["gray", "green", "orange", "red"];

  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
            Alerts
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
          {alerts.map((color: AlertColor) => ( // Explicitly type color
            <Alert
              key={color}
              open={showAlerts[color]} // color is a valid key of AlertVisibilityState
              color={color} // color is a valid AlertColor
              onClose={() => setShowAlerts((current: AlertVisibilityState) => ({ ...current, [color]: false }))}
            >
              A simple {color} alert with an <a href="#">example link</a>. Give
              it a click if you like.
            </Alert>
          ))}
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
          {alerts.map((color: AlertColor) => ( // Explicitly type color
            <Alert
              key={color}
              open={showAlertsWithIcon[color]} // color is a valid key of AlertVisibilityState
              color={color} // color is a valid AlertColor
              icon={
                <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
              }
              onClose={() => setShowAlertsWithIcon((current: AlertVisibilityState) => ({
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

export default Notifications;
