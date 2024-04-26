import { Button } from "@/components/ui/button";
import { CircleUser, Loader, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/utils/auth";
import { LogoutDropdownMenuItem } from "../buttons/LogoutDropdownMenuItem";

export async function AccountDropdown() {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage
              src={`${session?.user.image}`}
              alt={`@${session?.user.name}`}
            />
            <AvatarFallback>
              <Loader className="size-6 animate-spin" />
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {session?.user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LogoutDropdownMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
