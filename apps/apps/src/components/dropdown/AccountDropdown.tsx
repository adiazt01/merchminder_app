import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/utils/auth";
import { AccountDropdownMenuOptions } from "./options/AccountDropwdonMenuOptions";

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
      <AccountDropdownMenuOptions session={session} />
    </DropdownMenu>
  );
}


