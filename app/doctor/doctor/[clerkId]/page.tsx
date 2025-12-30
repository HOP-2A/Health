"use client";

import { motion } from "framer-motion";
import MenuBar from "@/app/_components/MenuBar";

import { useParams } from "next/navigation";
import DynamicDoctorPage from "@/app/_components/DynamicDoctorpage";
import DoctorMenuBar from "@/app/_components/DoctorMenuBar";

const Page = () => {
  const { clerkId } = useParams<{ clerkId: string }>();
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
