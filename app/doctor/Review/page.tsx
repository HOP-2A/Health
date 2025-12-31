"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import DoctorMenuBar from "../../_components/DoctorMenuBar";
import { useEffect, useState } from "react";
import { useProvider } from "@/providers/AuthProvidor";
import { User as userType } from "@/providers/AuthProvidor";
import { CircleUser } from "lucide-react";
import { toast } from "sonner";
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
  replied: boolean;
};
export default function Page() {
  const pathname = usePathname();
  const { doctor } = useProvider();
  const [doctorReviews, setDoctorReviews] = useState<message[]>([]);
  const createDoctorReview = async (
    illnessId: string,
    userId: string,
    notes: string,
    userMessageId: string
  ) => {
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
  const [note, setNote] = useState("");
  console.log(note);
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
              {doctorReviews.map((rev, index) => {
                if (rev.replied == true) {
                  return <div key={index}></div>;
                } else {
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-lg border border-gray-200 p-4 max-w-md space-y-4 h-[400px]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                          <CircleUser size={20} className="text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {rev.user.username}
                          </h3>
                          <p className="text-sm text-gray-500">Өвчтөн</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {rev.illness.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {rev.illness.details}
                          </p>
                        </div>

                        <p className="text-sm text-gray-700 italic">
                          Хэрэглэгчийн чат: {rev.chat}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <textarea
                          placeholder="Зөвлөгөө бичих..."
                          className="w-full border border-gray-300 rounded p-2 text-sm min-h-[80px] focus:border-green-500 focus:outline-none resize-none"
                          onChange={(e) => setNote(e.target.value)}
                        />
                        <button
                          className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded transition-colors"
                          onClick={() =>
                            createDoctorReview(
                              rev.illnessId,
                              rev.userId,
                              note,
                              rev.id
                            )
                          }
                        >
                          Илгээх
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
