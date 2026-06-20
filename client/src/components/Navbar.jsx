import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth.js";
import useGeolocation from "../hooks/useGeolocation.js";
import { Button } from "./ui/button.jsx";
import { Avatar, AvatarFallback } from "./ui/avatar.jsx";
import { LogOut, MapPin, Menu, X, User, Ticket, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog.jsx";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { locationName, loading: geoLoading } = useGeolocation(isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const executeLogout = () => {
    logout();
    setLogoutDialogOpen(false);
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full h-16 border-b border-white/10 bg-[#080b14]/80 backdrop-blur-md select-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 h-full flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <MapPin className="w-6 h-6 text-cyan-400 group-hover:text-purple-500 transition-colors" />
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent group-hover:opacity-90 transition-all">
                SortMyScene
              </span>
            </Link>

            {/* Geolocation Display */}
            {isAuthenticated && (
              <div className="flex items-center gap-2 text-sm text-slate-300">
                {geoLoading || locationName ? (
                  <div className="w-px h-6 bg-white/10 mx-1 sm:mx-2" />
                ) : null}
                
                {geoLoading ? (
                  <span className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Locating...
                  </span>
                ) : locationName ? (
                  <span className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold uppercase tracking-wider bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                    <MapPin className="w-3.5 h-3.5" /> {locationName}
                  </span>
                ) : null}
              </div>
            )}
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === "/" ? "text-purple-400" : "text-slate-300 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === "/events" ? "text-purple-400" : "text-slate-300 hover:text-white"
              }`}
            >
              Events
            </Link>

            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 hover:opacity-90 transition-all cursor-pointer focus:outline-none border-none bg-transparent"
                >
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {user?.name || "User"}
                  </span>
                  <Avatar className="w-8 h-8 border border-cyan-500/30 bg-white/5">
                    <AvatarFallback className="text-xs font-black text-cyan-400 bg-cyan-950/25">
                      {user?.name ? user.name.slice(0, 2).toUpperCase() : "US"}
                    </AvatarFallback>
                  </Avatar>
                </button>

                {/* Dropdown menu overlay */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-56 bg-[#131929]/95 border border-white/10 rounded-xl shadow-2xl backdrop-blur-md p-1.5 z-50 flex flex-col gap-1 text-slate-100"
                    >
                      {/* User Profile Info Header */}
                      <div className="px-3 py-2 border-b border-white/5 flex flex-col mb-1 text-left">
                        <span className="text-sm font-bold text-slate-200 truncate">{user?.name}</span>
                        <span className="text-[10px] text-slate-500 truncate leading-none mt-1">{user?.email}</span>
                      </div>

                      {/* Navigation Items */}
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="px-3 py-2 text-xs font-semibold rounded-lg text-slate-300 hover:bg-white/5 hover:text-cyan-400 flex items-center gap-2 transition-all text-left"
                      >
                        <User className="w-3.5 h-3.5" />
                        My Profile
                      </Link>
                      
                      <Link
                        to="/bookings"
                        onClick={() => setDropdownOpen(false)}
                        className="px-3 py-2 text-xs font-semibold rounded-lg text-slate-300 hover:bg-white/5 hover:text-cyan-400 flex items-center gap-2 transition-all text-left"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        My Bookings
                      </Link>

                      <hr className="border-white/5 my-1" />

                      {/* Log Out CTA */}
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          setLogoutDialogOpen(true);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-all cursor-pointer border-none bg-transparent"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/auth/login">
                <Button className="text-sm font-bold bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 text-white cursor-pointer px-6 h-9 rounded-lg border-none shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  Login
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-300 bg-transparent border-none cursor-pointer"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-[#0c1020]/95 border-b border-white/10 backdrop-blur-md overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-semibold ${location.pathname === "/" ? "text-purple-400" : "text-slate-300"}`}
                >
                  Home
                </Link>
                <Link
                  to="/events"
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-semibold ${location.pathname === "/events" ? "text-purple-400" : "text-slate-300"}`}
                >
                  Events
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className={`text-sm font-semibold ${location.pathname === "/profile" ? "text-cyan-400" : "text-slate-300"}`}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/bookings"
                      onClick={() => setMobileOpen(false)}
                      className={`text-sm font-semibold ${location.pathname === "/bookings" ? "text-cyan-400" : "text-slate-300"}`}
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        setLogoutDialogOpen(true);
                      }}
                      className="text-sm font-semibold text-red-400 bg-transparent border-none cursor-pointer text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-semibold text-cyan-400"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="bg-[#131929] border-white/10 text-slate-200 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Sign Out</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to exit? You will need to login again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2">
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
              className="bg-transparent border-white/10 text-slate-300 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={executeLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold"
            >
              Yes, sign out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
