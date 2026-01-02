"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

interface MedCardProps {
  med: medicine;
  isLiked: boolean;
  onLikeChange: (id: string, liked: boolean) => void;
  userId: string;
  userClerckId: string;
}

export default function MedCardAi({
  med,
  isLiked,
  userClerckId,
  onLikeChange,
  userId,
}: MedCardProps) {
  const [liked, setLiked] = useState(isLiked);

  const router = useRouter();

  const handleClick = () => {
    router.push("/user/search");
  };

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const toggleLike = async () => {
    if (!userId) {
      console.error("No userId");
      return;
    }

    try {
      if (liked) {
        await fetch(`/api/liked-med?medicineId=${med.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userClerckId }),
        });
      } else {
        await fetch(`/api/liked-med`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ medicineId: med.id, userId }),
        });
      }

      setLiked(!liked);
      onLikeChange(med.id, !liked);
    } catch (error) {
      console.error("Toggle Like Error:", error);
    }
  };

  return (
    <Card className="backdrop-blur-xl bg-white/20 rounded-xl border border-white/30 shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4 relative">
        <img
          src={med.imageUrls[0]}
          alt={med.name}
          className="w-full h-54 object-cover rounded-xl shadow"
        />

        <button
          onClick={toggleLike}
          type="button"
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-400 transition"
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

        <h2 className="text-base font-semibold text-white mt-2 truncate">
          {med.name}
        </h2>

        <span className="text-lg font-bold text-[#80FF9F]">{med.price}₮</span>

        <div className="text-sm text-white/80 mt-1">
          тоо ширхэг: {med.stock}
        </div>

        <button
          onClick={handleClick}
          className="w-full mt-3 py-2 rounded-lg text-sm font-semibold bg-green-500 hover:bg-green-600 transition"
        >
          Search
        </button>
      </CardContent>
    </Card>
  );
}
