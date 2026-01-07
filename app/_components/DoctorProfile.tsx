"use client";

import { useProvider } from "@/providers/AuthProvidor";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  Mail,
  Phone,
  User,
  LogOut,
  CircleUserRound,
  Award,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent } from "@/components/ui/carousel";

type userType = {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
};

type reviews = {
  id: string;
  doctorId: string;
  illnessId: string;
  userId: string;
  notes: string;
  user: userType;
};

export default function UIProfilePage() {
  const router = useRouter();
  const { signOut } = useClerk();
  const autoplay = useRef(Autoplay({ delay: 1500, stopOnInteraction: false }));
  const [doctorReviews, setDoctorReviews] = useState<reviews[]>([]);

  const { doctor, setDoctor, setUser } = useProvider();
  const { user: clerkUser } = useUser();

  const formattedDate = doctor
    ? `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`
    : "";

  const Logout = async () => {
    setDoctor(null);
    setUser(null);
  };
  const completelyLogout = async (p0: { redirectUrl: string }) => {
    signOut();
    Logout();
    router.push("/");
  };

  useEffect(() => {
    if (!doctor) return;
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/doctor-review/${doctor.id}`);
        const revs = await res.json();
        setDoctorReviews(revs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [doctor]);

  if (!doctor)
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
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-green-500 via-green-300 to-green-500">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
          </div>

          <div className="px-6 md:px-12 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 relative z-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

                {doctor?.profilePic ? (
                  <img
                    src={doctor.profilePic}
                    alt={doctor?.username || "Profile"}
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
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {doctor?.username}
                </h1>
                <p className="text-indigo-600 font-semibold text-lg md:text-xl mb-3">
                  {doctor.experienceYears >= 10
                    ? "Ахлах мэргэжилтэн эмч"
                    : doctor.experienceYears >= 5
                    ? "Туршлагатай эмч"
                    : "Эмч"}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Идэвхтэй
                  </span>
                  <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    Баталгаажсан
                  </span>
                  <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                    Member since {formattedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-8 bg-indigo-600 rounded-full mr-3"></div>
                Таны үзсэн өвчтөнүүд
              </h2>
              <Carousel
                opts={{ loop: true }}
                plugins={[autoplay.current]}
                className="w-full"
              >
                <CarouselContent>
                  {doctorReviews.map((rev, index) => (
                    <div key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="w-[200px] h-[200px] bg-white/95 rounded-2xl border border-green-200 p-6 flex flex-col items-center justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(0,120,80,0.5)]">
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

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Phone className="w-6 h-6 text-indigo-600 mr-2" />
                Холбоо барих
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Утасны дугаар
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {doctor?.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Mail className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      И-мэйл хаяг
                    </p>
                    <p className="text-gray-900 font-semibold text-sm break-all">
                      {doctor?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-6 h-6 text-indigo-600 mr-2" />
                Мэргэжлийн ур чадвар
              </h3>

              <div className="space-y-3">
                <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                  <Award className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    {doctor?.experienceYears}+ жилийн туршлага
                  </span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <Award className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Баталгаажсан мэргэжилтэн
                  </span>
                </div>
              </div>

              <button
                className="w-full mt-6 py-3 rounded-lg bg-red-600 text-white font-medium flex items-center justify-center gap-2 hover:bg-red-500 transition-colors"
                onClick={() => completelyLogout({ redirectUrl: "/user" })}
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
