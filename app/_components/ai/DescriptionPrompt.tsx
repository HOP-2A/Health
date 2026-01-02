"use client";

import { ChangeEvent, useEffect, useState } from "react";
import CallDoctor from "../CallDoctor";
import { useProvider } from "@/providers/AuthProvidor";
export default function DescriptionPrompt() {
  const { user: mainUser } = useProvider();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  useEffect(() => {
    const storedPrompt = sessionStorage.getItem("prompt");
    if (storedPrompt) {
      setPrompt(storedPrompt);
      sessionStorage.removeItem("prompt");
      sendToAi(storedPrompt);
    }
  }, []);

  const sendToAi = async (prompt: string) => {
    try {
      setIsLoading(true);

      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, userId: mainUser?.id }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();
      window.location.reload();
    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  };

  return (
    <div className="relative w-240 ml-5">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 pointer-events-none">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mb-4"></div>
            <div className="text-white text-lg font-semibold">
              Ачааллаж байна...
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-start w-full px-4">
        <form
          className="
        w-full max-w-4xl h-250
        bg-[url('/your-image.jpg')] bg-cover bg-center
        backdrop-blur-xl
        border border-green-300 rounded-3xl shadow-[0_4px_20px_rgba(0,200,100,0.25)]
        flex flex-col items-center p-10 text-gray-800
        transition-all duration-300
      "
        >
          <h2 className="text-4xl font-extrabold mb-6 text-black tracking-tight">
            Өвчний шинж тэмдгээ тайлбарлана уу
          </h2>

          <label className="block mb-2 text-gray-400 font-semibold w-full text-lg">
            Илэрч буй шинж тэмдгүүдээ дэлгэрэнгүй бичнэ үү:
          </label>

          <textarea
            rows={5}
            onChange={handleInput}
            placeholder="Өөрийн өвчний талаар энд бичнэ үү..."
            className="
          w-full p-4 rounded-xl resize-none
          bg-gray-400 text-gray-800 placeholder-gray-500
          border border-green-200 shadow-sm
          focus:outline-none focus:ring-2 focus:ring-green-200
          transition-all duration-200
        "
          ></textarea>

          <button
            type="button"
            onClick={() => sendToAi(prompt)}
            className="
          w-full mt-6 py-3 rounded-xl text-lg font-semibold
          bg-green-500 text-white shadow-md
          hover:bg-green-600 hover:shadow-lg
          active:scale-95 transition-all duration-200
        "
          >
            Илгээх
          </button>

          <div className="text-[50px] text-white">Манай эмч нар:</div>

          <CallDoctor />
        </form>
      </div>
    </div>
  );
}
