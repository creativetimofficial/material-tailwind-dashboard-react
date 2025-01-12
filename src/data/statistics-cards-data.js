import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Available Money",
    value: "availableBalance",
    footer: {
      color: "text-green-500",
      value: "0%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Users Deposits",
    value: "numberOfDeposits",
    footer: {
      color: "text-green-500",
      value: "0%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: UserIcon,
    title: "New Teammates",
    value: "numberOfDeposits",
    footer: {
      color: "text-green-500",
      value: "0%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Pending money ",
    value: "pendingAmount",
    footer: {
      color: "text-green-500",
      // value: "0%",
      label: "will be released in 14 days",
    },
  },
];

export default statisticsCardsData;
