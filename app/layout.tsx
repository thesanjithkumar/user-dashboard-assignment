import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. IMPORT THE NAVBAR
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "User dashboard app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* 2. PLACE IT ABOVE CHILDREN */}
        <Navbar />
        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
