"use client";

import { useProvider } from "@/providers/AuthProvidor";
import { useClerk, UserProfile, useUser } from "@clerk/nextjs";
import { Mail, Phone, Edit, LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
type Medicine = {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  ageLimit: number;
  category: string;
};
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { prisma } from "@/lib/db";
export default function UIProfilePage() {
  const [likedItems, setLikedItems] = useState<Medicine[]>([]);
  const { signOut } = useClerk();
  const date = new Date("Tue Dec 09 2025 17:16:06 GMT+0800");
  const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const [openProfile, setOpenProfile] = useState(false);
  const autoplay = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const autoplayy = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const [orderItems, setOrderItems] = useState<Medicine[]>([]);
  const { user, setUser } = useProvider();
  const { user: clerkUser } = useUser();

  const Logout = async () => {
    setUser(null);
  };

  const completelyLogout = async (p0: { redirectUrl: string }) => {
    signOut();
    Logout();
  };
  useEffect(() => {
    if (!user) return;

    const fetchLikes = async () => {
      const res = await fetch(`/api/liked-med?userId=${clerkUser?.id}`);
      const data = await res.json();
      setLikedItems(data.map((d: { medicine: Medicine }) => d.medicine));
    };
    const getOrder = async () => {
      const res = await fetch(`/api/find-order/${user.id}`);
      const datas = await res.json();
      setOrderItems(datas.items.map((d: { medicine: Medicine }) => d.medicine));
    };
    getOrder();
    fetchLikes();
  }, [user]);

  return (
    <div className="min-h-screen w-full flex justify-center p-8">
      <div className="w-full max-w-5xl h-[88vh] flex overflow-hidden rounded-2xl shadow-xl border border-green-200/40 bg-white/60 backdrop-blur-xl">
        <div className="w-1/3 p-8 flex flex-col items-center text-center bg-green-50/70 border-r border-green-200/50">
          <div className="p-4 rounded-full bg-white/90 shadow-md">
            <img
              src={clerkUser?.imageUrl}
              alt={user?.username}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            {user?.username}
          </h2>
          <p className="mt-1 text-sm text-green-700/70">
            Member since {formatted}
          </p>

          <div className="mt-8 w-full space-y-4 text-left text-sm">
            <p className="flex items-center gap-2 text-gray-700">
              <Mail size={20} className="text-green-600" /> {user?.email}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Phone size={20} className="text-green-600" /> 8888-8888
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <User size={20} className="text-green-600" /> {user?.username}
            </p>
          </div>
        </div>

        <div className="w-2/3 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 tracking-tight">
              Таалагдсан эмнүүд
            </h3>
            <Carousel
              opts={{ loop: true }}
              plugins={[autoplayy.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-2.5">
                {likedItems.map((med, i) => (
                  <CarouselItem
                    key={i}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="w-full h-[280px] bg-white/90 rounded-2xl p-4 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-all">
                      <div className="w-full h-[160px] flex items-center justify-center">
                        <img
                          src={med.imageUrls[0]}
                          alt={med.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="w-full text-center">
                        <div className="font-bold text-lg truncate">
                          {med.name}
                        </div>
                        <div className="flex justify-center gap-1 mt-1 text-green-600 font-semibold">
                          {med.price}₮
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 tracking-tight">
              Захиалсан эмнүүд
            </h3>
            <Carousel
              opts={{ loop: true }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-2.5">
                {orderItems.map((med, i) => (
                  <CarouselItem
                    key={i}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="w-full h-[280px] bg-white/90 rounded-2xl p-4 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-all">
                      <div className="w-full h-[160px] flex items-center justify-center">
                        <img
                          src={med.imageUrls[0]}
                          alt={med.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="w-full text-center">
                        <div className="font-bold text-lg truncate">
                          {med.name}
                        </div>
                        <div className="flex justify-center gap-1 mt-1 text-green-600 font-semibold">
                          {med.price}₮
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="flex gap-6 mt-8 justify-center">
            <button
              className="flex-1 py-3 rounded-lg bg-green-600 text-white font-medium flex items-center justify-center gap-2
               transition-colors duration-200 hover:bg-green-500"
              onClick={() => setOpenProfile(true)}
            >
              <Edit size={20} /> Edit Profile
            </button>

            <button
              className="flex-1 py-3 rounded-lg bg-red-600 text-white font-medium flex items-center justify-center gap-2
               transition-colors duration-200 hover:bg-red-500"
              onClick={() => completelyLogout({ redirectUrl: "/user" })}
            >
              <LogOut size={20} /> Logout
            </button>

            {openProfile && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <UserProfile />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
