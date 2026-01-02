"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MenuBar from "../_components/MenuBar";
import CallDrug from "../_components/CallDrug";
import DescriptionPromptMain from "../_components/DescriptionPromptMain";
import Footer from "../_components/Footer";

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    sessionStorage.setItem("prompt", prompt);
    router.push("/user/ai-chat");
  };
  return (
    <div className="relative min-h-screen overflow-hidden">
      <MenuBar />

      <div className="flex justify-center mt-36 px-4">
        <DescriptionPromptMain
          value={prompt}
          onChange={setPrompt}
          onSubmit={handleSubmit}
          submitLabel="Submit"
        />
      </div>

      <CallDrug />
      <Footer />
    </div>
  );
}
