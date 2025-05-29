import { chartsConfig } from "@/configs";
import type { ChartsConfig } from "@/configs"; // Type-only import for ChartsConfig

// Interfaces for statistics charts
interface ChartSeries {
  name: string;
  data: number[];
}

interface SpecificChartOptions extends Omit<ChartsConfig, 'xaxis' | 'colors'> { // Omit and redefine if types differ significantly or are always present
  colors: string | string[]; // chartsConfig might not have colors, or it might, this makes it explicit
  plotOptions?: {
    bar?: {
      columnWidth?: string;
      borderRadius?: number;
    };
  };
  xaxis: ChartsConfig["xaxis"] & {
    categories: string[];
  };
  stroke?: {
    lineCap?: "butt" | "square" | "round";
  };
  markers?: {
    size?: number;
  };
  // Ensure all properties from chartsConfig are potentially available if not redefined
  // This can be complex. A simpler approach might be Partial<ChartsConfig> & { specific overrides }
  // For now, let's stick to this approach assuming chartsConfig provides a base.
}


// Simpler SpecificChartOptions that directly uses ChartsConfig as base
// This assumes that 'colors' and 'xaxis.categories' are being ADDED to what chartsConfig provides,
// or are compatible with chartsConfig's types if they exist there.
interface BetterSpecificChartOptions extends ChartsConfig {
  colors: string | string[]; // If chartsConfig.colors exists, its type must be compatible.
  plotOptions?: {
    bar?: {
      columnWidth?: string;
      borderRadius?: number;
    };
  };
  xaxis: ChartsConfig["xaxis"] & { // This is good, extends specific part of ChartsConfig
    categories: string[];
  };
  stroke?: {
    lineCap?: "butt" | "square" | "round";
  };
  markers?: {
    size?: number;
  };
}


interface ChartData {
  type: "bar" | "line";
  height: number;
  series: ChartSeries[];
  options: BetterSpecificChartOptions; // Using the refined options type
}

interface StatisticsChart {
  color: string;
  title: string;
  description: string;
  footer: string;
  chart: ChartData;
}

const websiteViewsChart: ChartData = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [50, 20, 10, 22, 50, 10, 40],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c", // This now fits BetterSpecificChartOptions.colors
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

const dailySalesChart: ChartData = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"], // This now fits BetterSpecificChartOptions.colors (string[])
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

// completedTaskChart is not directly used in the final export, 
// but completedTasksChart is based on it. So, it should also be typed.
const completedTaskChart: ChartData = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"], // This now fits BetterSpecificChartOptions.colors (string[])
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};
// Type for completedTasksChart. It's ChartData but with a specific series.
// The spread from completedTaskChart (which is ChartData) means it largely conforms.
const completedTasksChart: ChartData = {
  ...completedTaskChart,
  series: [ // This overrides completedTaskChart.series
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

export const statisticsChartsData: StatisticsChart[] = [
  {
    color: "white",
    title: "Website View",
    description: "Last Campaign Performance",
    footer: "campaign sent 2 days ago",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Daily Sales",
    description: "15% increase in today sales",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "Completed Tasks",
    description: "Last Campaign Performance",
    footer: "just updated",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
