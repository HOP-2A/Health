"use client";

import { useProvider } from "@/providers/AuthProvidor";
import { useUser } from "@clerk/nextjs";
import { Mail, Phone, User, Timer, CircleUserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import type { User as userType } from "@/providers/AuthProvidor";
type reviews = {
  id: string;
  doctorId: string;
  illnessId: string;
  userId: string;
  notes: string;
  user: userType;
};
export default function UIProfilePage() {
  const date = new Date("Tue Dec 09 2025 17:16:06 GMT+0800");
  const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const autoplay = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const [doctorReviews, setDoctorReviews] = useState<reviews[]>([]);

  const { doctor } = useProvider();
  useEffect(() => {
    if (doctor == null) return;
    const findReviews = async () => {
      const res = await fetch(`/api/doctor-review/${doctor?.id}`);
      const revs = await res.json();
      setDoctorReviews(revs);
    };
    findReviews();
  }, [doctor]);
  const { user: clerkUser } = useUser();

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
            {doctor?.username}
          </h2>

          <p className="mt-2 text-sm text-green-700/70 font-medium">
            Member since {formatted}
          </p>

          <div className="mt-10 w-full space-y-5 text-left px-2 text-sm">
            <p className="flex items-center gap-3 text-[18px] text-gray-700">
              <Mail size={30} className="text-green-600" />
              {doctor?.email}
            </p>
            <p className="flex items-center gap-3 text-[18px] text-gray-700">
              <Phone size={30} className="text-green-600" />{" "}
              {doctor?.phoneNumber}
            </p>
            <p className="flex items-center gap-3 text-[18px] text-gray-700">
              <User size={37} className="text-green-600" /> {doctor?.username}
            </p>
            <p className="flex items-center gap-3 text-[18px] text-gray-700">
              <Timer size={37} className="text-green-600" />{" "}
              {doctor?.experienceYears} Жил
            </p>
          </div>
        </div>

        <div
          className="w-2/3 p-10 flex flex-col justify-between 
                      bg-cover bg-center bg-no-repeat w-[100%]"
        >
          <div className="flex justify-center flex-col ">
            <h3 className="text-3xl font-semibold mb-8 text-white ">
              Таний үзсэн өвчтөнүүд
            </h3>
            <Carousel
              opts={{ loop: true }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent>
                {doctorReviews.map((rev, index) => {
                  return (
                    <div
                      key={index}
                      className="pl-4.5 md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="w-[200px] h-[200px] bg-white/90 rounded-2xl p-6 flex flex-col items-center justify-between">
                        <CircleUserRound size={90} />
                        <div className="font-bold text-[30px] text-green-400">
                          {rev.user?.username}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
