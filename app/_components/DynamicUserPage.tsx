"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, User, Heart, ShoppingBag, Calendar, Award } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type Medicine = {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  ageLimit: number;
  category: string;
};

type UserType = {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
  clerkId: string;
};

export default function DynamicUserPage({ clerkId }: { clerkId: string }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [likedItems, setLikedItems] = useState<Medicine[]>([]);
  const [orderItems, setOrderItems] = useState<Medicine[]>([]);

  const autoplayLikes = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );
  const autoplayOrders = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  const date = new Date("Tue Jan 08 2026 17:16:06 GMT+0800");
  const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/find-user/${clerkId}`);
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [clerkId]);

  useEffect(() => {
    const fetchLikes = async () => {
      const res = await fetch(`/api/liked-med?userId=${clerkId}`);
      const data = await res.json();
      setLikedItems(data.map((d: { medicine: Medicine }) => d.medicine));
    };

    const fetchOrders = async () => {
      const res = await fetch(`/api/find-order/${clerkId}`);
      const data = await res.json();
      setOrderItems(data.items.map((d: { medicine: Medicine }) => d.medicine));
    };

    fetchLikes();
    fetchOrders();
  }, [clerkId]);

  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Ачааллаж байна...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="relative h-40 bg-gradient-to-r from-green-600 via-green-300 to-green-600">
            <div className="absolute inset-0 bg-black opacity-10" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
          </div>

          <div className="px-6 md:px-12 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 relative z-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.username}
                    className="relative w-32 h-32 rounded-full border-8 border-white shadow-2xl object-cover bg-white"
                  />
                ) : (
                  <div className="relative w-32 h-32 rounded-full border-8 border-white shadow-2xl bg-white flex items-center justify-center">
                    <User className="w-16 h-16 text-green-600" />
                  </div>
                )}

                <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>

              <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {user?.username}
                </h1>
                <p className="text-green-600 font-medium text-sm md:text-base mb-3 flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  Бүртгүүлсэн: {formatted}
                </p>

                <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold inline-flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  Хэрэглэгч
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User className="text-green-600" />
                Хувийн мэдээлэл
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Mail className="text-green-600 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">И-мэйл</p>
                    <p className="font-semibold">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                  <User className="text-emerald-600 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Хэрэглэгчийн нэр
                    </p>
                    <p className="font-semibold">{user?.username}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Статистик</h3>

              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-red-50 rounded-lg">
                  <span className="flex items-center gap-2">
                    <Heart className="text-red-500" />
                    Таалагдсан
                  </span>
                  <span className="font-bold text-xl">{likedItems.length}</span>
                </div>

                <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="text-green-600" />
                    Захиалга
                  </span>
                  <span className="font-bold text-xl">{orderItems.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Heart className="text-red-500" />
                Таалагдсан эмнүүд ({likedItems.length})
              </h3>

              <Carousel opts={{ loop: true }} plugins={[autoplayLikes.current]}>
                <CarouselContent className="-ml-4">
                  {likedItems.map((med, i) => (
                    <CarouselItem
                      key={i}
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 shadow-md border">
                        <div className="aspect-square bg-white rounded-xl flex items-center justify-center p-4 mb-4">
                          <img
                            src={med.imageUrls[0]}
                            alt={med.name}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <h4 className="font-bold line-clamp-2">{med.name}</h4>
                        <p className="text-green-600 font-bold text-xl">
                          {med.price.toLocaleString()}₮
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ShoppingBag className="text-green-600" />
                Захиалсан эмнүүд ({orderItems.length})
              </h3>

              <Carousel
                opts={{ loop: true }}
                plugins={[autoplayOrders.current]}
              >
                <CarouselContent className="-ml-4">
                  {orderItems.map((med, i) => (
                    <CarouselItem
                      key={i}
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-5 shadow-md border border-green-100">
                        <div className="aspect-square bg-white rounded-xl flex items-center justify-center p-4 mb-4">
                          <img
                            src={med.imageUrls[0]}
                            alt={med.name}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <h4 className="font-bold line-clamp-2">{med.name}</h4>
                        <p className="text-green-600 font-bold text-xl">
                          {med.price.toLocaleString()}₮
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
