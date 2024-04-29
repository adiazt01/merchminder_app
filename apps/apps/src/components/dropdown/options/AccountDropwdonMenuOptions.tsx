"use client";

import { LogoutDropdownMenuItem } from "@/components/buttons/LogoutDropdownMenuItem";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LINK_DOCUMENTATION } from "@/utils/menuUtils";
import { Book, LayoutDashboard } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AccountDropdownMenuOptions({
  session,
}: {
  session: Session | null;
}) {
  const router = useRouter();

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => router.push("/dashboard")}>
        <LayoutDashboard className="w-4 h-4 mr-2" />
        <span>Dashboard</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link className="flex flex-row" href={LINK_DOCUMENTATION} target="_blank">
          <Book className="w-4 h-4 mr-2" />
          <span>Documentacion</span>
        </Link>
      </DropdownMenuItem>
      <LogoutDropdownMenuItem />
    </DropdownMenuContent>
  );
}
