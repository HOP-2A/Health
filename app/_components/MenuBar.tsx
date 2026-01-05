"use client";
import { useProvider } from "@/providers/AuthProvidor";
import {
  Search,
  ShoppingCart,
  Heart,
  UserRound,
  Send,
  BookText,
} from "lucide-react";
import Link from "next/link";

export default function MenuBar() {
  const { user } = useProvider();

  return (
    <header
      className="
        w-full sticky top-0 z-50
        bg-gradient-to-r from-green-600/95 via-emerald-500/95 to-green-600/95
        backdrop-blur-md
        border-b border-green-700/40
        shadow-[0_6px_25px_rgba(0,120,80,0.45)]
      "
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-24 px-6">
        <Link href="/user">
          <div
            className="
              text-4xl font-extrabold tracking-wide text-white
              drop-shadow-[0_0_15px_rgba(255,255,255,0.35)]
              transition-transform duration-200
              hover:scale-105 cursor-pointer
            "
          >
            Mint
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {[
            { href: "/user/search", icon: <Search size={27} /> },
            { href: "/user/drugCart", icon: <ShoppingCart size={27} /> },
            { href: "/user/likedDrug", icon: <Heart size={27} /> },
            { href: "/user/replies", icon: <BookText size={27} /> },
            { href: "/user/createMessage", icon: <Send size={27} /> },
            { href: "/user/profile", icon: <UserRound size={27} /> },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <button
                className="
                  p-2 rounded-full
                  bg-white/20
                  backdrop-blur-lg
                  border border-white/30
                  text-white
                  transition-all duration-200
                  hover:bg-white/35 hover:scale-110
                  hover:shadow-md active:scale-95
                "
              >
                {item.icon}
              </button>
            </Link>
          ))}

          {!user && (
            <Link href="/login">
              <button
                className="
                  ml-3 px-6 py-2 rounded-full
                  bg-white/90 text-green-700 font-semibold
                  shadow-lg
                  transition-all duration-200
                  hover:bg-white hover:scale-105
                  active:scale-95
                "
              >
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
