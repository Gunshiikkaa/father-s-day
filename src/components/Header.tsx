"use client";

import { useState, useEffect } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Childhood", href: "#memories-sliders" },
    { label: "Lessons", href: "#memories-sliders" },
    { label: "Vacations", href: "#memories-sliders" },
    { label: "Achievements", href: "#memories-sliders" },
    { label: "My List", href: "#" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-[990] flex items-center justify-between px-4 md:px-12 py-4 transition-colors duration-500 select-none
        ${isScrolled ? "bg-[#141414]/95 shadow-lg shadow-black/30 border-b border-neutral-900/50" : "bg-gradient-to-b from-black/80 to-transparent"}`}
    >
      
      {/* Left Section: Logo & Nav Links */}
      <div className="flex items-center gap-8">
        
        {/* Glowing Golden DADFLIX Logo */}
        <h1 
          className="text-xl sm:text-2xl font-extrabold tracking-[0.1em] font-serif logo-glow text-white cursor-pointer"
          style={{ fontFamily: "var(--font-cinzel), serif" }}
        >
          DAD<span className="text-amber-500">FLIX</span>
        </h1>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-neutral-300 hover:text-neutral-100 transition-colors duration-300 text-xs tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Dropdown trigger (simulating Netflix app browse menu) */}
        <div className="lg:hidden relative group">
          <button className="flex items-center gap-1 text-white text-xs font-bold bg-neutral-900/40 px-3 py-1.5 rounded border border-neutral-800">
            Browse
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          
          <div className="absolute top-full left-0 mt-2 w-48 bg-neutral-950/95 border border-neutral-800 rounded shadow-2xl p-2 hidden group-hover:block pointer-events-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-neutral-300 hover:text-white px-3 py-2 text-xs hover:bg-neutral-900 rounded"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Right Section: Icons & Avatar Profile Selector */}
      <div className="flex items-center gap-4 text-white text-sm">
        <button className="hover:text-neutral-300 transition-colors cursor-pointer">
          <Search className="w-4 h-4" />
        </button>

        <span className="text-xs font-mono font-bold tracking-widest text-amber-500/80 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded hidden sm:inline">
          KIDS
        </span>

        <button className="hover:text-neutral-300 transition-colors relative cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
        </button>

        {/* Custom Profile Dropdown */}
        <div className="flex items-center gap-1.5 cursor-pointer group relative">
          
          {/* Custom Avatar Icon */}
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center font-bold text-xs text-black border border-amber-500/20">
            D
          </div>
          
          <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:rotate-180 transition-transform duration-300" />

          {/* Profile Dropdown Box */}
          <div className="absolute top-full right-0 mt-2 w-52 bg-neutral-950 border border-neutral-900 rounded-md shadow-2xl p-3 hidden group-hover:block pointer-events-auto">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded bg-gradient-to-tr from-yellow-500 to-amber-400 text-black flex items-center justify-center font-bold text-[10px]">
                  D
                </div>
                <span className="text-xs font-bold text-neutral-300">Dad Profile</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded bg-neutral-800 text-white flex items-center justify-center font-bold text-[10px]">
                  C
                </div>
                <span className="text-xs font-bold text-neutral-400 hover:text-white transition-colors">Child Profile</span>
              </div>
              
              <div className="h-[1px] bg-neutral-900 my-2" />
              
              <a href="#" className="block text-[11px] text-neutral-400 hover:text-white hover:underline">Manage Profiles</a>
              <a href="#" className="block text-[11px] text-neutral-400 hover:text-white hover:underline">Account Settings</a>
              <a href="#" className="block text-[11px] text-neutral-400 hover:text-white hover:underline">Help Center</a>
            </div>
          </div>

        </div>

      </div>

    </header>
  );
}
