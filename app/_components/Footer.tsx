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
    <>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`
          fixed right-6 bottom-6 z-50
          p-3 rounded-full
          bg-white/30 backdrop-blur-md
          border border-white/40
          text-green-700
          shadow-md
          transition-all duration-300 ease-out
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
          relative mt-10
          backdrop-blur-md bg-green-50/40
          border-t border-green-300/40
          shadow-[0_-4px_25px_rgba(0,200,120,0.25)]
        "
      >
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex justify-center mb-6">
            <span className="text-3xl font-extrabold text-green-900">Mint</span>
          </div>

          <ul className="flex flex-wrap justify-center gap-6 text-sm text-green-900 mb-6">
            {[
              "Бидний тухай",
              "Пишүүнлэл",
              "Сурталчилгаа байршуулах",
              "Үйлчилгээний нөхцөл",
              "Нууцлалын бодлого",
            ].map((label, i) => (
              <li key={i}>
                <Link href="#" className="hover:opacity-70">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-4 mb-6">
            {[Facebook, Twitter, Instagram, Youtube, Linkedin].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="
                    w-10 h-10 rounded-full
                    bg-white/30 backdrop-blur-md
                    border border-white/40
                    text-green-700
                    flex items-center justify-center
                  "
                >
                  <Icon className="w-5 h-5" />
                </div>
              )
            )}
          </div>

          <div className="flex justify-center gap-2 text-sm text-green-900">
            <MapPin className="w-4 h-4" />
            <span>Улаанбаатар • © Pinecone Mint LLC 2026</span>
          </div>
        </div>
      </footer>
    </>
  );
}
