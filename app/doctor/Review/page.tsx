"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import DoctorMenuBar from "../../_components/DoctorMenuBar";
import { useEffect, useState } from "react";
import { useProvider } from "@/providers/AuthProvidor";
import { User as userType } from "@/providers/AuthProvidor";
import { CircleUser } from "lucide-react";
export type reviews = {
  id: string;
  doctorId: string;
  illnessId: string;
  userId: string;
  notes: string;
  user: userType;
};
export type illness = {
  id: string;
  userId: string;
  details: string;
  name: string;
  category: string;
};
export type message = {
  id: string;
  userId: string;
  illnessId: string;
  chat: string;
  user: userType;
  illness: illness;
};
export default function Page() {
  const pathname = usePathname();
  const { doctor } = useProvider();
  const [doctorReviews, setDoctorReviews] = useState<message[]>([]);
  useEffect(() => {
    if (doctor == null) return;
    const findReviews = async () => {
      const res = await fetch(`/api/usermessage-doc/${doctor?.id}`);
      const revs = await res.json();
      setDoctorReviews(revs);
    };
    findReviews();
  }, [doctor]);
  return (
    <div
      className="relative min-h-screen  overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1488330890490-c291ecf62571?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 "
        >
          <DoctorMenuBar />
          <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="w-[80%] h-[80%] flex overflow-scroll flex-wrap gap-[50px] justify-around">
              {doctorReviews.map((rev, index) => (
                <div
                  key={index}
                  className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden max-w-md"
                >
                  {/* Header - User Info */}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-white rounded-full p-1.5">
                        <CircleUser size={28} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white">
                          {rev.user.username}
                        </h3>
                        <p className="text-green-100 text-xs">Өвчтөн</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    {/* Illness Info */}
                    <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r">
                      <p className="font-semibold text-red-900 text-sm mb-1">
                        Өвчний нэр: {rev.illness.name}
                      </p>
                      <p className="text-red-700 text-xs">
                        {rev.illness.details}
                      </p>
                    </div>

                    {/* User Chat */}
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-semibold text-gray-700 text-sm mb-1">
                        Өвчтөний мессеж:
                      </p>
                      <p className="text-gray-600 text-xs italic">{rev.chat}</p>
                    </div>

                    {/* Advice Section */}
                    <div>
                      <label className="block font-semibold text-gray-700 text-sm mb-2">
                        Таны мэргэжлийн зөвлөгөө:
                      </label>
                      <textarea
                        placeholder="Өвчтөнд зориулсан зөвлөгөө бичнэ үү..."
                        className="w-full border-2 border-gray-200 rounded p-2 text-sm min-h-[80px] focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none resize-none"
                      />
                      <button className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded text-sm transition-colors duration-200">
                        Зөвлөгөө илгээх
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
