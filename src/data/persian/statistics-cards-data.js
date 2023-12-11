import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "پول امروز",
    value: "$53k",
    footer: {
      color: "text-green-500",
      value: "55%+",
      label: "نسبت به هفته گذشته",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "کاربران امروز",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "3%+",
      label: "نسبت به ماه گذشته",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "مشتریان جدید",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "2%-",
      label: "نسبت به دیروز",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "فروش",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "5%+",
      label: "نسبت به دیروز",
    },
  },
];

export default statisticsCardsData;
