"use client";

import { AnimatePresence, motion } from "framer-motion";
import DescribeUrIllness from "./_components/DescribeUrIllness";
import MenuBar from "./_components/MenuBar";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="min-h-screen bg-gray-100 animate-fadeIn">
            <MenuBar />
            <DescribeUrIllness />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
