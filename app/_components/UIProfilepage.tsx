"use client";

import { UserProfile, useUser } from "@clerk/nextjs";
import { UserRound, Mail, Phone, Calendar, Edit, LogOut } from "lucide-react";
import { useState } from "react";

export default function UIProfilePage() {
  const { user } = useUser();
  const date = new Date("Tue Dec 09 2025 17:16:06 GMT+0800");
  const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  console.log(formatted);
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <div className="min-h-screen w-full flex justify-center p-8 ">
      <div
        className="
          w-full max-w-5xl h-[88vh] 
          backdrop-blur-xl bg-white/60 
          rounded-2xl shadow-[0_10px_40px_rgba(0,150,80,0.15)]
          flex overflow-hidden border border-green-200/40
        "
      >
        <div
          className="
            w-1/3 p-10 flex flex-col items-center text-center
            bg-green-50/70 
            bg-[radial-gradient(circle,rgba(0,80,40,0.10)_1px,transparent_1px)]
            bg-[length:14px_14px]
            border-r border-green-200/50
          "
        >
          <div className="p-4 rounded-full bg-white/90 shadow-md">
            <img
              src={user?.imageUrl}
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
              <Mail size={20} className="text-green-600" />{" "}
              {user?.emailAddresses[0].emailAddress}
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <Phone size={20} className="text-green-600" /> 99689696
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <Calendar size={20} className="text-green-600" /> Joined:
              {formatted}
            </p>
          </div>
        </div>

        <div className="w-2/3 p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-semibold mb-8 text-gray-800 tracking-tight">
              Profile Details
            </h3>

            <div className="space-y-6">
              <div
                className="
                  p-6 rounded-xl border border-green-200/40 bg-white/90 shadow-sm 
                  hover:shadow-[0_4px_20px_rgba(0,150,80,0.25)]
                  hover:scale-[1.02]
                  transition-all duration-300 cursor-pointer
                  bg-[radial-gradient(circle,rgba(0,80,40,0.06)_1px,transparent_1px)]
                  bg-[length:14px_14px]
                "
              >
                <h4 className="text-lg font-semibold text-gray-800">
                  Personal Information
                </h4>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  You can edit your personal details, contact information and
                  update your account settings anytime. Keeping your profile up
                  to date ensures a better medical assistance experience.
                </p>
              </div>

              <div
                className="
                  p-6 rounded-xl border border-green-200/40 bg-white/90 shadow-sm 
                  hover:shadow-[0_4px_20px_rgba(0,150,80,0.25)]
                  hover:scale-[1.02]
                  transition-all duration-300 cursor-pointer
                  bg-[radial-gradient(circle,rgba(0,80,40,0.06)_1px,transparent_1px)]
                  bg-[length:14px_14px]
                "
              >
                <h4 className="text-lg font-semibold text-gray-800">
                  Health Preferences
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  (Coming soon) Add allergies, preferred pharmacies, and your
                  medical history to receive more relevant suggestions.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-5 mt-10">
            <button
              className="flex-1 py-3 rounded-lg bg-green-600 text-white font-medium
                           flex items-center justify-center gap-3
                           hover:bg-green-500 hover:shadow-lg 
                           transition-transform duration-200 hover:scale-105"
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
