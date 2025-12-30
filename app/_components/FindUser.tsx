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
  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };

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
    <div className="flex justify-center mt-20 px-1">
      <div className="w-full max-w-6xl">
        <h2 className="text-4xl font-extrabold text-gray-200 mb-10 text-center tracking-tight drop-shadow-[0_2px_6px_rgba(0,150,80,0.25)]">
          Хүн хайх
        </h2>

        <div className="relative max-w-2xl mx-auto backdrop-blur-xl bg-white/40 border border-white/60 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,255,120,0.15)] focus-within:shadow-[0_0_35px_rgba(0,255,120,0.45)] transition-all duration-500">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-green-600"
            size={26}
          />

          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleInputValue(e);
            }}
            placeholder="Нэр эсвэл имэйл бичнэ үү..."
            className="pl-14 pr-14 py-3 w-full bg-transparent text-gray-900 placeholder-gray-600 text-lg focus:outline-none"
          />

          {input && (
            <button
              onClick={() => setInput("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition"
            >
              <X size={22} />
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-10 mt-10">
          {/* USERS */}
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-3 mb-3">
              <Users className="text-green-400" size={30} />
              <h2 className="text-[30px] font-semibold text-white">Users</h2>
              <span className="px-3 py-1 text-sm rounded-full bg-green-400/20 text-green-300">
                {users.length}
              </span>
            </div>
            <div className="h-[3px] w-16 bg-green-400 rounded-full mb-6" />

            <div className="h-[44vh] overflow-y-auto flex flex-col gap-4 pr-2">
              {users.length === 0 && input && (
                <div className="flex flex-col items-center justify-center text-gray-300 mt-10 gap-3">
                  <UserX size={42} className="opacity-70" />
                  <p className="text-sm">Илэрц олдсонгүй</p>
                </div>
              )}

              {users.map((user) => (
                <Link href={`/doctor/user/${user.clerkId}`} key={user.id}>
                  <Card className="group backdrop-blur-xl bg-white/20 rounded-2xl border border-white/30 shadow-md hover:shadow-2xl hover:bg-white/30 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-green-400/20 flex items-center justify-center">
                        <User className="text-green-400 group-hover:scale-110 transition" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-[18px] font-semibold text-white">
                          {user.username
                            .split(
                              new RegExp(
                                `(${input.replace(
                                  /[.*+?^${}()|[\]\\]/g,
                                  "\\$&"
                                )})`,
                                "gi"
                              )
                            )
                            .map((part, i) =>
                              part.toLowerCase() === input.toLowerCase() &&
                              input ? (
                                <span
                                  key={i}
                                  className="bg-yellow-400/40 rounded-sm px-[1px]"
                                >
                                  {part}
                                </span>
                              ) : (
                                part
                              )
                            )}
                        </h3>
                        <div className="flex items-center ml-1 text-[#80FF9F] text-sm">
                          <Mail size={16} />

                          {user.email
                            .split(
                              new RegExp(
                                `(${input.replace(
                                  /[.*+?^${}()|[\]\\]/g,
                                  "\\$&"
                                )})`,
                                "gi"
                              )
                            )
                            .map((part, i) =>
                              part.toLowerCase() === input.toLowerCase() &&
                              input ? (
                                <span
                                  key={i}
                                  className="bg-yellow-400/40 rounded-sm px-[1px]"
                                >
                                  {part}
                                </span>
                              ) : (
                                part
                              )
                            )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* DOCTORS */}
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-3 mb-3">
              <Stethoscope className="text-blue-400" size={30} />
              <h2 className="text-[30px] font-semibold text-white">Doctors</h2>
              <span className="px-3 py-1 text-sm rounded-full bg-blue-400/20 text-blue-300">
                {doctors.length}
              </span>
            </div>
            <div className="h-[3px] w-16 bg-blue-400 rounded-full mb-6" />

            <div className="h-[44vh] overflow-y-auto flex flex-col gap-4 pr-2">
              {doctors.length === 0 && input && (
                <div className="flex flex-col items-center justify-center text-gray-300 mt-10 gap-3">
                  <UserX size={42} className="opacity-70" />
                  <p className="text-sm">Илэрц олдсонгүй</p>
                </div>
              )}

              {doctors.map((doctor) => (
                <Link href={`/doctor/doctor/${doctor.clerkId}`} key={doctor.id}>
                  <Card className="group backdrop-blur-xl bg-white/20 rounded-2xl border border-white/30 shadow-md hover:shadow-2xl hover:bg-white/30 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-400/20 flex items-center justify-center">
                        <Stethoscope className="text-blue-400 group-hover:scale-110 transition" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-[18px] font-semibold text-white">
                          {doctor.username
                            .split(
                              new RegExp(
                                `(${input.replace(
                                  /[.*+?^${}()|[\]\\]/g,
                                  "\\$&"
                                )})`,
                                "gi"
                              )
                            )
                            .map((part, i) =>
                              part.toLowerCase() === input.toLowerCase() &&
                              input ? (
                                <span
                                  key={i}
                                  className="bg-yellow-400/40 rounded-sm px-[1px]"
                                >
                                  {part}
                                </span>
                              ) : (
                                part
                              )
                            )}
                        </h3>
                        <div className="ml-1 flex items-center  text-[#80FF9F] text-sm">
                          <Mail size={16} />
                          {doctor.email
                            .split(
                              new RegExp(
                                `(${input.replace(
                                  /[.*+?^${}()|[\]\\]/g,
                                  "\\$&"
                                )})`,
                                "gi"
                              )
                            )
                            .map((part, i) =>
                              part.toLowerCase() === input.toLowerCase() &&
                              input ? (
                                <span
                                  key={i}
                                  className="bg-yellow-400/40 rounded-sm "
                                >
                                  {part}
                                </span>
                              ) : (
                                part
                              )
                            )}
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
