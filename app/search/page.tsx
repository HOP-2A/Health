"use client";

import SearchPageInput from "../_components/SearchPageInput";
import MenuBar from "../_components/MenuBar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const Page = () => {
  interface Medicine {
    id: string;
    name: string;
    description: string;
    ageLimit: string;
    price: number;
    stock: number;
    imageUrls: string[];
    expiryDate: string;
  }
  const pathname = usePathname();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchMedicines = async () => {
    const res = await fetch("/api/add-medicine");
    if (!res.ok) return;
    const data = await res.json();
    setMedicines(data);
  };
  useEffect(() => {
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
            <SearchPageInput />
          </div>
          <div className="w-[100vw] flex justify-center">
            <div className="h-[60vh] w-[60vw] flex flex-wrap gap-[50px] overflow-scroll   mt-[50px]">
              {medicines.map((med) => {
                return (
                  <div
                    key={med.id}
                    className="w-[400px] h-[400px] rounded-2xl bg-white shadow-lg overflow-hidden flex flex-col items-center p-4 hover:shadow-2xl transition-shadow duration-300 "
                  >
                    <img
                      src={med.imageUrls[0]}
                      alt={med.name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 text-center">
                      {med.name}
                    </h2>
                    <p className="text-gray-500 text-sm text-center mt-2 line-clamp-3">
                      {med.description}
                    </p>
                    <div className="mt-auto w-full flex justify-between text-gray-700 font-medium text-sm">
                      <span>Price: ${med.price}</span>
                      <span>Stock: {med.stock}</span>
                    </div>
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
