"use client";

import { useEffect, useState } from "react";
import MenuBar from "@/app/_components/MenuBar";
import { Doctor as dType, useProvider } from "@/providers/AuthProvidor";
import { ShieldUser, Send, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/app/_components/Footer";

export default function Home() {
  const [doctors, setDoctors] = useState<dType[]>([]);
  const [dName, setDName] = useState("");
  const { user } = useProvider();
  const [selectedDoctor, setSelectedDoctor] = useState<dType | null>(null);

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
      setChat("");
      setDName("");
      setSelectedDoctor(null);
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

  const handleDoctorClick = (doc: dType) => {
    setSelectedDoctor(doc);
    setDName(doc.username);
  };
  return (
    <div className="relative   w-full flex flex-col">
      <div className="h-16">
        <MenuBar />
      </div>

      <div className="flex-1 w-full flex justify-center items-center px-4 py-12 pt-[100px]">
        <div className="w-full max-w-6xl space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 justify-center">
              <Stethoscope className="w-7 h-7 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-800">Эмч нар</h2>
            </div>

            <div className="relative">
              <div
                className="flex gap-6 overflow-x-auto pb-6 px-2 snap-x snap-mandatory scroll-smooth pt-[10px]"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {doctors.map((doc) => (
                  <div
                    key={doc.clerkId}
                    onClick={() => handleDoctorClick(doc)}
                    className={`min-w-[240px] snap-center cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      selectedDoctor?.id === doc.id
                        ? "ring-4 ring-green-500 shadow-2xl"
                        : "hover:shadow-xl"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 border-2 border-green-100 h-full">
                      <div className="flex flex-col items-center gap-4">
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                            selectedDoctor?.id === doc.id
                              ? "bg-green-600"
                              : "bg-gradient-to-br from-green-100 to-green-50"
                          }`}
                        >
                          <ShieldUser
                            size={40}
                            className={
                              selectedDoctor?.id === doc.id
                                ? "text-white"
                                : "text-green-600"
                            }
                          />
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-gray-900 text-lg">
                            {doc.username}
                          </p>
                          {selectedDoctor?.id === doc.id && (
                            <p className="text-xs text-green-600 font-medium mt-1">
                              Сонгогдсон
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border-t-4 border-green-500 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Send className="w-6 h-6" />
                Эмчид мессеж илгээх
              </h3>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <ShieldUser className="w-4 h-4 text-green-600" />
                  Эмчийн нэр
                </label>
                <select
                  value={dName}
                  onChange={(e) => {
                    setDName(e.target.value);
                    const doc = doctors.find(
                      (d) => d.username === e.target.value
                    );
                    setSelectedDoctor(doc || null);
                  }}
                  className="w-full rounded-xl border-2 border-green-200 bg-white px-4 py-3.5 text-gray-800
                    focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500
                    transition-all shadow-sm hover:border-green-300 text-base"
                >
                  <option value="">Эмч сонгох</option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.username}>
                      {doc.username}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Send className="w-4 h-4 text-green-600" />
                  Мессеж
                </label>
                <textarea
                  placeholder="Өөрийн мессежээ энд бичнэ үү..."
                  value={chat}
                  className="w-full border-2 border-green-200 rounded-xl p-4 text-base min-h-[140px] 
                    focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-200 
                    resize-none transition-all shadow-sm hover:border-green-300"
                  onChange={(e) => setChat(e.target.value)}
                />
              </div>

              <button
                onClick={() => createUserMessage(dName, chat)}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 
                  hover:to-green-800 text-white text-base font-semibold py-4 rounded-xl 
                  transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                  active:translate-y-0 flex items-center justify-center gap-2 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Илгээх
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20">
        <Footer />
      </div>
    </div>
  );
}
