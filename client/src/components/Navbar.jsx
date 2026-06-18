import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { Button } from "./ui/button.jsx";
import { Avatar, AvatarFallback } from "./ui/avatar.jsx";
import { LogOut, Ticket } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Ticket className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          </div>
          <span className="text-lg font-black tracking-wider bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-300 transition-all">
            SortMyScene
          </span>
        </Link>

        {/* Auth profile controls */}
        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end text-xs">
                <span className="font-bold text-slate-200">{user.name}</span>
                <span className="text-slate-500">{user.email}</span>
              </div>
              <Avatar className="w-8 h-8 border border-white/10 bg-white/5">
                <AvatarFallback className="text-xs font-black text-cyan-400 bg-cyan-950/25">
                  {user.name ? user.name.slice(0, 2).toUpperCase() : "US"}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth">
                <Button variant="ghost" className="text-sm font-semibold text-slate-300 cursor-pointer">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button className="text-sm font-bold bg-cyan-500 hover:bg-cyan-600 text-slate-950 cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
