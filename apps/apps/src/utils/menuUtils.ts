import { Home, Package, CreditCard, User, Book } from "lucide-react";

export const MENU_DASHBOARD = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    name: "Productos",
    icon: Package,
    href: "/dashboard/products",
  },
  {
    name: "Ventas",
    icon: CreditCard,
    href: "/dashboard/sales",
  },
  {
    name: "Clientes",
    icon: User,
    href: "/dashboard/clients",
  },
];

export const MENU_LANDING = [
  {
    name: "Inicio",
    icon: Home,
    href: "/",
  },
  {
    name: "Documentacion",
    icon: Book,
    href: "/documentation",
  }
];