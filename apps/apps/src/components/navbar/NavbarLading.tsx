import { auth } from "@/utils/auth";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function NavbarLanding() {
  const session = await auth();

  return (
    <header className="px-4 border-b shadow lg:px-6 h-14 flex items-center justify-between">
      <Link className="flex items-center" href="#">
        <Store className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="hidden lg:flex gap-4 sm:gap-6">
        {session ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
      <Button className="ml-auto lg:hidden" variant="default">
        Menu
      </Button>
    </header>
  );
}
