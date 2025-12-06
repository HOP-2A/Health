"use client";

import { prisma } from "@/lib/db";
import { ChangeEvent, useEffect, useState } from "react";

export default function DescriptionPrompt() {
  const [prompt, setPrompt] = useState("");
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setPrompt(value);
  };
  const sendtoAi = async () => {
    try {
      const res = await fetch("api/ai-chat", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();
      console.log("AI response:", data);

      // Reload the page after the response is returned
      window.location.reload();
    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  };

  return (
    <div className="flex justify-start w-full px-4">
      <form
        className="
      w-full max-w-4xl
      bg-[url('/your-image.jpg')] bg-cover bg-center
      backdrop-blur-xl
      border border-green-300 rounded-3xl shadow-[0_4px_20px_rgba(0,200,100,0.25)]
      flex flex-col items-center p-10 text-gray-800
      transition-all duration-300
    "
      >
        <h2 className="text-4xl font-extrabold mb-6 text-gray-300 tracking-tight">
          Describe Your Illness
        </h2>

        <label className="block mb-2 text-gray-400 font-semibold w-full text-lg">
          Please provide a detailed description of your symptoms:
        </label>

        <textarea
          rows={5}
          onChange={handleInput}
          placeholder="Describe your illness here..."
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
          onClick={() => sendtoAi()}
          className="
        w-full mt-6 py-3 rounded-xl text-lg font-semibold
        bg-green-500 text-white shadow-md
        hover:bg-green-600 hover:shadow-lg
        active:scale-95 transition-all duration-200
      "
        >
          Submit
        </button>
        <div className="w-220 h-80 mt-10 text-9xl text-white">
          ADD LATER: DOCTOR STUFF
        </div>
      </form>
    </div>
  );
}
