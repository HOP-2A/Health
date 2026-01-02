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
    <div className="min-h-screen w-full flex justify-center p-8">
      <div
        className="
          w-full max-w-5xl h-[88vh]
          rounded-[28px] overflow-hidden
          shadow-[0_25px_70px_rgba(0,120,80,0.45)]
          border border-green-300/50
          bg-cover bg-center bg-no-repeat
        "
        style={{
          background: "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)",
        }}
      >
        <div className="flex h-full">
          <div
            className="
              w-1/3 p-10 flex flex-col items-center text-center
              bg-white/95
              border-r border-green-300/50
            "
          >
            <div className="p-4 rounded-full bg-green-100 shadow-[0_6px_20px_rgba(0,120,80,0.25)]">
              <img
                src={clerkUser?.imageUrl}
                alt=""
                className="rounded-full w-28 h-28 object-cover"
              />
            </div>

            <h2 className="mt-6 text-3xl font-extrabold text-green-900 tracking-tight">
              {doctor?.username}
            </h2>

            <p className="mt-2 text-sm text-green-700/80">
              Member since {formatted}
            </p>

            <div className="mt-10 w-full space-y-6 text-left px-2">
              <p className="flex items-center gap-4 text-[16px] text-green-900">
                <Mail size={24} className="text-green-600" />
                {doctor?.email}
              </p>
              <p className="flex items-center gap-4 text-[16px] text-green-900">
                <Phone size={24} className="text-green-600" />
                {doctor?.phoneNumber}
              </p>
              <p className="flex items-center gap-4 text-[16px] text-green-900">
                <User size={26} className="text-green-600" />
                {doctor?.username}
              </p>
              <p className="flex items-center gap-4 text-[16px] text-green-900">
                <Timer size={26} className="text-green-600" />
                {doctor?.experienceYears} Жил
              </p>
            </div>
          </div>

          <div
            className="
              w-2/3 p-10 flex flex-col justify-between
              
            "
          >
            <div className="flex flex-col">
              <h3 className="text-3xl font-bold mb-8 text-white tracking-tight drop-shadow-lg">
                Таний үзсэн өвчтөнүүд
              </h3>

              <Carousel
                opts={{ loop: true }}
                plugins={[autoplay.current]}
                className="w-full"
              >
                <CarouselContent>
                  {doctorReviews.map((rev, index) => (
                    <div key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div
                        className="
                          w-[200px] h-[200px]
                          bg-white/95
                          rounded-2xl
                          border border-green-200
                          p-6
                          flex flex-col items-center justify-between
                          transition-all duration-300
                          hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(0,120,80,0.5)]
                        "
                      >
                        <CircleUserRound size={90} className="text-green-500" />
                        <div className="font-bold text-[22px] text-green-800">
                          {rev.user?.username}
                        </div>
                      </div>
                    </div>
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
