import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavLinkProps {
  link: {
    name: string;
    href: string;
    icon: LucideIcon;
  };
}

export function NavLinkMobile({ link }: NavLinkProps) {
  const pathname = usePathname();
  const { name, href } = link;
  return (
    <Link
      href={href}
      className={clsx("flex items-center gap-2 p-2 rounded-md", {
        "bg-primary/10 text-primary": pathname === href,
        "hover:bg-primary/5 hover:text-primary": pathname !== href,
      })}
    >
      <link.icon className="h-6 w-6" />
      <span>{name}</span>
    </Link>
  );
}
