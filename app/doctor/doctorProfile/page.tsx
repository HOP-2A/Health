"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import DoctorMenuBar from "@/app/_components/DoctorMenuBar";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import UIProfilePage from "@/app/_components/DoctorProfile";
<<<<<<< HEAD
import Footer from "@/app/_components/Footer";
=======
=======
import DoctorProfile from "../../_components/DoctorProfile";
>>>>>>> 3fba245 (d)
<<<<<<< HEAD
>>>>>>> e457fac (D)
=======
=======

>>>>>>> 5f95440 (d)
>>>>>>> c7aab63 (d)
=======
import DoctorProfile from "../../_components/DoctorProfile";
>>>>>>> 89e9c1b (f)
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
          <DoctorProfile />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
