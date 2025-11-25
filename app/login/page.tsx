"use client";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const Page = () => {
  const [mode, setMode] = useState<"user" | "doctor">("user");

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <AnimatePresence mode="wait">
        {mode === "user" ? (
          <div className="w-[65%] h-[75%] rounded-[40px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex border border-green-500">
            <div className="w-[60%] h-full relative group">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt=""
              />

              <div className="absolute inset-0 transition-all"></div>
            </div>

            <div className="w-[40%] h-full flex flex-col justify-center px-10 bg-white/60 backdrop-blur-lg">
              <h2 className="text-3xl font-semibold mb-6 text-green-700">
                Welcome Back
              </h2>

              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <button className="mt-3 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition">
                  Login
                </button>
              </div>

              <p className="text-sm mt-4 text-gray-600">
                Don’t have an account?{" "}
                <span className="text-green-700 cursor-pointer">Sign Up</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="w-[65%] h-[75%] rounded-[40px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex border border-green-500">
            <div className="w-[60%] h-full relative group">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt=""
              />

              <div className="absolute inset-0 transition-all"></div>
            </div>

            <div className="w-[40%] h-full flex flex-col justify-center px-10 bg-white/60 backdrop-blur-lg">
              <h2 className="text-3xl font-semibold mb-6 text-green-700">
                Welcome Back
              </h2>

              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <button className="mt-3 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition">
                  Login
                </button>
              </div>

              <p className="text-sm mt-4 text-gray-600">
                Don’t have an account?{" "}
                <span className="text-green-700 cursor-pointer">Sign Up</span>
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
