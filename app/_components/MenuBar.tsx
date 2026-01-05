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
import { useEffect, useState } from "react";

export default function MenuBar() {
  const { user } = useProvider();

  const [cartCount, setCartCount] = useState<number>(0);
  const [likedCount, setLikedCount] = useState<number>(0);

  useEffect(() => {
    if (!user) return;

    const fetchCounts = async () => {
      try {
        const cartRes = await fetch(`/api/find-order/${user.clerkId}`);
        if (cartRes.ok) {
          const cartData = await cartRes.json();
          setCartCount(cartData.items?.length || 0);
        }

        const likedRes = await fetch(`/api/liked-med?userId=${user.clerkId}`);
        if (likedRes.ok) {
          const likedData = await likedRes.json();
          setLikedCount(likedData?.length || 0);
        }
      } catch (error) {
        console.error("Failed to fetch counts:", error);
      }
    };

    fetchCounts();

    const interval = setInterval(fetchCounts, 3000);
    return () => clearInterval(interval);
  }, [user]);

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
            { href: "/user/search", icon: <Search size={27} />, badge: 0 },
            {
              href: "/user/drugCart",
              icon: <ShoppingCart size={27} />,
              badge: cartCount,
            },
            {
              href: "/user/likedDrug",
              icon: <Heart size={27} />,
              badge: likedCount,
            },
            { href: "/user/replies", icon: <BookText size={27} />, badge: 0 },
            {
              href: "/user/createMessage",
              icon: <Send size={27} />,
              badge: 0,
            },
            { href: "/user/profile", icon: <UserRound size={27} />, badge: 0 },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <button
                className="
                  relative p-2 rounded-full
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
                {item.badge > 0 && (
                  <span
                    className="
                      absolute -top-1 -right-1
                      min-w-[20px] h-5 px-1.5
                      flex items-center justify-center
                      bg-red-500 text-white text-xs font-bold
                      rounded-full
                      border-2 border-white
                      shadow-lg
                     
                    "
                  >
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
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
