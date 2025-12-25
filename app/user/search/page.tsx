"use client";

import MenuBar from "@/app/_components/MenuBar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import MedCard from "@/app/_components/MedCard";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@/providers/route";

type medicine = {
  id: string;
  name: string;
  description: string;
  ageLimit: string;
  price: number;
  stock: number;
  imageUrls: string[];
  expiryDate: string;
};

interface LikedItem {
  medicine: {
    id: string;
  };
}

const Page = () => {
  const pathname = usePathname();
  const [medicines, setMedicines] = useState<medicine[]>([]);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const { user: clerkUser } = useUser();

  const { loading, user } = useAuth(clerkUser?.id ?? "");

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };
  const findMecines = async () => {
    const res = await fetch("/api/find-med", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        input: input,
      }),
    });
    const meds: medicine[] = await res.json();
    setMedicines(meds);
  };

  useEffect(() => {
    const findMecines = async () => {
      const res = await fetch("/api/find-med", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          input: input,
        }),
      });
      const meds: medicine[] = await res.json();
      setMedicines(meds);
    };

    findMecines();
  }, [input]);

  useEffect(() => {
    if (!loading) {
      const fetchAll = async () => {
        if (user) {
          const likeRes = await fetch(`/api/liked-med?userId=${user.clerkId}`);
          const likes = await likeRes.json();

          setLikedItems(likes.map((l: LikedItem) => l.medicine.id));
        }
      };
      fetchAll();
    }
  }, [user, loading]);

  return (
    <div
      className="w-[100vw] h-[100%] flex flex-col gap-[100px]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551970634-747846a548cb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
          <div>
            <MenuBar />
          </div>
          <div>
            <div className="flex justify-center mt-20 px-4">
              <div className="w-full max-w-2xl">
                <h2 className="text-4xl font-extrabold text-gray-300  mb-6 text-center tracking-tight drop-shadow-[0_2px_4px_rgba(0,150,80,0.25)]">
                  Эм хайх
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
                    placeholder="Энд бичээд эмээ хайгаарай..."
                    className="
              pl-14 pr-4 py-3 w-full 
              bg-transparent text-gray-800 placeholder-gray-800 text-lg
              focus:outline-none 
              group-hover:placeholder-gray-400 
              transition-all duration-300
            "
                  />
                </div>

                <button
                  className="
            mt-6 w-full py-3 text-lg font-semibold rounded-xl
            bg-gradient-to-br from-green-500 to-green-700 text-white
            shadow-[0_4px_12px_rgba(0,150,80,0.35)]
            hover:shadow-[0_0_20px_rgba(0,255,120,0.5)]
            hover:scale-[1.02] active:scale-[0.97]
            transition-all duration-300
          "
                  onClick={() => findMecines()}
                >
                  Хайх
                </button>
              </div>
            </div>
          </div>
          <div className="w-[100%] flex justify-center">
            <div className="h-[80vh] w-[70vw] flex flex-wrap gap-[50px] overflow-scroll  justify-center mt-[50px]">
              {medicines.map((med) => {
                return (
                  <div key={med.id}>
                    <MedCard
                      med={med}
                      userId={user?.id || ""}
                      userClerckId={user?.clerkId || ""}
                      isLiked={likedItems.includes(med.id)}
                      onLikeChange={(id: string, liked: boolean) => {
                        setLikedItems((prev) =>
                          liked
                            ? [...prev, id]
                            : prev.filter((item) => item !== id)
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;
