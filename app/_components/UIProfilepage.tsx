"use client";

import { useProvider } from "@/providers/AuthProvidor";
import { UserProfile, useUser } from "@clerk/nextjs";
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
export default function UIProfilePage() {
  const [likedItems, setLikedItems] = useState<Medicine[]>([]);
  const date = new Date("Tue Dec 09 2025 17:16:06 GMT+0800");
  const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const [openProfile, setOpenProfile] = useState(false);
  const autoplay = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const autoplayy = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const [orderItems, setOrderItems] = useState<Medicine[]>([]);
  const { user } = useProvider();
  const { user: clerkUser } = useUser();
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
    <div className="min-h-screen w-full flex justify-center p-8 ">
      <div
        className="
          w-full max-w-5xl h-[88vh] 
          backdrop-blur-xl bg-white/60 
          rounded-2xl shadow-[0_10px_40px_rgba(0,150,80,0.15)]
          flex overflow-hidden border border-green-200/40
          bg-cover bg-center bg-no-repeat
        "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596046070666-473705748e6c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div
          className="
            w-1/3 p-10 flex flex-col items-center text-center
            bg-green-50/70 
            bg-[radial-gradient(circle,rgba(0,80,40,0.10)_1px,transparent_1px)]
            bg-[length:14px_14px]
            border-r border-green-200/50
    bg-cover bg-center bg-no-repeat
          "
        >
          <div className="p-4 rounded-full bg-white/90 shadow-md">
            <img
              src={clerkUser?.imageUrl}
              alt=""
              className="text-green-600 rounded-[100%]"
            />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-800 tracking-tight drop-shadow-sm">
            {user?.username}
          </h2>

          <p className="mt-2 text-sm text-green-700/70 font-medium">
            Member since {formatted}
          </p>

          <div className="mt-10 w-full space-y-5 text-left px-2 text-sm">
            <p className="flex items-center gap-3 text-gray-700">
              <Mail size={30} className="text-green-600" />
              {user?.email}
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <Phone size={30} className="text-green-600" /> 99689696
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <User size={30} className="text-green-600" /> {user?.username}
            </p>
          </div>
        </div>

        <div
          className="w-2/3 p-10 flex flex-col justify-between 
                      bg-cover bg-center bg-no-repeat w-[100%]"
        >
          <div className="flex justify-center flex-col ">
            <h3 className="text-3xl font-semibold mb-8 text-white  tracking-tight">
              Таалагдсан эмнүүд
            </h3>
            <Carousel
              opts={{ loop: true }}
              plugins={[autoplayy.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-2.5">
                {likedItems.map((med, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2.5 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="w-full h-[300px] bg-white/90 rounded-2xl p-6 flex flex-col items-center justify-between">
                      <div className="w-full h-[180px] flex items-center justify-center">
                        <img
                          className="max-w-full max-h-full object-contain"
                          src={med.imageUrls[0]}
                          alt={med.name}
                        />
                      </div>
                      <div className="w-full text-center">
                        <div className="text-[20px] font-bold truncate">
                          {med.name}
                        </div>
                        <div className="flex gap-[3px] justify-center">
                          <div className="text-[18px]">Үнэ:</div>
                          <div className="text-[18px] text-green-600">
                            {med.price}₮
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="flex justify-center flex-col ">
            <h3 className="text-3xl font-semibold mb-8 text-white  tracking-tight">
              Захиалсан эмнүүд
            </h3>
            <Carousel
              opts={{ loop: true }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-2.5">
                {orderItems.map((med, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2.5 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="w-full h-[300px] bg-white/90 rounded-2xl p-6 flex flex-col items-center justify-between">
                      <div className="w-full h-[180px] flex items-center justify-center">
                        <img
                          className="max-w-full max-h-full object-contain"
                          src={med.imageUrls[0]}
                          alt={med.name}
                        />
                      </div>
                      <div className="w-full text-center">
                        <div className="text-[20px] font-bold truncate">
                          {med.name}
                        </div>
                        <div className="flex gap-[3px] justify-center">
                          <div className="text-[18px]">Үнэ:</div>
                          <div className="text-[18px] text-green-600">
                            {med.price}₮
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="flex gap-7   mt-10 w-[70%]">
            <button
              className="flex-1 py-3 rounded-lg bg-green-600 text-white font-medium
                           flex items-center justify-center gap-3
                           hover:bg-green-500 hover:shadow-lg 
                           transition-transform duration-200 hover:scale-105 w-[50%]"
              onClick={() => setOpenProfile(true)}
            >
              <Edit size={22} />
              Edit Profile
            </button>

            <button
              className="flex-1 py-3 rounded-lg bg-red-600 text-white font-medium
                           flex items-center justify-center gap-3
                           hover:bg-red-500 hover:shadow-lg
                           transition-transform duration-200 hover:scale-105"
            >
              <LogOut size={22} />
              Logout
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
