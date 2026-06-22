import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ArrowRight, Star, ExternalLink, Globe, Music, Ticket } from "lucide-react";
import { useGetEventsQuery } from "../store/api/eventApi.js";
import { Skeleton } from "../components/ui/skeleton.jsx";
import dayjs from "dayjs";

/* ─── animation variants ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const cardFadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */
const HeroSection = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // Parallax transforms for decorative elements
  const y1 = useTransform(scrollY, [0, 1000], [0, 250]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -250]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 150]);
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 90]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -90]);

  const handleCTA = () => navigate("/events");

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Parallax Decorative Elements */}
      <motion.div 
        style={{ y: y2, rotate: rotate1 }} 
        className="absolute top-32 right-[20%] w-12 h-12 border border-purple-500/30 rounded-full pointer-events-none hidden lg:block"
      />
      <motion.div 
        style={{ y: y1, rotate: rotate2 }} 
        className="absolute bottom-40 left-[15%] w-8 h-8 bg-cyan-500/20 blur-md rounded-full pointer-events-none hidden lg:block"
      />
      <motion.div 
        style={{ y: y3 }} 
        className="absolute top-1/2 left-[5%] text-purple-500/30 pointer-events-none hidden lg:block"
      >
        <Star className="w-6 h-6" />
      </motion.div>
      <motion.div 
        style={{ y: y2 }} 
        className="absolute bottom-1/4 right-[5%] text-cyan-500/30 pointer-events-none hidden lg:block"
      >
        <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full py-16 lg:py-0 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* LEFT — text content */}
          <motion.div
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* pill badge */}
            <motion.span
              variants={fadeUp(0)}
              className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 text-sm text-purple-300 font-medium"
            >
              🎉 India's #1 Event Booking Platform
            </motion.span>

            {/* heading */}
            <motion.h1 variants={fadeUp(0.1)} className="text-5xl lg:text-7xl font-black leading-[1.08] tracking-tight">
              <span className="text-white">Discover</span>
              <br />
              <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Premium Events
              </span>
              <br />
              <span className="text-white">Near You</span>
            </motion.h1>

            {/* sub text */}
            <motion.p variants={fadeUp(0.2)} className="text-slate-400 max-w-lg text-lg leading-relaxed">
              From concerts to festivals, nightlife to comedy shows. Find your perfect event and book in seconds.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp(0.3)} className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCTA}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold px-8 py-4 rounded-xl border-none cursor-pointer shadow-[0_0_30px_rgba(168,85,247,0.25)] flex items-center gap-2 text-base"
              >
                Explore Events <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="border border-white/20 text-white px-8 py-4 rounded-xl bg-transparent cursor-pointer font-semibold text-base"
              >
                How It Works ↓
              </motion.button>
            </motion.div>

            {/* trust row */}
            <motion.div variants={fadeUp(0.4)} className="flex flex-wrap gap-4 sm:gap-6 mt-2 text-sm text-slate-500">
              <span>✓ 10,000+ Events</span>
              <span>✓ 50K+ Users</span>
              <span>✓ 100+ Cities</span>
            </motion.div>
          </motion.div>

          {/* RIGHT — floating image collage */}
          <div className="flex-1 flex justify-center relative w-full lg:w-auto h-[400px] lg:h-auto items-center mt-10 lg:mt-0">
            {/* background glow */}
            <div className="absolute w-96 h-96 bg-gradient-to-tr from-purple-500/30 to-cyan-500/20 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* large circle */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full p-[2px] bg-gradient-to-br from-purple-500/60 via-transparent to-cyan-500/60 shadow-[0_0_80px_rgba(168,85,247,0.25)]">
                <div className="w-full h-full rounded-full bg-[#0a0f1c]/80 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden group border border-white/5">
                  {/* Inner animated gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="text-center p-6 relative z-10">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cyan-500/10 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                      <MapPin className="w-10 h-10 text-cyan-400" />
                    </div>
                    <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                      SortMyScene
                    </span>
                    <p className="text-sm text-slate-400 mt-2 font-medium">Live Events • Concerts • Festivals</p>
                  </div>
                </div>
              </div>

              {/* small circle 1 — top right */}
              <motion.div
                animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-6 -right-8 sm:-right-12 w-28 h-28 rounded-full p-[1px] bg-gradient-to-tr from-purple-600/50 to-pink-500/50 shadow-[0_0_40px_rgba(168,85,247,0.3)] z-20"
              >
                <div className="w-full h-full rounded-full bg-[#130b24]/90 backdrop-blur-md flex flex-col items-center justify-center border border-white/10 hover:bg-purple-900/50 transition-colors duration-300 cursor-default">
                  <Music className="w-8 h-8 text-pink-400 mb-1" />
                  <p className="text-xs text-slate-300 font-bold tracking-wide">Concerts</p>
                </div>
              </motion.div>

              {/* small circle 2 — bottom left */}
              <motion.div
                animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-6 sm:-left-10 w-24 h-24 rounded-full p-[1px] bg-gradient-to-bl from-cyan-500/50 to-blue-500/50 shadow-[0_0_40px_rgba(6,182,212,0.3)] z-20"
              >
                <div className="w-full h-full rounded-full bg-[#06141c]/90 backdrop-blur-md flex flex-col items-center justify-center border border-white/10 hover:bg-cyan-900/50 transition-colors duration-300 cursor-default">
                  <Ticket className="w-7 h-7 text-cyan-400 mb-1" />
                  <p className="text-[10px] text-slate-300 font-bold tracking-wide">Tickets</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   STATS BAR
   ═══════════════════════════════════════════ */
