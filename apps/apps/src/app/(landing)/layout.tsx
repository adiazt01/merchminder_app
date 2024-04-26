import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css"

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
