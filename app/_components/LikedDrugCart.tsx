"use client";

import { Heart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface Medicine {
  description: string;
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

    fetch(`/api/liked-med?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) =>
        setLikedItems(data.map((d: { medicine: Medicine }) => d.medicine))
      );
  }, [user]);

  const handleDelete = async (medicineId: string) => {
    if (!user) return;

    setLikedItems((prev) => prev.filter((m) => m.id !== medicineId));

    await fetch(`/api/liked-med?medicineId=${medicineId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });
  };

  return (
    <div className="min-h-screen  px-4 pt-28 pb-32">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-12 drop-shadow-sm">
          Таалагдсан эмүүд
        </h2>

        <AnimatePresence mode="wait">
          {likedItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center mt-24"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-2xl"
              >
                <Heart size={56} className="text-green-600" />
              </motion.div>

              <h3 className="mt-8 text-2xl font-semibold text-gray-700">
                Одоогоор таньд таалагдсан эм алга
              </h3>

              <p className="mt-2 text-gray-500 max-w-md">
                Та эмийг зүрх дарж хадгалах боломжтой
              </p>

              <Link href="/user/search">
                <button
                  className="
                    mt-8 px-8 py-3 rounded-xl
                    bg-green-600 text-white font-semibold
                    shadow-lg hover:bg-green-700
                    hover:shadow-green-300
                    transition-all
                  "
                >
                  Эм хайх
                </button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {likedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="
    flex flex-col sm:flex-row gap-4
    bg-white/80 backdrop-blur-2xl
    border border-white/60
    rounded-3xl p-4
    shadow-[0_10px_28px_rgba(0,120,80,0.22)]
    hover:shadow-[0_14px_36px_rgba(0,120,80,0.32)]
    transition-all
  "
                >
                  <img
                    src={item.imageUrls[0]}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-5 mt-3 text-sm text-gray-700">
                      <span>Үнэ:</span>
                      <span className="text-base font-semibold text-green-600">
                        {item.price.toLocaleString()}₮
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/user/About/${item.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="
        px-3 py-1.5
        text-[11px] font-semibold
        rounded-full
        bg-green-100 text-green-700
        hover:bg-green-200
        transition-all
      "
                      >
                        Харах
                      </motion.button>
                    </Link>

                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(item.id)}
                      className="
      p-3
      rounded-2xl
      bg-red-50 hover:bg-red-100
      transition-all
    "
                    >
                      <Trash2 size={16} className="text-red-500" />
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
