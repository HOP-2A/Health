"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function MedCard({ med, isLiked, userId, onLikeChange }) {
  const [liked, setLiked] = useState(isLiked);

  const toggleLike = async () => {
    if (!userId) return;

    const url = liked
      ? `/api/liked-med?userId=${userId}&medicineId=${med.id}`
      : "/api/liked-med";

    await fetch(url, {
      method: liked ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, medicineId: med.id }),
    });

    setLiked(!liked);
    onLikeChange(med.id, !liked);
  };

  return (
    <Card
      className="
        backdrop-blur-xl bg-white/20
        rounded-2xl border border-white/30
        shadow-md hover:shadow-xl
        hover:bg-white/30 transition-all duration-300
      "
    >
      <CardContent className="p-5 relative">
        <div className="w-full">
          <img
            src={med.imageUrls[0]}
            alt={med.name}
            className="w-full h-64 object-cover rounded-2xl shadow-lg"
          />
        </div>

        <button
          onClick={toggleLike}
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full border border-gray-100 bg-gray-200 backdrop-blur-md hover:bg-gray-400 transition shadow-md"
        >
          {liked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              className="w-7 h-7 animate-heart"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
          5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
          3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
          6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              stroke="white"
              fill="none"
              className="w-7 h-7"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
            5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
            3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
            6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          )}
        </button>

        <h2 className="text-[18px] font-semibold text-white mt-2">
          {med.name}
        </h2>

        <span className="text-[22px] font-bold text-[#80FF9F] mt-1">
          {med.price.toLocaleString()}₮
        </span>

        <div className="mt-3 text-white/80 font-medium text-[15px]">
          тоо ширхэг:{med.stock}
        </div>

        <div className="flex items-center w-36 mt-2 border border-white/30 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-xl">
          <button className="w-12 h-10 bg-white/20 text-xl text-white">
            −
          </button>
          <div className="flex-1 text-center text-[16px] font-medium text-white">
            1
          </div>
          <button className="w-12 h-10 bg-white/20 text-xl text-white">
            +
          </button>
        </div>

        <button
          type="submit"
          className="
            w-full mt-5 py-3 rounded-xl text-lg font-semibold
            bg-green-500 text-white shadow-md
            hover:bg-green-600 hover:shadow-lg
            active:scale-95 transition-all duration-200
          "
        >
          захиалах
        </button>
      </CardContent>
    </Card>
  );
}
