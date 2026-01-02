"use client";

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
type ClerkId = {
  clerkId: string;
};
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type user = {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
  clerkId: string;
};

import Autoplay from "embla-carousel-autoplay";
export default function DynamicUserPage({ clerkId }: ClerkId) {
  const [likedItems, setLikedItems] = useState<Medicine[]>([]);
  const date = new Date("Tue Dec 09 2025 17:16:06 GMT+0800");
  const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const [openProfile, setOpenProfile] = useState(false);
  const autoplay = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const autoplayy = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const [orderItems, setOrderItems] = useState<Medicine[]>([]);
  const [user, setUser] = useState<user>();

  useEffect(() => {
    const findUsers = async () => {
      const res = await fetch(`/api/find-user/${clerkId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const user: user = await res.json();
      setUser(user);
    };

    findUsers();
  }, []);
  useEffect(() => {
    const fetchLikes = async () => {
      const res = await fetch(`/api/liked-med?userId=${clerkId}`);
      const data = await res.json();
      setLikedItems(data.map((d: { medicine: Medicine }) => d.medicine));
    };
    const getOrder = async () => {
      const res = await fetch(`/api/find-order/${clerkId}`);
      const datas = await res.json();
      setOrderItems(datas.items.map((d: { medicine: Medicine }) => d.medicine));
    };
    getOrder();
    fetchLikes();
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center p-8 ">
      <div
        className="
      w-full max-w-5xl h-[88vh]
      backdrop-blur-xl bg-white/60
      rounded-2xl shadow-[0_10px_40px_rgba(0,150,80,0.15)]
      flex flex-row overflow-hidden border border-green-200/40
    "
      >
        <div
          className="
            w-1/3 p-10 flex flex-col items-center text-center
            bg-green-50/70 
            bg-[radial-gradient(circle,rgba(0,80,40,0.10)_1px,transparent_1px)]
            bg-size-[14px_14px]
            border-r border-green-200/50 bg-center bg-no-repeat
          "
        >
          <div className="p-4 rounded-full bg-white/90 shadow-md">
            <User size={100} />
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
              <User className="text-green-600" /> {user?.username}
            </p>
          </div>
        </div>

        <div
          className="w-full p-8 flex flex-col gap-12 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/path-to-your-image.jpg')` }}
        >
          <div>
            <h3 className="text-2xl font-semibold text-black mb-6">
              Таалагдсан эмнүүд
            </h3>
            <Carousel
              opts={{ loop: true }}
              plugins={[autoplayy.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-2.5">
                {likedItems.map((med: Medicine, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2.5 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="w-full h-80 bg-white rounded-2xl p-5 flex flex-col justify-between shadow-md">
                      <div className="w-full h-[180px] flex items-center justify-center">
                        <img
                          className="max-w-full max-h-full object-contain"
                          src={med.imageUrls[0]}
                          alt={med.name}
                        />
                      </div>

                      <div className="w-full text-center mt-3">
                        <div className="text-lg font-semibold truncate text-gray-900">
                          {med.name}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Category: {med.category}
                        </div>
                        <div className="text-sm text-gray-600">
                          Price: ₮{med.price.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Age Limit: {med.ageLimit}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-black mb-6">
              Захиалсан эмнүүд
            </h3>
            <Carousel
              opts={{ loop: true }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-2.5">
                {orderItems.map((med: Medicine, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2.5 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="w-full h-80 bg-white rounded-2xl p-5 flex flex-col justify-between shadow-md">
                      <div className="w-full h-[180px] flex items-center justify-center">
                        <img
                          className="max-w-full max-h-full object-contain"
                          src={med.imageUrls[0]}
                          alt={med.name}
                        />
                      </div>

                      <div className="w-full text-center mt-3">
                        <div className="text-lg font-semibold truncate text-gray-900">
                          {med.name}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Category: {med.category}
                        </div>
                        <div className="text-sm text-gray-600">
                          Price: ₮{med.price.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Age Limit: {med.ageLimit}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
