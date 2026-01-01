"use client";

import Footer from "@/app/_components/Footer";
import LikedDrugPage from "@/app/_components/LikedDrugCart";
import MenuBar from "@/app/_components/MenuBar";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div
      className="relative min-h-screen  overflow-hidden"
      
    >
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <MenuBar />

        <div>
          <LikedDrugPage />
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
