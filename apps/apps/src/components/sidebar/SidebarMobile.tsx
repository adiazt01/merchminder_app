"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, LineChart, Menu, Package, Package2, Users } from "lucide-react";
import { MENU_DASHBOARD } from "@/utils/menuUtils";
import { NavLinkMobile } from "./NavLinkMobile";

export function SidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {MENU_DASHBOARD.map((link) => (
            <NavLinkMobile key={link.name} link={link} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
