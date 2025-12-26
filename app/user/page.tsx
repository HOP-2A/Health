"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MenuBar from "../_components/MenuBar";
import CallDrug from "../_components/CallDrug";
import DescriptionPromptMain from "../_components/DescriptionPromptMain";

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    sessionStorage.setItem("prompt", prompt);
    router.push("/user/ai-chat");
  };
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551970634-747846a548cb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
    </div>
  );
}
