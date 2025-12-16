import { AnimatePresence, motion } from "framer-motion";
import CallDrug from "../_components/CallDrug";
import MenuBar from "../_components/MenuBar";
import DescriptionPrompt from "../_components/ai/DescriptionPrompt";
import AiResponse from "../_components/ai/AiResponse";

export default function Home() {
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
      <MenuBar />

      <div className="flex justify-center mt-10 px-4 ml-20 mr-20">
        <DescriptionPrompt />
        <div className="h-1000 w-25000">
          <AiResponse />
        </div>
      </div>
    </div>
  );
}
