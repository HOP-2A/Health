import { useProvider } from "@/providers/AuthProvidor";
import {
  Search,
  ShoppingCart,
  Heart,
  UserRound,
  Send,
  Leaf,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function MenuBar() {
  const { user } = useProvider();

  const navItems = [
    { href: "/user/search", icon: Search, label: "Хайх" },
    { href: "/user/drugCart", icon: ShoppingCart, label: "Сагс" },
    { href: "/user/likedDrug", icon: Heart, label: "Таалагдсан" },
    { href: "/user/createMessage", icon: Send, label: "Мессеж" },
    { href: "/user/profile", icon: UserRound, label: "Профайл" },
  ];

  return (
    <>
      {/* Үндсэн header хэсэг */}
      <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/user" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                <Leaf className="text-white" size={28} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900 leading-none tracking-tight">
                  Mint
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  Эмийн сан
                </span>
              </div>
            </Link>

            {/* Баруун талын үйлдлүүд */}
            <div className="flex items-center gap-2">
              <Link href="/user/search">
                <button className="hidden md:flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group">
                  <Search
                    size={24}
                    className="text-gray-600 group-hover:text-blue-500 transition-colors"
                    strokeWidth={2}
                  />
                  <span className="text-xs text-gray-600">Хайх</span>
                </button>
              </Link>

              <Link href="/user/likedDrug">
                <button className="hidden md:flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group">
                  <Heart
                    size={24}
                    className="text-gray-600 group-hover:text-red-500 transition-colors"
                    strokeWidth={2}
                  />
                  <span className="text-xs text-gray-600">Хадгалсан</span>
                </button>
              </Link>

              <Link href="/user/drugCart">
                <button className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group relative">
                  <ShoppingCart
                    size={24}
                    className="text-gray-600 group-hover:text-green-600 transition-colors"
                    strokeWidth={2}
                  />
                  <span className="text-xs text-gray-600">Сагс</span>
                </button>
              </Link>

              {!user ? (
                <Link href="/login">
                  <button className="ml-2 px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm hover:shadow transition-all duration-200 active:scale-95">
                    Нэвтрэх
                  </button>
                </Link>
              ) : (
                <Link href="/user/profile">
                  <button className="hidden md:flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group">
                    <UserRound
                      size={24}
                      className="text-gray-600 group-hover:text-amber-500 transition-colors"
                      strokeWidth={2}
                    />
                    <span className="text-xs text-gray-600">Профайл</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile доод navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <button className="flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-gray-600 hover:text-green-600 transition-colors active:scale-95">
                <item.icon size={22} strokeWidth={2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
