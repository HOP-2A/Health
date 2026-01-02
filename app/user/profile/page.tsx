"use client";

import { motion } from "framer-motion";
import MenuBar from "@/app/_components/MenuBar";
import UIProfilePage from "@/app/_components/UIProfilepage";
import Footer from "@/app/_components/Footer";

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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <UIProfilePage />
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
