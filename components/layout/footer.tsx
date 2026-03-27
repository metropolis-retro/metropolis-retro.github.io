"use client";

import Link from "next/link"
import { NewsletterSubscribeForm } from "@/components/forms/newsletter-subscribe-form"
import {
  BrandDribbbleIcon,
  BrandGitHubIcon,
  BrandLinkedInIcon,
  BrandTwitterIcon,
} from "@/components/icons/brand-social-icons"

const socialLinks = [
  { href: "https://x.com", icon: BrandTwitterIcon, label: "Twitter" },
  { href: "https://www.linkedin.com", icon: BrandLinkedInIcon, label: "LinkedIn" },
  { href: "https://github.com", icon: BrandGitHubIcon, label: "GitHub" },
  { href: "https://dribbble.com", icon: BrandDribbbleIcon, label: "Dribbble" },
];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/membership", label: "Membership" },
  { href: "/faq", label: "FAQ" },
  { href: "/updates", label: "Updates" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Metropolis Retro
            </Link>
            <p className="mt-4 text-muted-foreground text-sm max-w-xs leading-relaxed">
              Official chess club based in Brisbane, Australia, hosting meetups, training sessions, and community
              chess events.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary transition-colors hover:bg-opacity-10"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--brand-hover-bg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" style={{ color: "var(--brand)" }} />
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="mailto:hello@metropolisretro.com"
                className="text-sm transition-colors hover:underline"
                style={{ color: "var(--brand)" }}
              >
                hello@metropolisretro.com
              </Link>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Pages</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">Get meetup dates and event updates in your inbox.</p>
            <NewsletterSubscribeForm />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Metropolis Retro. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
