"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MenuBar from "@/app/_components/MenuBar";
import { Doctor as dType, useProvider } from "@/providers/AuthProvidor";
import { Shield, ShieldUser } from "lucide-react";
import { toast } from "sonner";
export default function Home() {
  const [doctors, setDoctors] = useState<dType[]>([]);
  const [dName, setDName] = useState("");
  const { user } = useProvider();
  useEffect(() => {
    const findDoc = async () => {
      const res = await fetch("/api/find-all-doctor");
      const doctors = await res.json();
      setDoctors(doctors);
    };
    findDoc();
  }, []);
  const [chat, setChat] = useState("");
  const createUserMessage = async (doctorName: string, chat: string) => {
    const res = await fetch(`/api/user-message/${user?.id}`, {
      method: "POST",
      body: JSON.stringify({
        doctorName,
        chat,
      }),
    });
    if (res.ok) {
      toast.success("Amjilttai");
    }
  };
  return (
    <div
      className="relative min-h-screen overflow-hidden w-[100vw] h-[100vh]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551970634-747846a548cb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <MenuBar />
      <div className="w-[100%] h-[100%] flex justify-center items-center flex-col pb-[200px]">
        <div className="flex gap-[30px]">
          {doctors.map((doc) => {
            return (
              <div
                key={doc.clerkId}
                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-green-500 hover:border-2 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <ShieldUser size={24} className="text-green-600" />
                </div>
                <p className="font-medium text-gray-900">{doc.username}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 w-full max-w-2xl bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Эмчид мессеж илгээх
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Эмчийн нэр
              </label>
              <input
                type="text"
                placeholder="Эмчийн нэр сонгох..."
                className="w-full border border-gray-300 rounded p-2 text-sm focus:border-green-500 focus:outline-none"
                onChange={(e) => setDName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Мессеж
              </label>
              <textarea
                placeholder="Таны мессеж..."
                className="w-full border border-gray-300 rounded p-2 text-sm min-h-[100px] focus:border-green-500 focus:outline-none resize-none"
                onChange={(e) => setChat(e.target.value)}
              />
            </div>
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 rounded transition-colors"
            onClick={() => createUserMessage(dName, chat)}
          >
            Илгээх
          </button>
        </div>
      </div>
    </div>
  );
}
