import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { SVGProps } from "react";

export type ColorsType =
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

export interface StatisticType {
  color: ColorsType;
  icon: (
    props: SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  ) => JSX.Element;
  title: string;
  value: string;
  footer: {
    color: string;
    value: string;
    label: String;
  };
}

export const statisticsCardsData: Array<StatisticType> = [
  {
    color: "blue",
    icon: UserIcon,
    title: "Male",
    value: "2",
    footer: {
      color: "text-green-500",
      value: "2",
      label: "men registered",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Female",
    value: "3,460",
    footer: {
      color: "text-green-500",
      value: "3,460",
      label: "women registered",
    },
  },
  {
    color: "orange",
    icon: UserIcon,
    title: "Students",
    value: "3,462",
    footer: {
      color: "text-green-500",
      value: "3,462",
      label: "students registered",
    },
  },
  // {
  //   color: "orange",
  //   icon: ChartBarIcon,
  //   title: "Sales",
  //   value: "$103,430",
  //   footer: {
  //     color: "text-green-500",
  //     value: "+5%",
  //     label: "than yesterday",
  //   },
  // },
];

export default statisticsCardsData;
