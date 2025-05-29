import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import type { ReactNode } from 'react';

// Define the color type based on PropTypes Material Tailwind color palette
export type MaterialColor =
  | "white"
  | "blue-gray"
  | "gray"
  | "brown"
  | "deep-orange"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "light-green"
  | "green"
  | "teal"
  | "cyan"
  | "light-blue"
  | "blue"
  | "indigo"
  | "deep-purple"
  | "purple"
  | "pink"
  | "red";

// Define the props interface
interface StatisticsCardProps {
  color?: MaterialColor; // Optional, defaults to "blue"
  icon: ReactNode;
  title: ReactNode;
  value: ReactNode;
  footer?: ReactNode;   // Optional, defaults to null
}

export function StatisticsCard({
  color = "blue",
  icon,
  title,
  value,
  footer = null,
}: StatisticsCardProps) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader
        variant="gradient"
        color={color}
        floated={false}
        shadow={false}
        className="absolute grid h-12 w-12 place-items-center"
      >
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {value}
        </Typography>
      </CardBody>
      {footer && ( // footer can be null, so this check is fine
        <CardFooter className="border-t border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

// PropTypes and defaultProps are removed.

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.tsx"; // Updated displayName

export default StatisticsCard;
