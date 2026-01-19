"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status whenever the route changes
  useEffect(() => {
    // If userId exists in storage, we are logged in
    const user = localStorage.getItem("userId");
    setIsLoggedIn(!!user);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Clear session
    router.push("/"); // Redirect to Login
  };

  // Don't show Navbar on the Login page ('/')
  if (pathname === "/") return null;

  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 font-bold text-xl tracking-wider">
            DASHBOARD APP
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8 items-center">
            <Link
              href="/dashboard"
              className={`hover:text-blue-400 transition ${
                pathname === "/dashboard" ? "text-blue-400 font-bold" : ""
              }`}
            >
              My Orders
            </Link>

            <Link
              href="/shop"
              className={`hover:text-blue-400 transition ${
                pathname === "/shop" ? "text-blue-400 font-bold" : ""
              }`}
            >
              Shop Items
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
