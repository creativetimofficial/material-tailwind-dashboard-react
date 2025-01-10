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
    title: "Attendance Today",
    value: "15",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Active Projects",
    value: "3",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "New Commits Today",
    value: "17",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Pull Requests",
    value: "23",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },

  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Work Items",
    value: "15",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },

  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Available Resource",
    value: "15",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
];

export default statisticsCardsData;
