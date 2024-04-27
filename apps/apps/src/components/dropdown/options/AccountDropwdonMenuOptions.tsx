"use client";

import { LogoutDropdownMenuItem } from "@/components/buttons/LogoutDropdownMenuItem";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Book, LayoutDashboard } from "lucide-react";
import { Session } from "next-auth";
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
      {/* TODO add documentation link */}
      <DropdownMenuItem>
        <Book className="w-4 h-4 mr-2" />
        <span>Documentacion</span>
      </DropdownMenuItem>
      <LogoutDropdownMenuItem />
    </DropdownMenuContent>
  );
}
