"use client";

import { Heart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface Medicine {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  ageLimit: number;
  category: string;
}

export default function LikedDrugPage() {
  const [likedItems, setLikedItems] = useState<Medicine[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const fetchLikes = async () => {
      const res = await fetch(`/api/liked-med?userId=${user.id}`);
      const data = await res.json();
      setLikedItems(data.map((d: { medicine: Medicine }) => d.medicine));
    };

    fetchLikes();
  }, [user]);

  const handleDelete = async (medicineId: string) => {
    if (!user) return;

    setLikedItems((prev) => prev.filter((m) => m.id !== medicineId));

    await fetch(`/api/liked-med?medicineId=${medicineId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
      }),
    });
  };

  return (
    <div className="flex justify-center mt-20 px-4 min-h-[80vh] relative">
      <div className="w-full max-w-3xl relative z-10">
        <h2 className="text-4xl font-extrabold text-gray-300 mb-6 text-center tracking-tight drop-shadow-[0_2px_4px_rgba(0,150,80,0.25)]">
          Таны дуртай эмийн жагсаалт
        </h2>

        <AnimatePresence mode="wait">
          {likedItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center mt-20"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="p-6 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40"
              >
                <Heart
                  size={60}
                  className="text-green-600 opacity-80 animate-pulse-fast"
                />
              </motion.div>

              <p className="mt-6 text-xl font-semibold text-gray-300">
                Таны жагсаалт хоосон байна
              </p>
              <p className="text-gray-50 max-w-sm mt-2">
                Эм эсвэл эрүүл мэндийн бүтээгдэхүүнийг энд жагсаасан харагдуулна
                уу.
              </p>
              <Link href="/search">
                <button className="mt-6 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 shadow-lg hover:shadow-green-300 transition-all duration-300">
                  Эмийг үзэх
                </button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {likedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="
        flex items-center gap-4
        bg-white/70 backdrop-blur-2xl
        border border-white/40
        shadow-[0_8px_30px_rgb(0,0,0,0.08)]
        rounded-2xl p-4
        hover:scale-[1.01]
        transition-all
      "
                >
                  <div className="relative">
                    <img
                      src={item.imageUrls?.[0]}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <span className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-green-600 text-white shadow">
                      {item.ageLimit}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.category}
                    </p>
                    <p className="text-lg font-bold text-green-600 mt-1">
                      {item.price}₮
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link href={`/About/${item.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="
        px-4 py-2
        text-xs font-semibold
        rounded-full
        bg-green-100 text-green-700
        hover:bg-green-200
        shadow-sm hover:shadow
        transition-all
      "
                      >
                        харах
                      </motion.button>
                    </Link>

                    <motion.button
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="
      p-3
      rounded-full
      bg-red-100
      hover:bg-red-200
      shadow-sm hover:shadow
      transition-all
    "
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={22} className="text-red-600" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
