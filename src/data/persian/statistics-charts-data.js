import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "بازدیدها",
      data: [50, 20, 10, 22, 50, 10, 40],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["د", "س", "چ", "پ", "ج", "ش", "ی"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "فروش",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "آوریل",
        "می",
        "ژوئن",
        "ژوئیه",
        "آگوست",
        "سپتامبر",
        "اکتبر",
        "نوامبر",
        "دسامبر",
      ],
    },
  },
};

const completedTaskChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "فروش",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "آوریل",
        "می",
        "ژوئن",
        "ژوئیه",
        "آگوست",
        "سپتامبر",
        "اکتبر",
        "نوامبر",
        "دسامبر",
      ],
    },
  },
};
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "وظایف",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "بازدید وبسایت",
    description: "عملکرد آخرین کمپین",
    footer: "کمپین 2 روز پیش ارسال شد",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "فروش روزانه",
    description: "افزایش 15٪ در فروش امروز",
    footer: "4 دقیقه پیش به روز شد",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "وظایف انجام شده",
    description: "عملکرد آخرین کمپین",
    footer: "همین الان به روز شد",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
