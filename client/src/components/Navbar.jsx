import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { Button } from "./ui/button.jsx";
import { Avatar, AvatarFallback } from "./ui/avatar.jsx";
import { LogOut, MapPin } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full h-16 border-b border-white/10 bg-[#080b14]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/events" className="flex items-center gap-2 group">
          <MapPin className="w-6 h-6 text-purple-500" />
          <span className="text-lg font-black tracking-wider bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent group-hover:opacity-90 transition-all">
            SortMyScene
          </span>
        </Link>

        {/* Auth profile controls */}
        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {user?.name || "User"}
              </span>
              <Avatar className="w-8 h-8 border border-white/10 bg-white/5">
                <AvatarFallback className="text-xs font-black text-cyan-400 bg-cyan-950/25">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : "US"}
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
            <Link to="/auth/login">
              <Button className="text-sm font-bold bg-cyan-500 hover:bg-cyan-600 text-slate-950 cursor-pointer">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
