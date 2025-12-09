"use client";

import { AnimatePresence, motion } from "framer-motion";
import CallDrug from "./_components/CallDrug";
import DescribeUrIllness from "./_components/DescribeUrIllness";
import MenuBar from "./_components/MenuBar";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  return (
    <div
      className="relative min-h-screen  overflow-hidden"
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
          <MenuBar />

          <div className="flex justify-center mt-46 px-4">
            <DescribeUrIllness />
          </div>
          <CallDrug />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
<div
  key={med.id}
  className="w-[400px] h-[400px] rounded-2xl bg-white shadow-lg overflow-hidden flex flex-col items-center p-4 hover:shadow-2xl transition-shadow duration-300"
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
</div>;