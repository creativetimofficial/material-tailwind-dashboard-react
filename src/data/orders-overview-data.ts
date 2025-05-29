import {
  BellIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  LockOpenIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";
import { ForwardRefExoticComponent, SVGProps } from 'react';

interface OrderOverviewItem {
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string, titleId?: string }>;
  color: string;
  title: string;
  description: string;
}

export const ordersOverviewData: OrderOverviewItem[] = [
  {
    icon: BellIcon,
    color: "text-blue-gray-300",
    title: "$2400, Design changes",
    description: "22 DEC 7:20 PM",
  },
  {
    icon: PlusCircleIcon,
    color: "text-blue-gray-300",
    title: "New order #1832412",
    description: "21 DEC 11 PM",
  },
  {
    icon: ShoppingCartIcon,
    color: "text-blue-gray-300",
    title: "Server payments for April",
    description: "21 DEC 9:34 PM",
  },
  {
    icon: CreditCardIcon,
    color: "text-blue-gray-300",
    title: "New card added for order #4395133",
    description: "20 DEC 2:20 AM",
  },
  {
    icon: LockOpenIcon,
    color: "text-blue-gray-300",
    title: "Unlock packages for development",
    description: "18 DEC 4:54 AM",
  },
  {
    icon: BanknotesIcon,
    color: "text-blue-gray-300",
    title: "New order #9583120",
    description: "17 DEC",
  },
];

export default ordersOverviewData;
