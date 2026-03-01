"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { useState } from "react";
import { LoginModal } from "@/components/ui/LoginModal";

export function Header() {
  const { user, profile, isAdmin, signOut, isLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Ulayaw
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/chat" className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors">
                Chat
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors">
                About
              </Link>
              <Link href="/manual" className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors">
                Manual
              </Link>
              <Link href="/team" className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors">
                Team
              </Link>
              {isAdmin && (
                <Link href="/admin" className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
                  Admin
                </Link>
              )}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {isLoading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : user ? (
                <div className="flex items-center gap-3">
                  <span className="hidden sm:block text-sm text-gray-600">
                    {profile?.first_name || user.email?.split("@")[0]}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Sign In
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 border-t border-gray-100 pt-2 flex flex-col gap-2">
              <Link href="/chat" className="px-2 py-2 text-sm text-gray-600 hover:text-teal-600" onClick={() => setMobileMenuOpen(false)}>Chat</Link>
              <Link href="/about" className="px-2 py-2 text-sm text-gray-600 hover:text-teal-600" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/manual" className="px-2 py-2 text-sm text-gray-600 hover:text-teal-600" onClick={() => setMobileMenuOpen(false)}>Manual</Link>
              <Link href="/team" className="px-2 py-2 text-sm text-gray-600 hover:text-teal-600" onClick={() => setMobileMenuOpen(false)}>Team</Link>
              {isAdmin && (
                <Link href="/admin" className="px-2 py-2 text-sm text-purple-600 hover:text-purple-700" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
              )}
            </nav>
          )}
        </div>
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
