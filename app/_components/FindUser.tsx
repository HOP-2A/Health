"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
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
      const res = await fetch("/api/find-user", {
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
      const res = await fetch("/api/find-doctor", {
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
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl font-extrabold text-gray-300  mb-6 text-center tracking-tight drop-shadow-[0_2px_4px_rgba(0,150,80,0.25)]">
          xүн хайх
        </h2>
        <div
          className="relative group 
          backdrop-blur-xl bg-white/40 border border-white/60 
          shadow-[0_0_20px_rgba(0,255,120,0.15)]
          hover:shadow-[0_0_30px_rgba(0,255,120,0.3)]
          rounded-2xl p-5 transition-all duration-500"
        >
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-green-600 group-hover:text-green-700 transition-colors duration-300"
            size={30}
          />
          <input
            type="text"
            onChange={(e) => handleInputValue(e)}
            placeholder="Энд бичээд xүнээ хайгаарай..."
            className="
              pl-14 pr-4 py-3 w-full 
              bg-transparent text-gray-800 placeholder-gray-800 text-lg
              focus:outline-none 
              group-hover:placeholder-gray-400 
              transition-all duration-300
            "
          />{" "}
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-12">
          <div className="w-1/2 flex justify-center">
            <div className="h-[44vh] w-full max-w-[42vw] flex flex-col gap-4 overflow-y-auto justify-start mt-[50px]">
              <div className="mb-4">
                <h2 className="text-[34px] font-semibold text-white tracking-wide">
                  Users
                </h2>
                <div className="h-[3px] w-16 bg-green-400 rounded-full mt-1" />
              </div>

              {users.map((user) => (
                <Card
                  key={user.id}
                  className="backdrop-blur-xl bg-white/20 rounded-2xl border border-white/30 shadow-md hover:shadow-xl hover:bg-white/30 transition-all duration-300"
                >
                  <CardContent className="p-5">
                    <h3 className="text-[18px] font-semibold text-white">
                      {user.username}
                    </h3>
                    <span className="text-[20px] font-bold text-[#80FF9F]">
                      {user.email}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="w-1/2 flex justify-center">
            <div className="h-[44vh] w-full max-w-[42vw] flex flex-col gap-4 overflow-y-auto justify-start mt-[50px]">
              <div className="mb-4">
                <h2 className="text-[34px] font-semibold text-white tracking-wide">
                  Doctors
                </h2>
                <div className="h-[3px] w-16 bg-blue-400 rounded-full mt-1" />
              </div>

              {doctors.map((user) => (
                <Card
                  key={user.id}
                  className="backdrop-blur-xl bg-white/20 rounded-2xl border border-white/30 shadow-md hover:shadow-xl hover:bg-white/30 transition-all duration-300"
                >
                  <CardContent className="p-5">
                    <h3 className="text-[18px] font-semibold text-white">
                      {user.username}
                    </h3>
                    <span className="text-[20px] font-bold text-[#80FF9F]">
                      {user.email}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
