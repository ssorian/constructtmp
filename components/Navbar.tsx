"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import { CONTENT } from "@/lib/content";

const navLinks = CONTENT.navbar.links;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToQuote = () => {
    document.getElementById("quote-bot")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(9,9,11,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="section-container flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-2xl text-white tracking-wider hover:text-accent transition-colors duration-200"
        >
          {CONTENT.navbar.logo.part1}<span style={{ color: "var(--accent)" }}>{CONTENT.navbar.logo.part2}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={scrollToQuote}
          className="hidden md:flex btn-primary text-sm py-3 px-5"
          id="nav-quote-cta"
        >
          {CONTENT.navbar.cta}
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 md:px-6 pb-6 pt-2" style={{ background: "rgba(9,9,11,0.98)" }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-muted hover:text-white border-b border-[var(--border)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <button onClick={scrollToQuote} className="btn-primary w-full mt-4 justify-center">
            {CONTENT.navbar.cta}
          </button>
        </div>
      )}
    </header>
  );
}
