"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import DoctorMenuBar from "../../_components/DoctorMenuBar";
import { useEffect, useState } from "react";
import { useProvider } from "@/providers/AuthProvidor";
import { User as userType } from "@/providers/AuthProvidor";
import { CircleUser, Send } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/app/_components/Footer";

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
  illness: illness | null;
  replied: boolean;
};

export default function Page() {
  const pathname = usePathname();
  const { doctor } = useProvider();
  const [doctorReviews, setDoctorReviews] = useState<message[]>([]);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [reviews, setReviews] = useState<message[]>([]);
  const createDoctorReview = async (
    illnessId: string,
    userId: string,
    notes: string,
    userMessageId: string
  ) => {
    if (notes === "") {
      toast.error("Зөвөлгөө бичнэ үү!", {
        style: {
          background: "rgba(239,68,68,0.95)",
          color: "#fef2f2",
          borderRadius: "10px",
        },
      });
      return;
    }
    const doctorReview = await fetch(`/api/doctor-review/${doctor?.id}`, {
      method: "POST",
      body: JSON.stringify({
        illnessId,
        userId,
        notes,
        messageId: userMessageId,
      }),
    });
    if (doctorReview.ok) {
      findReviews();
      setNotes((prev) => ({ ...prev, [userMessageId]: "" }));
      toast.success("Амжилттай зөвөлгөө бичлээ.");
    }
  };

  const findReviews = async () => {
    const res = await fetch(`/api/usermessage-doc/${doctor?.id}`);
    const revs = await res.json();
    setDoctorReviews(revs);
  };

  useEffect(() => {
    if (doctor == null) return;
    const findReviews = async () => {
      const res = await fetch(`/api/usermessage-doc/${doctor?.id}`);
      const revs = await res.json();
      setDoctorReviews(revs);
    };
    findReviews();
  }, [doctor]);
  useEffect(() => {
    const revs = () => {
      const revs = doctorReviews.filter((rev) => {
        return rev.replied === false;
      });
      setReviews(revs);
    };
    revs();
  }, [doctorReviews]);
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10"
        >
          <DoctorMenuBar />
          <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="w-[90%] h-[80%] flex overflow-scroll flex-wrap gap-[50px] justify-around justify-center items-center">
              {reviews.length === 0 ? (
                <div className="text-white  font-medium text-4xl mb-[150px]">
                  No messages yet
                </div>
              ) : (
                <div className="w-[100%] h-[80%] flex overflow-scroll flex-wrap gap-[50px] justify-around justify-center items-center">
                  {reviews.map((rev, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-md space-y-4 h-fit"
                      >
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                            <CircleUser size={20} className="text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {rev.user.username}
                            </h3>
                            <p className="text-sm text-gray-500">Өвчтөн</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                              Өвчин
                            </p>
                            <p className="font-medium text-gray-900">
                              {rev.illness?.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                              Дэлгэрэнгүй
                            </p>
                            <p className="text-sm text-gray-700">
                              {rev.illness?.details}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                              Хэрэглэгчийн чат
                            </p>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                              {rev.chat}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 pt-2">
                          <textarea
                            placeholder="Зөвлөгөө бичих..."
                            value={notes[rev.id] || ""}
                            onChange={(e) =>
                              setNotes((prev) => ({
                                ...prev,
                                [rev.id]: e.target.value,
                              }))
                            }
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm min-h-[80px] focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none resize-none"
                          />
                          <button
                            className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                            onClick={() =>
                              createDoctorReview(
                                rev.illnessId,
                                rev.userId,
                                notes[rev.id] || "",
                                rev.id
                              )
                            }
                          >
                            <Send size={16} />
                            Илгээх
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
