import { CreditCard, LayoutDashboard } from "lucide-react";
import { paths } from "./paths";

export const sidebarItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: paths.DASHBOARD,
  },
  {
    name: "Dívidas",
    icon: CreditCard,
    path: paths.DEBTS,
  },
];
