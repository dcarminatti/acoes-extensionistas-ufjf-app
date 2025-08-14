import { useAuth } from "@/context/AuthContext";

import { LayoutDashboard, List, Settings, User } from "lucide-react";

const links = [
  {
    title: "Ações",
    icon: LayoutDashboard,
    href: "/home",
    roles: ["coordinator", "teacher", "student"],
  },
  {
    title: "Minhas Ações",
    icon: List,
    href: "/my-actions",
    roles: ["teacher"],
  },
  {
    title: "Gerenciar",
    icon: Settings,
    href: "/manage",
    roles: ["coordinator"],
  },
  {
    title: "Conta",
    icon: User,
    href: "/account",
    roles: ["coordinator", "teacher", "student"],
  },
];

export function useNavMenu() {
  const { user } = useAuth();
  if (!user || !user.role) return [];
  return links.filter((link) => link.roles.includes(user.role as string));
}
