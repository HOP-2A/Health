import DescriptionPrompt from "@/app/_components/ai/DescriptionPrompt";
import AiResponse from "@/app/_components/ai/AiResponse";
import { Heart, Search, Send, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import Footer from "@/app/_components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col  overflow-hidden">
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
          </div>
        </div>
      </header>
      <div className="flex-1 flex justify-center mt-10 px-4 ml-30 mr-20">
        <div className="h-100 w-25000">
          <DescriptionPrompt />
        </div>
        <div className="h-100 w-25000">
          <AiResponse />
        </div>
      </div>

      <Footer />
    </div>
  );
}
