"use client";
import Footer from "@/app/_components/Footer";
import MenuBar from "@/app/_components/MenuBar";
import { useEffect, useState } from "react";
import { reviews } from "@/app/doctor/Review/page";
import { useProvider } from "@/providers/AuthProvidor";
import { Delete } from "lucide-react";
import { toast } from "sonner";
export default function Home() {
  const { user } = useProvider();
  const [replies, setReplies] = useState<reviews[]>([]);
  const findReplies = async () => {
    const res = await fetch(`/api/user-message/${user?.id}`);
    const reps = await res.json();
    setReplies(reps);
  };
  useEffect(() => {
    if (user === null) return;
    const findReplies = async () => {
      const res = await fetch(`/api/user-message/${user?.id}`);
      const reps = await res.json();
      setReplies(reps);
    };
    findReplies();
  }, [user]);
  const deleteRep = async (id: string) => {
    const res = await fetch(`/api/user-message/${user?.id}`, {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
    });
    if (res.ok) {
      findReplies();
      toast.success("Устгагдсан");
    }
  };
  console.log(replies);
  return (
    <div className=" relative overflow-hidden flex flex-col w-[100vw] justify-center">
      <MenuBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[70vh] w-[90vw] justify-center items-center overflow-scroll p-[100px]">
        {replies.length === 0 ? (
          <div className="text-white  font-medium text-5xl">
            Одоогоор хариу алга
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   w-[80vw] gap-[50px]">
            {replies.map((rep) => (
              <div
                key={rep.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                  <p className="text-white text-sm font-medium mb-3 opacity-90">
                    Эмч
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={rep.doctor.profilePic}
                      alt={rep.doctor.username}
                      className="w-14 h-14 rounded-full border-3 border-white shadow-md"
                    />
                    <div>
                      <p className="text-white font-semibold text-lg">
                        {rep.doctor.username}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">Имэйл</p>
                      <p className="text-sm text-gray-700 truncate">
                        {rep.doctor.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">Утас</p>
                      <p className="text-sm text-gray-700">
                        {rep.doctor.phoneNumber}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium mb-2">
                          Зөвөлгөө
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {rep.notes}
                        </p>
                      </div>
                      <div className="flex justify-center items-center h-[60px]">
                        <Delete size={30} onClick={() => deleteRep(rep.id)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
