"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { href: "#events", label: "Upcoming events", number: "01" },
  { href: "#about", label: "About", number: "02" },
  { href: "#testimonials", label: "What members say", number: "03" },
  { href: "#awards", label: "Club milestones", number: "04" },
  { href: "#insights", label: "Latest updates", number: "05" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== "/") {
      setIsMobileMenuOpen(false)
      return
    }

    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  }

  const getNavHref = (href: string) => {
    if (pathname === "/") {
      return href;
    }

    return `/${href}`;
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent",
        )}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <nav className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/"
              onClick={(e) => {
                if (pathname !== "/") {
                  return
                }

                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="text-2xl font-semibold tracking-tight"
            >
              Metropolis Retro
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={getNavHref(item.href)}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Gallery
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link
                href={pathname === "/" ? "#contact" : "/contact"}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full text-primary-foreground transition-all hover:shadow-xl relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-light) 100%)",
                  boxShadow: "0 4px 20px var(--brand-glow)",
                }}
              >
                <span className="relative z-10">Join Club</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" style={{ background: "linear-gradient(to right, var(--brand), var(--brand-light))" }} />
              </Link>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -mr-2 cursor-pointer" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-background md:hidden">
          <div className="flex min-h-full flex-col py-4 px-8">
            <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-semibold tracking-tight">
                Metropolis Retro
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 cursor-pointer" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 mt-12">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={getNavHref(item.href)}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-3xl font-semibold hover:text-muted-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-semibold hover:text-muted-foreground transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-semibold hover:text-muted-foreground transition-colors"
              >
                Gallery
              </Link>
            </nav>
            <div className="mt-auto">
              <Link
                href={pathname === "/" ? "#contact" : "/contact"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium rounded-full text-primary-foreground transition-all hover:shadow-xl relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-light) 100%)",
                  boxShadow: "0 4px 20px var(--brand-glow)",
                }}
              >
                <span className="relative z-10">Join Club</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" style={{ background: "linear-gradient(to right, var(--brand), var(--brand-light))" }} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
