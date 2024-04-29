"use client";

import Link from "next/link";
import { Package2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MENU_DASHBOARD } from "@/utils/menuUtils";
import { NavLink } from "./NavLink";

export function SidebarDashboard() {
  return (
    <aside className="sticky w-full min-h-screen h-screen left-0 top-0 hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">
              Merchminder
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {MENU_DASHBOARD.map((link) => (
              <NavLink key={link.name} link={link} />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
