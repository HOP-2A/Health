"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import DoctorMenuBar from "@/app/_components/DoctorMenuBar";
<<<<<<< HEAD
import UIProfilePage from "@/app/_components/DoctorProfile";
<<<<<<< HEAD
import Footer from "@/app/_components/Footer";
=======
=======
import DoctorProfile from "../../_components/DoctorProfile";
>>>>>>> 3fba245 (d)
>>>>>>> e457fac (D)
export default function Page() {
  const pathname = usePathname();
  return (
    <div
      className="relative min-h-screen  overflow-hidden"
      
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
          <DoctorMenuBar />
<<<<<<< HEAD
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <UIProfilePage />
            </motion.div>
          </div>
=======
          <DoctorProfile />
>>>>>>> 3fba245 (d)
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
