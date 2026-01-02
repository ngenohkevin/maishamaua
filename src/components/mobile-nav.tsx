"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, MessageCircle, Home, Camera, Info, Phone } from "lucide-react";
import { useState } from "react";

const WHATSAPP_LINK = "https://wa.me/message/CRZL573DJ5NSF1";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  isExternal?: boolean;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
  { href: "/gallery", label: "Gallery", icon: <Camera className="w-5 h-5" /> },
  { href: "/#about", label: "About", icon: <Info className="w-5 h-5" /> },
  { href: "/#contact", label: "Contact", icon: <Phone className="w-5 h-5" /> },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden w-9 h-9 text-[#5C4A45] dark:text-[#E8DED8]"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[280px] bg-[#FDF8F6]/80 dark:bg-[#1a1517]/80 backdrop-blur-xl border-l border-[#F0E6E2]/50 dark:border-[#2d2528]/50 p-0"
      >
        <SheetHeader className="p-6 border-b border-[#F0E6E2]/50 dark:border-[#2d2528]/50">
          <SheetTitle className="flex items-center gap-3">
            <Image
              src="/images/logo.jpeg"
              alt="Maisha Maua"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-[family-name:var(--font-playfair)] text-xl text-[#5C4A45] dark:text-[#E8DED8] italic">
              Maisha Maua
            </span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Navigation menu for Maisha Maua flower shop
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#5C4A45] dark:text-[#E8DED8] hover:bg-[#F0E6E2] dark:hover:bg-[#2d2528] transition-colors"
            >
              <span className="text-[#8A6F68] dark:text-[#a08a85]">
                {link.icon}
              </span>
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#F0E6E2]/50 dark:border-[#2d2528]/50 bg-[#FDF8F6]/50 dark:bg-[#1a1517]/50">
          <Link
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full py-6">
              <MessageCircle className="w-5 h-5 mr-2" />
              Order on WhatsApp
            </Button>
          </Link>
          <p className="text-center text-xs text-[#8A6F68] dark:text-[#a08a85] mt-4">
            Give them their flowers while they&apos;re still here
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
