"use client";

import { useProvider } from "@/providers/AuthProvidor";
<<<<<<< HEAD
import { UserProfile, useUser } from "@clerk/nextjs";
import {
  Mail,
  Phone,
  Edit,
  LogOut,
  User,
  Timer,
  CircleUserRound,
} from "lucide-react";
=======
import { useClerk, UserProfile, useUser } from "@clerk/nextjs";
import { Mail, Phone, Edit, LogOut, User } from "lucide-react";
>>>>>>> 859f669 (d)
import { useEffect, useRef, useState } from "react";
type Medicine = {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  ageLimit: number;
  category: string;
};
<<<<<<< HEAD
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
  const autoplayy = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
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

=======
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
export default function DoctorProfile() {
  const [likedItems, setLikedItems] = useState<Medicine[]>([]);
  const { user } = useProvider();
  const { signOut } = useClerk();

  const formatted = user?.createdAt
    ? new Date(user.createdAt).toISOString().slice(0, 10)
    : "";

  const [openProfile, setOpenProfile] = useState(false);
  const autoplay = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const autoplayy = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const [orderItems, setOrderItems] = useState<Medicine[]>([]);

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
  console.log(orderItems, "asdfas");
>>>>>>> 859f669 (d)
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
<<<<<<< HEAD
            {doctor?.username}
=======
            {user?.username}
>>>>>>> 859f669 (d)
          </h2>

          <p className="mt-2 text-sm text-green-700/70 font-medium">
            Member since {formatted}
          </p>

          <div className="mt-10 w-full space-y-5 text-left px-2 text-sm">
<<<<<<< HEAD
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
=======
            <p className="flex items-center gap-3 text-gray-700">
              <Mail size={30} className="text-green-600" />
              {user?.email}
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <Phone size={30} className="text-green-600" /> 99689696
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <User size={30} className="text-green-600" /> {user?.username}
>>>>>>> 859f669 (d)
            </p>
          </div>
        </div>

        <div
          className="w-2/3 p-10 flex flex-col justify-between 
                      bg-cover bg-center bg-no-repeat w-[100%]"
        >
          <div className="flex justify-center flex-col ">
<<<<<<< HEAD
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
=======
            <h3 className="text-3xl font-semibold mb-8 text-white  tracking-tight">
              what to add...
            </h3>
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
              onClick={() => signOut({ redirectUrl: "/" })}
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
>>>>>>> 859f669 (d)
          </div>
        </div>
      </div>
    </div>
  );
}
