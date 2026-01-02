"use client";

import { useProvider } from "@/providers/AuthProvidor";

import {
  Mail,
  Phone,
  Edit,
  LogOut,
  User,
  Clock,
  CircleUserRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { User as userType } from "@/providers/AuthProvidor";
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

type doctor = {
  id: string;
  username: string;
  email: string;
  profilePic: string;
  phoneNumber: string;
  experienceYears: number;
  clerkId: string;
};

type reviews = {
  id: string;
  doctorId: string;
  illnessId: string;
  userId: string;
  notes: string;
  user: userType;
};

import Autoplay from "embla-carousel-autoplay";
import { number } from "zod";
export default function DynamicDoctorPage({ clerkId }: ClerkId) {
  const date = new Date("Tue Dec 09 2025 17:16:06 GMT+0800");
  const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const autoplay = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const autoplayy = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const [doctor, setDoctor] = useState<doctor>();
  const [doctorReviews, setDoctorReviews] = useState<reviews[]>([]);
  useEffect(() => {
    const findDoctors = async () => {
      const res = await fetch(`/api/find-doctor/${clerkId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const doctor: doctor = await res.json();
      setDoctor(doctor);
    };

    findDoctors();
  }, []);
  useEffect(() => {
    console.log(doctor?.id);
    if (doctor == null) return;
    const findReviews = async () => {
      const res = await fetch(`/api/doctor-review/${doctor.id}`);
      const revs = await res.json();
      setDoctorReviews(revs);
    };
    findReviews();
  }, [doctor]);

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
            bg-size-[14px_14px]
            border-r border-green-200/50
  bg-center bg-no-repeat
          "
        >
          <div className="p-4 rounded-full bg-white/90 shadow-md">
            {doctor?.profilePic ? (
              <img
                src={doctor.profilePic}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <User size={100} />
            )}
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-800 tracking-tight drop-shadow-sm">
            {doctor?.username}
          </h2>

          <p className="mt-2 text-sm text-green-700/70 font-medium">
            Member since {formatted}
          </p>

          <div className="mt-10 w-full space-y-5 text-left px-2 text-sm">
            <p className="flex items-center gap-3 text-gray-700">
              <span className="w-8 flex justify-center text-green-600">
                <Mail size={24} />
              </span>
              {doctor?.email}
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <span className="w-8 flex justify-center text-green-600">
                <Phone size={24} />
              </span>
              {doctor?.phoneNumber}
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <span className="w-8 flex justify-center text-green-600">
                <User size={24} />
              </span>
              {doctor?.username}
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <span className="w-8 flex justify-center text-green-600">
                <Clock size={24} />
              </span>
              {doctor?.experienceYears} Жил
            </p>
          </div>
        </div>
        {/* Reviews Section */}
        <div className="w-full lg:w-2/3 p-8 overflow-y-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Reviewed Users
          </h3>

          <div className="flex flex-wrap gap-6">
            {doctorReviews.map((rev: reviews) => (
              <div
                key={rev.id}
                className="
          w-full
          sm:w-[calc(50%-12px)]
          lg:w-[calc(33.333%-16px)]
          bg-white/90
          rounded-2xl
          p-6
          flex
          flex-col
          items-center
          justify-between
          shadow-md
          transition
          hover:shadow-lg
        "
              >
                <CircleUserRound size={64} className="text-green-500" />

                <div className="mt-4 font-semibold text-gray-800 text-lg">
                  {rev.user.username}
                </div>

                <p className="mt-2 text-sm text-gray-600 text-center line-clamp-3">
                  {rev.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="w-full p-8 flex flex-col gap-12 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/path-to-your-image.jpg')` }}
        ></div>
      </div>
    </div>
  );
}
