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
