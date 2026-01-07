"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useProvider } from "@/providers/AuthProvidor";
import {
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Eye,
  Package,
  Calendar,
} from "lucide-react";
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
      router.push("/user/drugCart");
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

  const decrementQuantity = () => {
    if (orderItem.quantity > 1) {
      setOrderItem((prev) => ({
        ...prev,
        quantity: prev.quantity - 1,
      }));
      setPrice((orderItem.quantity - 1) * med.price);
    }
  };

  const incrementQuantity = () => {
    if (orderItem.quantity < med.stock) {
      setOrderItem((prev) => ({
        ...prev,
        quantity: prev.quantity + 1,
      }));
      setPrice((orderItem.quantity + 1) * med.price);
    }
  };

  return (
    <Card className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link href={`/user/About/${med.id}`}>
            <div className="relative aspect-[4/3] bg-gray-100">
              <img
                src={med.imageUrls[0]}
                alt={med.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {med.stock === 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-semibold text-base">
                    Дууссан
                  </span>
                </div>
              )}
            </div>
          </Link>

          <button
            onClick={toggleLike}
            className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md transition-all duration-200 active:scale-90"
            aria-label={liked ? "Unlike" : "Like"}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                liked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>

          {med.stock > 0 && med.stock <= 10 && (
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-white text-[11px] font-semibold rounded-md">
              {med.stock} үлдсэн
            </div>
          )}
        </div>

        <div className="p-3">
          <Link href={`/user/About/${med.id}`}>
            <h3 className="font-semibold text-gray-900 text-sm mb-1.5 line-clamp-2 hover:text-green-600 transition-colors">
              {med.name}
            </h3>
          </Link>

          <div className="flex items-center gap-3 mb-2 text-[11px] text-gray-600">
            <div className="flex items-center gap-1">
              <Package className="w-3 h-3" />
              <span>{med.stock > 0 ? `${med.stock} ширхэг` : "Дууссан"}</span>
            </div>
            {med.ageLimit && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>нас:{med.ageLimit}</span>
              </div>
            )}
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl font-bold text-green-600">
              {med.price.toLocaleString()}₮
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                <button
                  onClick={decrementQuantity}
                  disabled={orderItem.quantity <= 1}
                  className="w-9 h-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Тоог бууруулах"
                >
                  <Minus className="w-3.5 h-3.5 text-gray-600" />
                </button>
                <div className="w-10 h-9 flex items-center justify-center bg-white text-xs font-semibold">
                  {orderItem.quantity}
                </div>
                <button
                  onClick={incrementQuantity}
                  disabled={orderItem.quantity >= med.stock}
                  className="w-9 h-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Тоог нэмэгдүүлэх"
                >
                  <Plus className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </div>

              <Link
                href={`/user/About/${med.id}`}
                className="flex-1 h-9 flex items-center justify-center gap-1.5 px-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-xs font-medium text-gray-700">Харах</span>
              </Link>
            </div>

            <button
              onClick={addToCart}
              disabled={med.stock === 0}
              className="w-full py-2 rounded-md bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-xs shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {med.stock === 0 ? "Дууссан" : "Захиалах"}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
