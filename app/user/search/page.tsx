"use client";

import MenuBar from "@/app/_components/MenuBar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import MedCard from "@/app/_components/MedCard";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@/providers/route";
import Footer from "@/app/_components/Footer";

type medicine = {
  id: string;
  name: string;
  description: string;
  ageLimit: string;
  price: number;
  stock: number;
  imageUrls: string[];
  expiryDate: string;
};

interface LikedItem {
  medicine: {
    id: string;
  };
}

export default function Page() {
  const pathname = usePathname();
  const [medicines, setMedicines] = useState<medicine[]>([]);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const { user: clerkUser } = useUser();
  const { loading, user } = useAuth(clerkUser?.id ?? "");

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const findMecines = async () => {
    const res = await fetch("/api/find-med", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ input }),
    });
    setMedicines(await res.json());
  };

  useEffect(() => {
    const findMecines = async () => {
      const res = await fetch("/api/find-med", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input }),
      });
      setMedicines(await res.json());
    };

    findMecines();
  }, [input]);

  useEffect(() => {
    if (!loading && user) {
      fetch(`/api/liked-med?userId=${user.clerkId}`)
        .then((r) => r.json())
        .then((likes) =>
          setLikedItems(likes.map((l: LikedItem) => l.medicine.id))
        );
    }
  }, [user, loading]);

  return (
    <div className="min-h-screen flex flex-col ">
      <MenuBar />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex-1"
        >
          {/* 🔍 Search section */}
          <section className="pt-28 pb-16 px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-extrabold text-center text-green-700 mb-8 drop-shadow-sm">
                Эм хайх
              </h2>

              <div className="relative group backdrop-blur-xl bg-white/60 border border-white/70 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,120,80,0.2)] transition-all">
                <Search
                  size={30}
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-green-600"
                />
                <input
                  type="text"
                  value={input}
                  onChange={handleInputValue}
                  placeholder="Энд бичээд эмээ хайгаарай..."
                  className="pl-14 pr-4 py-3 w-full bg-transparent text-lg text-gray-800 placeholder-gray-500 focus:outline-none"
                />
              </div>

              <button
                onClick={findMecines}
                className="mt-6 w-full py-3 rounded-xl text-lg font-semibold text-white
                bg-gradient-to-br from-green-500 to-emerald-700
                shadow-[0_6px_18px_rgba(0,120,80,0.35)]
                hover:shadow-[0_10px_30px_rgba(0,120,80,0.5)]
                hover:scale-[1.02] active:scale-[0.97]
                transition-all"
              >
                Хайх
              </button>
            </div>
          </section>

          {/* 💊 Medicine list */}
          <section className="px-4 pb-24">
            <div
              className="
                max-w-7xl mx-auto
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                gap-10
              "
            >
              {medicines.map((med) => (
                <MedCard
                  key={med.id}
                  med={med}
                  userId={user?.id || ""}
                  userClerckId={user?.clerkId || ""}
                  isLiked={likedItems.includes(med.id)}
                  onLikeChange={(id, liked) =>
                    setLikedItems((prev) =>
                      liked ? [...prev, id] : prev.filter((i) => i !== id)
                    )
                  }
                />
              ))}
            </div>
          </section>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
