import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { NavbarDashboard } from "@/components/navbar/NavbarDashboard";
import { SidebarDashboard } from "@/components/sidebar/SidebarDashboard";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Merchinder - The best place to manage your merchandise",
  description: "Merchinder is the best place to manage your merchandise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="col-span-1">
            <SidebarDashboard />
          </div>
          <div className="col-span-3 relative">
            <NavbarDashboard />
            {children}
            <Toaster />
          </div>
        </div>
      </body>
    </html>
  );
}
