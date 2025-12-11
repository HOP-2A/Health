"use client";

import SearchPageInput from "../_components/SearchPageInput";
import MenuBar from "../_components/MenuBar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
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
const Page = () => {
  const pathname = usePathname();
  const [medicines, setMedicines] = useState<medicine[]>([]);
  const [input, setInput] = useState("");
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
<<<<<<< HEAD
    const fetchData = async () => {
      try {
        const res = await fetch("/api/add-medicine");
        if (!res.ok) throw new Error("Failed to fetch medicines");
        const data = await res.json();
        setMedicines(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
=======
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
>>>>>>> f933012 (P)
  return (
    <div
      className="w-[100vw] h-[100vh] flex flex-col gap-[100px]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551970634-086c4065fa85?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
                  Search for Medicines
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
                    placeholder="Search medicines, drugs, symptoms..."
                    className="
              pl-14 pr-4 py-3 w-full 
              bg-transparent text-gray-800 placeholder-gray-500 text-lg
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
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="w-[100%] flex justify-center">
            <div className="h-[60vh] w-[70vw] flex flex-wrap gap-[50px] overflow-scroll  justify-center mt-[50px]">
              {medicines.map((med) => {
                return (
                  <div
                    key={med.id}
                    className="w-[420px] bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl"
                  >
                    <div className="w-full h-56 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
                      <img
                        src={med.imageUrls[0]}
                        alt={med.name}
                        className="h-full object-contain"
                      />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {med.name}
                    </h2>

                    <p className="text-green-500 font-bold text-2xl">
                      {med.price.toLocaleString()}₮
                    </p>
                    <div className="mt-2">
                      <p className="text-gray-600 font-medium mb-2">
                        Stock:{med.stock}
                      </p>

                      <div className="flex items-center gap-2 bg-gray-100 rounded-full w-[150px] px-4 py-2">
                        <button className="text-2xl text-gray-700">−</button>
                        <span className="flex-1 text-center text-lg font-semibold">
                          1
                        </span>
                        <button className="text-2xl text-gray-700">+</button>
                      </div>
                    </div>
                    <button className="mt-4 w-full bg-green-500 text-white font-semibold text-xl py-3 rounded-2xl hover:bg-green-600 transition">
                      Захиалах
                    </button>
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
