"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  MapPin,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(true);
      }

      if (currentScrollY < lastScrollY || currentScrollY < 80) {
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  return (
    <div className="w-[100vw]">
      <>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`
          fixed right-6 bottom-6 z-50
          p-3 rounded-full
          bg-gradient-to-br from-green-500/90 to-emerald-600/90
          text-white
          shadow-[0_6px_20px_rgba(0,120,80,0.45)]
          backdrop-blur-md
          transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,120,80,0.6)]
          ${
            visible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }
        `}
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        <footer
          className="
          relative mt-16
          bg-gradient-to-r from-green-600/95 via-emerald-500/95 to-green-600/95
          border-t border-green-700/40
          shadow-[0_-8px_30px_rgba(0,120,80,0.45)]
        "
        >
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex justify-center mb-6">
              <span className="text-3xl font-extrabold text-white drop-shadow-md">
                Mint
              </span>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <div
                className="
                    w-10 h-10 rounded-full
                    bg-white/20
                    border border-white/30
                    text-white
                    backdrop-blur-lg
                    flex items-center justify-center
                    transition-all duration-200
                    hover:bg-white/35 hover:scale-110
                  "
              >
                <Link
                  href="https://www.facebook.com/pinecone.academy.mongolia"
                  target="_blank"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
              </div>
              <div
                className="
                    w-10 h-10 rounded-full
                    bg-white/20
                    border border-white/30
                    text-white
                    backdrop-blur-lg
                    flex items-center justify-center
                    transition-all duration-200
                    hover:bg-white/35 hover:scale-110
                  "
              >
                <Link
                  href="https://www.instagram.com/pineconemongolia/"
                  target="_blank"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
              </div>
              <div
                className="
                    w-10 h-10 rounded-full
                    bg-white/20
                    border border-white/30
                    text-white
                    backdrop-blur-lg
                    flex items-center justify-center
                    transition-all duration-200
                    hover:bg-white/35 hover:scale-110
                  "
              >
                <Link
                  href="https://www.youtube.com/@PineconeAcademy/videos"
                  target="_blank"
                >
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="flex justify-center gap-2 text-sm text-green-50">
              <MapPin className="w-4 h-4" />
              <span>Улаанбаатар • © Pinecone Mint LLC 2026</span>
            </div>
          </div>
        </footer>
      </>
    </div>
  );
}
