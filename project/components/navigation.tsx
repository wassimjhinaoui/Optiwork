"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import useAuthStore from "@/stores/useAuthStore";
import { Building2, Users, UserCircle, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { loggedIn, logout, user } = useAuthStore();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    logout(); // Update the loggedIn and user state
    router.push("/"); // Redirect to the home page
  };

  const navigation = loggedIn
    ? [
        <Link
          key="profile"
          href={`/profile/${user?.email}`}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/profile" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <div className="flex items-center space-x-2">
            <UserCircle className="h-5 w-5" />
            <span>Profile</span>
          </div>
        </Link>,
        <Link
          key="logout"
          href="#"
          onClick={handleLogout}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/logout" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <div className="flex items-center space-x-2">
            <UserCircle className="h-5 w-5" />
            <span>Logout</span>
          </div>
        </Link>,
        user?.email == "manager@manager.com" ? (
          <Link
            key="manager"
            href="/manager"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/manager" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div className="flex items-center space-x-2">
              <UserCircle className="h-5 w-5" />
              <span>Dashboard</span>
            </div>
          </Link>
        ) : user?.email == "HR@HR.com" ? (
          <Link
            key="hr"
            href="/hr"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/hr" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div className="flex items-center space-x-2">
              <UserCircle className="h-5 w-5" />
              <span>Dashboard</span>
            </div>
          </Link>
        ) : (
          <Link
            key="employee"
            href="/employee"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/employee"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <div className="flex items-center space-x-2">
              <UserCircle className="h-5 w-5" />
              <span>Dashboard</span>
            </div>
          </Link>
        ),
      ]
    : [
        <Link
          key="login"
          href="/login"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/login" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <div className="flex items-center space-x-2">
            <UserCircle className="h-5 w-5" />
            <span>Login</span>
          </div>
        </Link>,
        <Link
          key="signup"
          href="/signup"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/signup" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>SignUp</span>
          </div>
        </Link>,
      ];

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-primary text-xl font-bold"
            >
              <Building2 className="h-6 w-6" />
              <span>OptiWork</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation}
            <ModeToggle />
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              className="h-10 w-10 p-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation}
            <div className="px-3 py-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
