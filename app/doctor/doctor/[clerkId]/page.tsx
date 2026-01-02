"use client";

import { motion } from "framer-motion";
import MenuBar from "@/app/_components/MenuBar";

import { useParams } from "next/navigation";
import DynamicDoctorPage from "@/app/_components/DynamicDoctorpage";
import DoctorMenuBar from "@/app/_components/DoctorMenuBar";

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
            <DynamicDoctorPage clerkId={clerkId} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
