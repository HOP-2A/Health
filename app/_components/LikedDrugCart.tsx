"use client";

import { Heart, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LikedDrugPage() {
  const [likedItems, setLikedItems] = useState([]);

  return (
    <div className="flex justify-center mt-20 px-4 min-h-[80vh] relative">
      <div className="w-full max-w-3xl relative z-10">
        <h2 className="text-4xl font-extrabold text-gray-300 mb-6 text-center tracking-tight drop-shadow-[0_2px_4px_rgba(0,150,80,0.25)]">
          Your Liked Drug List
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
                className="p-6  backdrop-blur-xl rounded-2xl shadow-xl border border-white/40"
              >
                <Heart
                  size={60}
                  className="text-green-600 opacity-80 animate-pulse-fast"
                />
              </motion.div>

              <p className="mt-6 text-xl font-semibold text-gray-300">
                Your list is empty
              </p>
              <p className="text-gray-50 max-w-sm mt-2">
                Add medicines or health products to see them listed here.
              </p>

            <button className="mt-6 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 shadow-lg hover:shadow-green-300 transition-all duration-300">
              Browse Medicines
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {likedItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white/70 backdrop-blur-lg border border-white/40 shadow-lg rounded-2xl p-4"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{}</h3>
                  <p className="text-gray-500 text-sm">{}</p>
                </div>

                  <button
                    className="
                      p-2 rounded-lg bg-red-50 hover:bg-red-100 
                      transition-all duration-300
                    "
                  >
                    <Trash2 className="text-red-500" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
