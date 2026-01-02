"use client";

import { motion } from "framer-motion";
import MenuBar from "@/app/_components/MenuBar";

import DynamicUserPage from "@/app/_components/DynamicUserPage";
import { useParams } from "next/navigation";
import DoctorMenuBar from "@/app/_components/DoctorMenuBar";
import Footer from "@/app/_components/Footer";

const Page = () => {
  const { clerkId } = useParams<{ clerkId: string }>();
  return (
    <div className="relative min-h-screen  overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <DoctorMenuBar />

        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <DynamicUserPage clerkId={clerkId} />
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Page;
