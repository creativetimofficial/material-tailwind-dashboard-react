import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import type { Props as ApexChartProps } from 'react-apexcharts'; // Import type for ApexCharts props
import type { ReactNode } from 'react';
// Assuming MaterialColor is exported from statistics-card.tsx or defined/imported here
// For now, let's copy it here if not sure about export from other widget file.
// Ideally, it would be in a shared types file or exported from where it's defined.
export type MaterialColor =
  | "white" | "blue-gray" | "gray" | "brown" | "deep-orange"
  | "orange" | "amber" | "yellow" | "lime" | "light-green"
  | "green" | "teal" | "cyan" | "light-blue" | "blue"
  | "indigo" | "deep-purple" | "purple" | "pink" | "red";

// Define the props interface
interface StatisticsChartProps {
  color?: MaterialColor;
  chart: ApexChartProps; // Use ApexChartProps for the chart object
  title: ReactNode;
  description: ReactNode;
  footer?: ReactNode;
}

export function StatisticsChart({
  color = "blue",
  chart,
  title,
  description,
  footer = null,
}: StatisticsChartProps) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader variant="gradient" color={color} floated={false} shadow={false}>
        {/* Ensure the 'chart' object passed conforms to ApexChartProps */}
        <Chart {...chart} />
      </CardHeader>
      <CardBody className="px-6 pt-0">
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {description}
        </Typography>
      </CardBody>
      {footer && ( // footer can be null
        <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

// PropTypes and defaultProps are removed.

StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.tsx"; // Updated displayName

export default StatisticsChart;
