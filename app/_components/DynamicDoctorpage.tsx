"use client";

import { Mail, Phone, User, Clock, CircleUserRound, Award } from "lucide-react";
import { useEffect, useState } from "react";
import type { User as userType } from "@/providers/AuthProvidor";

type ClerkId = {
  clerkId: string;
};

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

export default function DynamicDoctorPage({ clerkId }: ClerkId) {
  const date = new Date("Tue Dec 09 2025 17:16:06 GMT+0800");
  const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const [doctor, setDoctor] = useState<doctor>();
  const [doctorReviews, setDoctorReviews] = useState<reviews[]>([]);

  useEffect(() => {
    const findDoctor = async () => {
      const res = await fetch(`/api/find-doctor/${clerkId}`);
      const data: doctor = await res.json();
      setDoctor(data);
    };
    findDoctor();
  }, [clerkId]);

  useEffect(() => {
    if (!doctor?.id) return;

    const findReviews = async () => {
      const res = await fetch(`/api/doctor-review/${doctor.id}`);
      const revs: reviews[] = await res.json();
      setDoctorReviews(revs);
    };
    findReviews();
  }, [doctor]);

  const uniqueReviewedUsers: { user: userType; count: number }[] = [];

  for (let i = 0; i < doctorReviews.length; i++) {
    const email = doctorReviews[i].user.email;

    const emails = uniqueReviewedUsers.map((item) => item.user.email);

    if (emails.includes(email)) {
      const index = emails.indexOf(email);
      uniqueReviewedUsers[index].count += 1;
    } else {
      uniqueReviewedUsers[uniqueReviewedUsers.length] = {
        user: doctorReviews[i].user,
        count: 1,
      };
    }
  }

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
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-green-500 via-emerald-400 to-green-600">
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
          </div>

          <div className="px-6 md:px-12 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 relative z-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur-lg opacity-50" />
                {doctor.profilePic ? (
                  <img
                    src={doctor.profilePic}
                    className="relative w-32 h-32 rounded-full border-8 border-white shadow-2xl object-cover bg-white"
                  />
                ) : (
                  <div className="relative w-32 h-32 rounded-full border-8 border-white shadow-2xl bg-white flex items-center justify-center">
                    <User className="w-16 h-16 text-green-600" />
                  </div>
                )}
                <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>

              <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {doctor.username}
                </h1>

                <p className="text-green-700 font-semibold text-lg mb-3">
                  {doctor.experienceYears >= 10
                    ? "Ахлах мэргэжилтэн эмч"
                    : doctor.experienceYears >= 5
                    ? "Туршлагатай эмч"
                    : "Эмч"}
                </p>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    Идэвхтэй
                  </span>
                  <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    Баталгаажсан
                  </span>
                  <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                    Member since {formatted}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Reviewed Users
            </h2>

            {uniqueReviewedUsers.length === 0 ? (
              <p className="text-gray-500">Одоогоор үнэлгээ алга</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {uniqueReviewedUsers.map(({ user, count }) => (
                  <div
                    key={user.email}
                    className="bg-white border border-green-200 rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition"
                  >
                    <CircleUserRound size={64} className="text-green-500" />
                    <p className="mt-3 font-semibold text-gray-800">
                      {user.username}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="mt-2 text-sm text-green-600 font-medium">
                      Reviewed {count} {count > 1 ? "times" : "time"}
                    </p>
                  </div>
                ))}
              </div>
            )}
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