const stats = [
  { number: "500+", label: "Events Listed" },
  { number: "50K+", label: "Tickets Sold" },
  { number: "100+", label: "Cities" },
  { number: "4.9★", label: "Rating" },
];

const StatsBar = () => (
  <section className="w-full bg-white/5 border-y border-white/10 py-10">
    <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center items-center gap-8 md:gap-0">
      {stats.map((s, i) => (
        <React.Fragment key={s.label}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center min-w-[120px]"
          >
            <span className="text-4xl font-black bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {s.number}
            </span>
            <span className="text-slate-400 text-sm mt-1">{s.label}</span>
          </motion.div>
          {i < stats.length - 1 && <div className="hidden md:block w-px h-12 bg-white/10 mx-8" />}
        </React.Fragment>
      ))}
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════ */
const steps = [
  { num: 1, title: "Discover Your", highlight: "Scene", desc: "Discover your perfect event, effortlessly" },
  { num: 2, title: "Seamless", highlight: "Purchasing", desc: "Secure your spot with a few clicks — it's that simple" },
  { num: 3, title: "Get", highlight: "Sorted", desc: "Turn moments into memories with SortMyScene" },
];

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-16 relative">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm uppercase tracking-widest font-semibold">How it works</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3">
            We Make Your{" "}
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">Nightlife</span>{" "}
            Easy
          </h2>
        </motion.div>

        {/* steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-14">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              {/* number circle */}
              <div className="w-[70px] h-[70px] rounded-full p-[2px] bg-gradient-to-br from-purple-500 to-cyan-400 mb-6">
                <div className="w-full h-full rounded-full bg-[#080b14] flex items-center justify-center">
                  <span className="text-2xl font-black bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                    {step.num}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {step.title}{" "}
                <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  {step.highlight}
                </span>
              </h3>
              <p className="text-slate-400 text-sm max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/events")}
            className="bg-white text-[#080b14] px-10 py-4 rounded-full font-semibold text-base cursor-pointer border-none flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.1)]"
          >
            Explore Now <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   EVENTS PREVIEW
   ═══════════════════════════════════════════ */
const EventsPreview = () => {
  const navigate = useNavigate();
  const { data: events, isLoading } = useGetEventsQuery();
  const previewEvents = events?.slice(0, 4) || [];

  return (
    <section className="py-20 px-6 lg:px-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-black">
            Experience{" "}
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Exclusivity!
            </span>
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Find the hottest events and venues in the town! Right here
          </p>
        </motion.div>

        {/* loading skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <Skeleton className="h-48 w-full bg-white/10" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4 bg-white/10" />
                  <Skeleton className="h-4 w-1/2 bg-white/10" />
                  <Skeleton className="h-4 w-1/3 bg-white/10" />
                  <Skeleton className="h-10 w-full bg-white/10 mt-2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* event cards */}
        {!isLoading && previewEvents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewEvents.map((event, i) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(168,85,247,0.5)" }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group"
                onClick={() => navigate(`/events/${event._id}`)}
              >
                {/* image area */}
                <div className="relative h-48 overflow-hidden">
                  {event.logoUrl ? (
                    <img
                      src={event.logoUrl}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-cyan-900/50 flex items-center justify-center">
                      <span className="text-xl font-black text-white/30 px-4 text-center">{event.name}</span>
                    </div>
                  )}
                  {/* date badge */}
                  <div className="absolute top-3 right-3 bg-purple-500/80 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-semibold text-white">
                    {dayjs(event.dateTime).format("ddd MMM DD")}
                  </div>
                </div>

                {/* details */}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-white font-bold text-lg truncate">{event.name}</h3>
                  <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                  <span className="text-purple-400 font-semibold text-sm">From ₹799</span>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold cursor-pointer border-none flex items-center justify-center gap-1.5"
                  >
                    Book Now <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
const footerLinks = {
  CUSTOMERS: [
    { label: "Find your tickets", path: "/bookings" },
    { label: "Contact Us", path: "mailto:nirvikar3903@gmail.com" },
    { label: "Apps", path: "/" },
  ],
  ORGANISERS: [
    { label: "List Your Event", path: "/business" },
    { label: "Business App", path: "/" },
    { label: "Scanner App", path: "/" },
  ],
  COMPANY: [
    { label: "For Business", path: "/business" },
    { label: "Blog", path: "/blog" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms & Conditions", path: "/terms" },
  ],
};

const Footer = () => (
  <footer className="bg-[#080b14] border-t border-white/10 py-12 px-6 lg:px-16">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <span className="text-base font-black bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              SortMyScene
            </span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed">Tech Solution For Nightlife</p>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">{heading}</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  {link.path.startsWith("mailto:") ? (
                    <a href={link.path} className="text-slate-300 text-sm hover:text-purple-400 transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.path} className="text-slate-300 text-sm hover:text-purple-400 transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social */}
        <div>
          <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Social Media</h4>
          <ul className="space-y-2.5">
            <li>
              <a href="#" className="text-slate-300 text-sm hover:text-purple-400 transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> Facebook
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 text-sm hover:text-purple-400 transition-colors flex items-center gap-2">
                <Globe className="w-4 h-4" /> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 mt-10 pt-6 text-center">
        <p className="text-slate-600 text-sm">© 2025 SortMyScene. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════
   LANDING PAGE — assembled
   ═══════════════════════════════════════════ */
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#080b14] text-slate-100 font-sans antialiased">
      <HeroSection />
      <StatsBar />
      <HowItWorks />
      <EventsPreview />
      <Footer />
    </div>
  );
};

export default LandingPage;
