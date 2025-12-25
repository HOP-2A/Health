"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useProvider } from "@/providers/AuthProvidor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
type Order = {
  id: string;
  userId: string;
  totalPrice: number;
  status: string;
  discountApplied: boolean;
  createdAt: Date;
};

interface MedCardProps {
  med: medicine;
  isLiked: boolean;
  onLikeChange: (id: string, liked: boolean) => void;
  userId: string;
  userClerckId: string;
}

export default function MedCard({
  med,
  isLiked,
  userClerckId,
  onLikeChange,
  userId,
}: MedCardProps) {
  const [price, setPrice] = useState<number>(0);
  const [liked, setLiked] = useState(isLiked);
  const [orderItem, setOrderItem] = useState({
    orderId: "",
    medicineId: med.id,
    quantity: 1,
  });
  const router = useRouter();
  const { user } = useProvider();

  const addToCart = async () => {
    const res = await fetch("/api/create-orderItem", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.id,
        totalPrice: price,
        medicineId: orderItem.medicineId,
        quantity: orderItem.quantity,
        price: orderItem.quantity * med.price,
      }),
    });
    setOrderItem((prev) => {
      return { orderId: "", medicineId: med.id, quantity: 1 };
    });
    if (res.ok) {
      router.push("/drugCart");
      toast.success("Амжилттай сагсанд нэмлээ!");
    }
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
          body: JSON.stringify({
            medicineId: med.id,
            userId: userClerckId,
          }),
        });
      }

      setLiked(!liked);
      onLikeChange(med.id, !liked);
    } catch (error) {
      console.error("Toggle Like Error:", error);
    }
  };

  return (
    <Card className="backdrop-blur-xl bg-white/20 rounded-2xl border border-white/30 shadow-md hover:shadow-xl hover:bg-white/30 transition-all duration-300">
      <CardContent className="p-5 relative">
        <Link href={`/About/${med.id}`}>
          <div className="w-full">
            <img
              src={med.imageUrls[0]}
              alt={med.name}
              className="w-[400px] h-64 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </Link>

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
          {med.price}₮
        </span>

        {med.stock > 0 ? (
          <p className="text-green-200 font-medium mb-8">
            тоо ширхэг: ({med.stock} available)
          </p>
        ) : (
          <p className="text-red-200 font-medium mb-8"> Out of stock</p>
        )}
        <div className="flex place-content-between">
          <div className="flex items-center w-36 mt-2 border border-white/30 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-xl">
            <button
              className="w-12 h-10 bg-white/20 text-xl text-white"
              onClick={() => {
                setPrice(orderItem.quantity * med.price);
                setOrderItem((prev) => {
                  return { ...prev, quantity: orderItem.quantity - 1 };
                });
              }}
            >
              -
            </button>

            <button className="w-12 h-10 bg-white/20 text-xl text-white">
              {orderItem.quantity}
            </button>
            <button
              className="w-12 h-10 bg-white/20 text-xl text-white"
              onClick={() => {
                setPrice(orderItem.quantity * med.price);
                setOrderItem((prev) => {
                  return { ...prev, quantity: orderItem.quantity + 1 };
                });
              }}
            >
              +
            </button>
          </div>
          <Link
            href={`/About/${med.id}`}
            className="inline-block px-4 py-2 mt-2 text-white bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 text-center hover:bg-white/30 transition-colors"
          >
            харах
          </Link>
        </div>
        <button
          type="submit"
          className="
            w-full mt-5 py-3 rounded-xl text-lg font-semibold
            bg-green-500 text-white shadow-md
            hover:bg-green-600 hover:shadow-lg
            active:scale-95 transition-all duration-200
          "
          onClick={() => addToCart()}
        >
          Сагсанд нэмэх
        </button>
      </CardContent>
    </Card>
  );
}
