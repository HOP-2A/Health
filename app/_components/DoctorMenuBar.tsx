import { useProvider } from "@/providers/AuthProvidor";
import {
  UserRoundSearch,
  Cross,
  UserRound,
  MessageCircleReply,
} from "lucide-react";
import Link from "next/link";

export default function DoctorMenuBar() {
  const { doctor } = useProvider();
  return (
    <header
      className="
        w-full sticky top-0 z-50
        bg-gradient-to-r from-green-600/95 via-emerald-500/95 to-green-600/95
        backdrop-blur-md
        border-b border-green-700/40
        shadow-[0_8px_30px_rgba(0,120,80,0.45)]
      "
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-24 px-6">
        <Link href="/doctor">
          <div
            className="
              text-4xl font-extrabold tracking-wide text-white
              drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]
              transition-transform duration-200
              hover:scale-105 cursor-pointer
            "
          >
            Mint
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {[
            { href: "/doctor/userSearch", icon: <UserRoundSearch size={26} /> },
            { href: "/doctor/AddMed", icon: <Cross size={26} /> },
            { href: "/doctor/Review", icon: <MessageCircleReply size={26} /> },
            { href: "/doctor/doctorProfile", icon: <UserRound size={26} /> },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <button
                className="
                  p-3 rounded-full
                  bg-white/20
                  border border-white/30
                  text-white
                  backdrop-blur-lg
                  transition-all duration-200
                  hover:bg-white/35
                  hover:shadow-[0_4px_15px_rgba(255,255,255,0.25)]
                  active:scale-95
                "
              >
                {item.icon}
              </button>
            </Link>
          ))}

          {doctor ? (
            <div />
          ) : (
            <Link href="/login">
              <button
                className="
                  ml-3 px-6 py-2 rounded-full
                  bg-white text-green-700 font-semibold
                  shadow-md
                  transition-all duration-200
                  hover:bg-green-50 hover:shadow-lg
                  hover:scale-105 active:scale-95
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
