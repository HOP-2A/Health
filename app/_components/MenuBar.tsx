import { Search, ShoppingCart, Heart, UserRound } from "lucide-react";
import Link from "next/link";

export default function MenuBar() {
  return (
    <header className="bg-white w-full text-gray-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-20 px-6">
        <div className="text-2xl font-bold tracking-wide text-green-600">
          Elixora
        </div>
        <div className="flex items-center gap-4">
          <Link href="/search">
            <button className="p-2 rounded hover:bg-green-100 transition shadow">
              <Search size={22} className="text-green-600" />
            </button>
          </Link>

          <Link href="/drugCart">
            <button className="p-2 rounded hover:bg-green-100 transition shadow">
              <ShoppingCart size={22} className="text-green-600" />
            </button>
          </Link>

          <Link href="/likedDrug">
            <button className="p-2 rounded hover:bg-green-100 transition shadow">
              <Heart size={22} className="text-green-600" />
            </button>
          </Link>

          <Link href="/profile">
            <button className="p-2 rounded hover:bg-green-100 transition shadow">
              <UserRound size={22} className="text-green-600" />
            </button>
          </Link>

          <Link href="/login">
            <button className="ml-2 px-4 py-2 rounded-full bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition-all duration-200">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
