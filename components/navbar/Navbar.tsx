"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { User, LogOut, Menu, X, ChevronDown } from "lucide-react";

export function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const authNavItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Match History", href: "/dashboard" }, // Update later with actual routes if needed
    { name: "Leaderboards", href: "/dashboard" },
  ];

  const publicNavItems = [
    { name: "Docs", href: "#" },
    { name: "Insights", href: "#" },
    { name: "Pricing", href: "#" },
  ];

  const navItems = status === "loading" ? [] : session?.user ? authNavItems : publicNavItems;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link href={session ? "/dashboard" : "/"} className="flex flex-col">
              <span className="text-xl font-extrabold text-red-600 italic leading-none">
                VALORANT
              </span>
              <span className="text-sm font-bold text-slate-300 uppercase tracking-widest leading-none">
                AI Agent
              </span>
            </Link>
          </div>

          {/* Nav Items - Center (Desktop) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-300 hover:text-white hover:bg-slate-800/50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Profile Dropdown - Right (Desktop) */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 relative">
              {status === "loading" ? (
                <div className="h-8 w-24 bg-slate-800 animate-pulse rounded-md" />
              ) : session?.user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 max-w-xs bg-slate-800 p-1.5 rounded-full flex-shrink-0 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500 hover:bg-slate-700 transition-colors"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold border border-slate-600">
                      {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="text-slate-200 font-medium px-1">
                      {session.user.name || "User"}
                    </span>
                    <ChevronDown className="h-4 w-4 text-slate-400 mr-1" />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <>
                      {/* Invisible overlay to close dropdown when clicking outside */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsProfileOpen(false)}
                      ></div>
                      
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="block px-4 py-2 text-xs text-slate-500 border-b border-slate-100 font-medium">
                          Signed in as<br/>
                          <span className="font-bold text-slate-800 truncate block mt-0.5">{session.user.email}</span>
                        </div>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <User className="h-4 w-4" />
                          Your Profile
                        </Link>
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors border-t border-slate-100"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-bold transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-slate-900 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-300 hover:text-white hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-slate-800">
            {status === "loading" ? (
              <div className="px-5 text-slate-400">Loading...</div>
            ) : session?.user ? (
              <>
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                     <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-lg border border-slate-600">
                      {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || "U"}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {session.user.name || "User"}
                    </div>
                    <div className="text-sm font-medium leading-none text-slate-400 mt-1">
                      {session.user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <User className="h-5 w-5" />
                    Your Profile
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-red-300 hover:bg-slate-800"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="px-5">
                <Link
                  href="/login"
                  className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md text-base font-bold"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
