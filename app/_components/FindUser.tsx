"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail, Search, Stethoscope, User, Users, UserX, X } from "lucide-react";
import Link from "next/link";

import { ChangeEvent, useEffect, useState } from "react";

type user = {
  id: string;
  username: string;
  email: string;
  clerkId: string;
};
type doctor = {
  id: string;
  username: string;
  email: string;
  clerkId: string;
};

export default function FindUser() {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState<user[]>([]);
  const [doctors, setDoctors] = useState<doctor[]>([]);

  useEffect(() => {
    const findUsers = async () => {
      const res = await fetch("/api/find-post-user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          input: input,
        }),
      });
      const user: user[] = await res.json();
      setUsers(user);
    };

    findUsers();
  }, [input]);
  useEffect(() => {
    const findDoctors = async () => {
      const res = await fetch("/api/find-all-doctor", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          input: input,
        }),
      });
      const doctor: doctor[] = await res.json();
      setDoctors(doctor);
    };

    findDoctors();
  }, [input]);

  return (
    <div className="flex justify-center mt-20 px-4">
      <div className="w-full max-w-6xl">
        <h2 className="text-4xl font-extrabold text-green-900 mb-10 text-center tracking-tight drop-shadow-md">
          Хүн хайх
        </h2>

        <div className="relative max-w-2xl mx-auto bg-white/80 border border-green-300/60 rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,150,90,0.25)] focus-within:shadow-[0_15px_55px_rgba(0,150,90,0.4)] transition-all duration-500">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-green-700"
            size={26}
          />

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Нэр эсвэл имэйл бичнэ үү..."
            className="pl-14 pr-14 py-3 w-full bg-transparent text-green-900 placeholder-green-600 text-lg focus:outline-none"
          />

          {input && (
            <button
              onClick={() => setInput("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-green-500 hover:text-red-500 transition"
            >
              <X size={22} />
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-10 mt-14">
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-3 mb-3">
              <Users className="text-green-600" size={30} />
              <h2 className="text-[30px] font-semibold text-green-900">
                Users
              </h2>
              <span className="px-3 py-1 text-sm rounded-full bg-green-500/20 text-green-700">
                {users.length}
              </span>
            </div>
            <div className="h-[4px] w-20 bg-green-500 rounded-full mb-6" />

            <div className="h-[44vh] overflow-y-auto flex flex-col gap-4 pr-2">
              {users.length === 0 && input && (
                <div className="flex flex-col items-center justify-center text-green-700 mt-10 gap-3">
                  <UserX size={42} className="opacity-70" />
                  <p className="text-sm">Илэрц олдсонгүй</p>
                </div>
              )}

              {users.map((user) => (
                <Link href={`/doctor/user/${user.clerkId}`} key={user.id}>
                  <Card className="group bg-white/90 rounded-2xl border border-green-300/40 shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                        <User className="text-green-700 group-hover:scale-110 transition" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-[18px] font-semibold text-green-900">
                          {user.username}
                        </h3>
                        <div className="flex items-center gap-1 text-green-700 text-sm">
                          <Mail size={16} />
                          {user.email}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-3 mb-3">
              <Stethoscope className="text-emerald-600" size={30} />
              <h2 className="text-[30px] font-semibold text-green-900">
                Doctors
              </h2>
              <span className="px-3 py-1 text-sm rounded-full bg-emerald-500/20 text-emerald-700">
                {doctors.length}
              </span>
            </div>
            <div className="h-[4px] w-20 bg-emerald-500 rounded-full mb-6" />

            <div className="h-[44vh] overflow-y-auto flex flex-col gap-4 pr-2">
              {doctors.length === 0 && input && (
                <div className="flex flex-col items-center justify-center text-green-700 mt-10 gap-3">
                  <UserX size={42} className="opacity-70" />
                  <p className="text-sm">Илэрц олдсонгүй</p>
                </div>
              )}

              {doctors.map((doctor) => (
                <Link href={`/doctor/doctor/${doctor.clerkId}`} key={doctor.id}>
                  <Card className="group bg-white/90 rounded-2xl border border-emerald-300/40 shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Stethoscope className="text-emerald-700 group-hover:scale-110 transition" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-[18px] font-semibold text-green-900">
                          {doctor.username}
                        </h3>
                        <div className="flex items-center gap-1 text-green-700 text-sm">
                          <Mail size={16} />
                          {doctor.email}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
