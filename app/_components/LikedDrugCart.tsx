"use client";

import { Heart, Trash2 } from "lucide-react";
import { useState } from "react";

export default function LikedDrugPage() {
  const [likedItems, setLikedItems] = useState([]);

  return (
    <div className="flex justify-center mt-20 px-4 min-h-[80vh]">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-extrabold text-green-700 mb-6 text-center tracking-tight">
          Your Liked Drug List
        </h2>

        {likedItems.length === 0 ? (
          <div className="flex flex-col items-center text-center mt-20">
            <div className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40">
              <Heart size={60} className="text-green-600 opacity-80" />
            </div>

            <p className="mt-6 text-xl font-semibold text-gray-700">
              Your list is empty
            </p>
            <p className="text-gray-500 max-w-sm mt-2">
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

                <button className="p-2 rounded-lg hover:bg-red-100 transition">
                  <Trash2 className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
