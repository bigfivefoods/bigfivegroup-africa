"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, ArrowRight, Leaf, Wheat, Truck, Landmark, Link as LinkIcon, Award, Heart, Feather, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companies } from "../lib/companies";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);

  const navLinks = [
    { href: "/global", label: "Global" },
    { href: "/africa", label: "Africa" },
    { href: "#", label: "Group", isDropdown: true },
    { href: "/leadership", label: "Leadership" },
    { href: "/foundation", label: "Foundation" },
  ];

  const getCompanyIcon = (iconName: string, size: number = 26) => {
    switch (iconName) {
      case "Leaf": return <Leaf size={size} />;
      case "Wheat": return <Wheat size={size} />;
      case "Truck": return <Truck size={size} />;
      case "Landmark": return <Landmark size={size} />;
      case "Link": return <LinkIcon size={size} />;
      case "Award": return <Award size={size} />;
      case "Heart": return <Heart size={size} />;
      case "Feather": return <Feather size={size} />;
      case "Globe": return <Globe size={size} />;
      default: return <Leaf size={size} />;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo - Only Text */}
        <Link href="/" className="flex items-center group">
          <div>
            <div className="font-semibold text-2xl tracking-tighter text-black">BIG FIVE GROUP</div>
            <div className="text-[10px] text-[#525252] -mt-1 tracking-[1.5px]">.AFRICA</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-[#171717]">
          {navLinks.map((link) => 
            link.isDropdown ? (
              <div key={link.label} className="relative">
                <button 
                  onClick={() => setGroupOpen(!groupOpen)} 
                  className="flex items-center gap-1 hover:text-black transition-colors"
                >
                  {link.label} 
                  <ChevronDown className={`w-4 h-4 transition-transform ${groupOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {groupOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 10 }} 
                      className="absolute top-full mt-3 left-0 w-[380px] bg-white rounded-3xl p-4 shadow-xl border border-black/10"
                      onMouseLeave={() => setGroupOpen(false)}
                    >
                      <div className="flex flex-col">
                        {companies.map((company) => (
                          <Link 
                            key={company.slug} 
                            href={`/${company.slug}`} 
                            className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-[#fafafa] transition-all"
                            onClick={() => setGroupOpen(false)}
                          >
                            <div 
                              className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center" 
                              style={{ backgroundColor: `${company.color}15`, color: company.color }}
                            >
                              {getCompanyIcon(company.icon)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-black group-hover:text-black flex items-center gap-2">
                                {company.name}
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                              </div>
                              <div className="text-xs text-[#525252] truncate">
                                {company.tagline.split(" • ")[0]}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                key={link.href} 
                href={link.href} 
                className="hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* CTA Button - NOW OPENS SUPPLIERADVISOR IN NEW TAB */}
        <div className="hidden md:block">
          <Link 
            href="https://www.supplieradvisor.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="premium-button inline-flex items-center gap-3 bg-black text-white px-8 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-[#111]"
          >
            LAUNCH CONNECT
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="md:hidden w-10 h-10 flex items-center justify-center text-black"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }} 
            className="md:hidden bg-white border-t border-black/10"
          >
            <div className="px-6 py-8 flex flex-col gap-6 text-lg text-[#171717]">
              {navLinks.map((link) => 
                link.isDropdown ? (
                  <div key={link.label} className="space-y-4">
                    <div className="font-medium text-[#525252]">{link.label}</div>
                    <div className="pl-4 space-y-3 text-base">
                      {companies.map((c) => (
                        <Link 
                          key={c.slug} 
                          href={`/${c.slug}`} 
                          className="block text-[#171717] hover:text-black" 
                          onClick={() => setMobileOpen(false)}
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="text-[#171717] hover:text-black" 
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}

              <div className="pt-4 border-t border-black/10">
                <Link 
                  href="https://www.supplieradvisor.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)} 
                  className="premium-button w-full inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl text-base font-semibold"
                >
                  LAUNCH CONNECT
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
