"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import DoctorMenuBar from "@/app/_components/DoctorMenuBar";

import UIProfilePage from "@/app/_components/DoctorProfile";
import Footer from "@/app/_components/Footer";
export default function Page() {
  const pathname = usePathname();
  return (
    <div className="relative min-h-screen  overflow-hidden">
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

          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <UIProfilePage />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
