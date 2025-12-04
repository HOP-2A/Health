"use client";

import SearchPageInput from "../_components/SearchPageInput";
import MenuBar from "../_components/MenuBar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();

  return (
    <div
      className="relative min-h-screen  overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551970634-086c4065fa85?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <MenuBar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <SearchPageInput />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;
