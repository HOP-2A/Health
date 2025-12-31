"use client";

import Footer from "@/app/_components/Footer";
import LikedDrugPage from "@/app/_components/LikedDrugCart";
import MenuBar from "@/app/_components/MenuBar";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div
      className="relative min-h-screen  overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551970634-747846a548cb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
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
