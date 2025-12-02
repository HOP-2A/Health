import { Search, ShoppingCart, Heart, UserRound } from "lucide-react";
import Link from "next/link";

export default function MenuBar() {
  return (
    <header className=" bg-gradient-to-br from-green-500 to-green-700  w-full sticky top-0 z-50 border-b border-green-700 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-20 px-6">
        {/* LOGO */}
        <Link href="/">
          <div className="text-3xl font-bold tracking-wide text-white drop-shadow">
            Mint
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {[
            { href: "/search", icon: <Search size={25} /> },
            { href: "/drugCart", icon: <ShoppingCart size={25} /> },
            { href: "/likedDrug", icon: <Heart size={25} /> },
            { href: "/profile", icon: <UserRound size={25} /> },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <button className="p-2 rounded-full bg-white/20 border border-white/20 text-white hover:bg-white/30 hover:shadow-md transition-all duration-200">
                {item.icon}
              </button>
            </Link>
          ))}

          <Link href="/login">
            <button className="ml-3 px-6 py-2 rounded-full bg-white text-green-700 font-semibold shadow hover:bg-green-100 transition-all duration-200">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
