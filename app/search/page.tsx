"use client";

import SearchPageInput from "../_components/SearchPageInput";
import MenuBar from "../_components/MenuBar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import MedCard from "../_components/MedCard";

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
      className="relative min-h-screen overflow-hidden"
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
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <MenuBar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <SearchPageInput />
          </motion.div>
          <div className="w-[60vw] flex flex-wrap gap-10 mt-15 justify-center items-center ml-100">
            {medicines.map((med) => (
              <div key={med.id} className="  w-100">
                <MedCard med={med} />
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;
