"use client";

import SearchPageInput from "../_components/SearchPageInput";
import MenuBar from "../_components/MenuBar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

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
    // Define an async function inside useEffect
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

    fetchData(); // Call the async function
  }, []); // Empty dependency array means it runs once on mount
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {medicines.map((med) => (
              <Card key={med.id} className="shadow-lg border border-gray-200">
                <CardContent>
                  <h2 className="text-xl font-bold text-gray-800">
                    {med.name}
                  </h2>
                  <p className="text-gray-600">{med.description}</p>

                  <div className="mt-2 text-sm text-gray-500 space-y-1">
                    <p>Age Limit: {med.ageLimit}</p>
                    <p>Price: ${med.price}</p>
                    <p>Stock: {med.stock}</p>
                    <p>
                      Expiry: {new Date(med.expiryDate).toLocaleDateString()}
                    </p>
                  </div>

                  {med.imageUrls.length > 0 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                      {med.imageUrls.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={med.name}
                          className="w-24 h-24 object-cover rounded border border-gray-300"
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;
