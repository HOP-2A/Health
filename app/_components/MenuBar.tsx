import { useProvider } from "@/providers/AuthProvidor";
import { Search, ShoppingCart, Heart, UserRound } from "lucide-react";
import Link from "next/link";

export default function MenuBar() {
  const { user } = useProvider();
  return (
    <header
      className="
        w-full sticky top-0 z-50
        backdrop-blur-sm bg-green-50/40
        border-b border-green-300/50
        shadow-[0_4px_25px_rgba(0,200,120,0.3)]
      "
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-25 px-6">
        <Link href="/">
          <div
            className="
              text-4xl font-extrabold tracking-wide text-green-900
              drop-shadow-[0_0_15px_rgba(100,255,150,0.4)]
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
            { href: "/user/profile", icon: <UserRound size={27} /> },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <button
                className="
                  p-2 rounded-full
                  bg-white/30 backdrop-blur-md
                  border border-white/40
                  text-green-700
                  hover:bg-white/50 transition-all duration-200
                  hover:shadow-md active:scale-95
                "
              >
                {item.icon}
              </button>
            </Link>
          ))}
          {!user ? (
            <Link href="/login">
              <button
                className="
                ml-3 px-6 py-2 rounded-full
                bg-green-600 text-white font-semibold
                shadow-lg hover:bg-green-700
                transition-all duration-200
                hover:shadow-xl hover:scale-105 active:scale-95
              "
              >
                Sign In
              </button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </header>
  );
}
