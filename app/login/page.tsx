"use client";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { ChangeEvent, useState } from "react";

const smooth: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 18,
  mass: 0.6,
};

const Page = () => {
  const [role, setRole] = useState<"user" | "doctor">("user");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    if (name === "email") {
      setInput((prev) => {
        return { ...prev, email: value };
      });
    }
    if (name === "password") {
      setInput((prev) => {
        return { ...prev, password: value };
      });
    }
  };
  const changeRoleToDoc = () => {
    setRole("doctor");
    setInput({
      email: "",
      password: "",
    });
  };
  const changeRoleToUser = () => {
    setRole("user");
    setInput({
      email: "",
      password: "",
    });
  };
  console.log(input);
  const login = async () => {
    if (role === "user") {
      const user = await fetch("api/user-login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      });
      console.log(user);
    } else {
      const user = await fetch("api/doctor-login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      });
      console.log(user);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <button onClick={() => changeRoleToDoc()}>Click</button>
      <button onClick={() => changeRoleToUser()}>user</button>
      <AnimatePresence mode="wait">
        {role === "user" ? (
          <motion.div
            key="user"
            initial={{ opacity: 0, x: -120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 120 }}
            transition={smooth}
            className="w-[65%] h-[75%] rounded-[40px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex border border-green-500"
          >
            <div className="w-[60%] h-full relative group">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt=""
              />
            </div>
            <div className="w-[40%] h-full flex flex-col justify-center px-10 bg-white/60 backdrop-blur-lg">
              <h2 className="text-3xl font-semibold mb-6 text-green-700">
                Welcome Back
              </h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="email"
                  onChange={(e) => handleInput(e)}
                  placeholder="Email"
                  className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => handleInput(e)}
                  className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  className="mt-3 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
                  onClick={() => login()}
                >
                  Login
                </button>
              </div>
              <p className="text-sm mt-4 text-gray-600">
                Don’t have an account?
                <span className="text-green-700 cursor-pointer">Sign Up</span>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="doctor"
            initial={{ opacity: 0, x: 120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -120 }}
            transition={smooth}
            className="w-[65%] h-[75%] rounded-[40px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex border border-green-500"
          >
            <div className="w-[40%] h-full flex flex-col justify-center px-10 bg-white/60 backdrop-blur-lg">
              <h2 className="text-3xl font-semibold mb-6 text-green-700">
                Welcome Back
              </h2>
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  className="mt-3 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
                  onClick={() => login()}
                >
                  Login
                </button>
              </div>
              <p className="text-sm mt-4 text-gray-600">
                Don’t have an account?
                <span className="text-green-700 cursor-pointer">Sign Up</span>
              </p>
            </div>

            <div className="w-[60%] h-full relative group">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt=""
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
