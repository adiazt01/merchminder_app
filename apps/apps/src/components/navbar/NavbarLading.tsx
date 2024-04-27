import { auth } from "@/utils/auth";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AccountDropdown } from "@/components/dropdown/AccountDropdown";

export async function NavbarLanding() {
  const session = await auth();

  return (
    <header className="px-4 border-b shadow lg:px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link className="flex items-center" href="#">
          <Store className="h-6 w-6" />
          <span className="sr-only">Merchminder</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Manual de usuario</Link>
        </nav>
      </div>
      {session ? (
        <AccountDropdown />
      ) : (
        <Link href="/login">
          <a className="btn btn-default">Login</a>
        </Link>
      )}
    </header>
  );
}
