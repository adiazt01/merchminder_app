"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Logout } from "@/actions/authActions";

export function LogoutDropdownMenuItem() {
  async function handleLogout() {
    await Logout();
  }

  return (
    <DropdownMenuItem onClick={() => handleLogout()}>
      <LogOut className="w-4 h-4 mr-2" />
      <span>Logout</span>
    </DropdownMenuItem>
  );
}
