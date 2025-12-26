import { UserRoundSearch, Cross, Heart, UserRound } from "lucide-react";
import Link from "next/link";

export default function DoctorMenuBar() {
  return (
    <header
      className="
        w-full sticky top-0 z-50
        backdrop-blur-sm bg-white/20
        border-b border-green-300/40
        shadow-[0_4px_25px_rgba(0,200,120,0.25)]
      "
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-25 px-6">
        <Link href="/doctor/doctorMain">
          <div
            className="
            text-4xl font-extrabold tracking-wide text-gray-300
            drop-shadow-[0_0_10px_rgba(100,255,150,0.6)]
            transition-transform duration-200
            hover:scale-105 cursor-pointer
          "
          >
            Mint
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {[
            { href: "/doctor/userSearch", icon: <UserRoundSearch size={27} /> },
            { href: "/doctor/AddMed", icon: <Cross size={27} /> },
            { href: "/doctor/Orders", icon: <Heart size={27} /> },
            { href: "/doctor/doctorProfile", icon: <UserRound size={27} /> },
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

          <Link href="/login">
            <button
              className="
                ml-3 px-6 py-2 rounded-full
                bg-green-500 text-white font-semibold
                shadow-md hover:bg-green-600
                transition-all duration-200
                hover:shadow-lg hover:scale-105 active:scale-95
              "
            >
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
