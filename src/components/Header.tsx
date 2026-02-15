"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Palette, Home, Image, Info } from "lucide-react";

const navLinks = [
  { href: "/", label: "Create", icon: Home },
  { href: "/gallery", label: "Gallery", icon: Image },
  { href: "/about", label: "About", icon: Info },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-violet-600 rounded-lg flex items-center justify-center group-hover:bg-violet-700 transition-colors">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            ColorCraft <span className="text-violet-600">AI</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-violet-50 text-violet-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
