"use client";

import { Mail, Phone, User, Clock, CircleUserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

  return (
    <div className="min-h-screen w-full flex justify-center p-8">
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
        border-r border-green-200/50
      "
        >
          <div className="p-4 rounded-full bg-white/90 shadow-md">
            {doctor?.profilePic ? (
              <img
                src={doctor.profilePic}
                className="w-24 h-24 rounded-full object-cover"
                alt="Doctor profile"
              />
            ) : (
              <User size={96} />
            )}
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-800">
            {doctor?.username}
          </h2>

          <p className="mt-2 text-sm text-green-700/70">
            Member since {formatted}
          </p>

          <div className="mt-10 w-full space-y-5 text-left text-sm">
            <p className="flex items-center gap-3 text-gray-700">
              <Mail size={22} className="text-green-600" />
              {doctor?.email}
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <Phone size={22} className="text-green-600" />
              {doctor?.phoneNumber}
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <Clock size={22} className="text-green-600" />
              {doctor?.experienceYears} Жил
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto bg-transparent">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Reviewed Users
          </h3>

          <div className="flex flex-wrap gap-6">
            {uniqueReviewedUsers.map(({ user, count }) => (
              <div
                key={user.email}
                className="
              w-full
              sm:w-[calc(50%-12px)]
              xl:w-[calc(33.333%-16px)]
              bg-white/90
              rounded-2xl
              p-6
              flex
              flex-col
              items-center
              justify-center
              shadow-md
              hover:shadow-lg
              transition
            "
              >
                <CircleUserRound size={64} className="text-green-500" />

                <div className="mt-4 font-semibold text-gray-800 text-lg">
                  {user.username}
                </div>

                <div className="mt-1 text-sm text-gray-500">{user.email}</div>

                <div className="mt-3 text-sm font-medium text-green-600">
                  Reviewed {count} {count === 1 ? "time" : "times"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
