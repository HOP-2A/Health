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
    <Card className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        {/* Зургийн хэсэг */}
        <div className="relative overflow-hidden">
          <Link href={`/user/About/${med.id}`}>
            <div className="relative aspect-[4/3] bg-gray-100">
              <img
                src={med.imageUrls[0]}
                alt={med.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Stock overlay */}
              {med.stock === 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    Дууссан
                  </span>
                </div>
              )}
            </div>
          </Link>

          {/* Like товч */}
          <button
            onClick={toggleLike}
            className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md transition-all duration-200 active:scale-90"
            aria-label={liked ? "Unlike" : "Like"}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                liked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>

          {/* Stock badge */}
          {med.stock > 0 && med.stock <= 10 && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded-lg">
              {med.stock} үлдсэн
            </div>
          )}
        </div>

        {/* Мэдээллийн хэсэг */}
        <div className="p-4">
          {/* Нэр */}
          <Link href={`/user/About/${med.id}`}>
            <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2 hover:text-green-600 transition-colors">
              {med.name}
            </h3>
          </Link>

          {/* Нэмэлт мэдээлэл - Stock болон насны хязгаар */}
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Package className="w-3.5 h-3.5" />
              <span>{med.stock > 0 ? `${med.stock} ширхэг` : "Дууссан"}</span>
            </div>
            {med.ageLimit && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>нас:{med.ageLimit} </span>
              </div>
            )}
          </div>

          {/* Үнэ */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold text-green-600">
              {med.price.toLocaleString()}₮
            </span>
          </div>

          {/* Тоо ширхэг болон үйлдлүүд */}
          <div className="space-y-3">
            {/* Quantity selector */}
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={decrementQuantity}
                  disabled={orderItem.quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Тоог бууруулах"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <div className="w-12 h-10 flex items-center justify-center bg-white text-sm font-semibold">
                  {orderItem.quantity}
                </div>
                <button
                  onClick={incrementQuantity}
                  disabled={orderItem.quantity >= med.stock}
                  className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Тоог нэмэгдүүлэх"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Дэлгэрэнгүй харах товч */}
              <Link
                href={`/user/About/${med.id}`}
                className="flex-1 h-10 flex items-center justify-center gap-2 px-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Харах</span>
              </Link>
            </div>

            {/* Сагсанд нэмэх товч */}
            <button
              onClick={addToCart}
              disabled={med.stock === 0}
              className="w-full py-2.5 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {med.stock === 0 ? "Дууссан" : "Сагсанд нэмэх"}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
