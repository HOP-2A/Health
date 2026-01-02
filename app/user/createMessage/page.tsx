"use client";

import { useEffect, useState } from "react";
import MenuBar from "@/app/_components/MenuBar";
import { Doctor as dType, useProvider } from "@/providers/AuthProvidor";
import { ShieldUser } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/app/_components/Footer";
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
    if (chat === "") {
      toast.error("Мессеж бичнэ үү!", {
        style: {
          background: "rgba(239,68,68,0.95)",
          color: "#fef2f2",
          borderRadius: "10px",
        },
      });
      return;
    }
    const res = await fetch(`/api/user-message/${user?.id}`, {
      method: "POST",
      body: JSON.stringify({
        doctorName,
        chat,
      }),
    });
    if (res.ok) {
      toast.success("Амжилттай");
    } else {
      toast.error("Алдаа гарлаа", {
        style: {
          background: "rgba(239,68,68,0.95)",
          color: "#fef2f2",
          borderRadius: "10px",
        },
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden w-[100vw] h-[100vh]">
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
            <div className="space-y-1">
              <label className="text-sm font-medium text-green-700">
                Эмчийн нэр
              </label>

              <select
                onChange={(e) => setDName(e.target.value)}
                className="w-full rounded-md border border-green-300 bg-white px-3 py-2 text-sm text-gray-800
               focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400
               transition"
              >
                <option value="">Эмч сонгох</option>

                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.username}>
                    {doc.username}
                  </option>
                ))}
              </select>
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
      <Footer />
    </div>
  );
}
