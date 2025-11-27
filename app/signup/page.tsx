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
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <button onClick={() => changeRoleToDoc()}>Click</button>
      <button onClick={() => changeRoleToUser()}>user</button>
      <div className="w-[65%] h-[75%] rounded-[40px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex border border-green-500">
        <AnimatePresence mode="wait">
          {role === "user" ? (
            <motion.div
              key="user"
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 120 }}
              transition={smooth}
              className="w-full h-full flex"
            >
              <div className="w-[60%] h-full relative group">
                <img
                  src="https://images.unsplash.com/photo-1527195694714-9b939fac3432?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-full object-cover "
                  alt=""
                />
              </div>

              <div className="w-[40%] h-full flex flex-col justify-center px-10 bg-white/60 backdrop-blur-lg">
                <div className="absolute top-10 left-10 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                <div className="absolute top-20 left-24 w-40 h-20 bg-green-600 rounded-full  opacity-60"></div>
                <div className="absolute top-10 left-1/2 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                <div className="absolute top-10 right-10 w-32 h-16 bg-green-600 rounded-full  opacity-60"></div>
                <div className="absolute top-20 right-24 w-40 h-20 bg-green-600 rounded-full  opacity-50"></div>

                <h2 className="text-3xl font-semibold mb-6 text-green-700">
                  Welcome Back
                </h2>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="email"
                    onChange={handleInput}
                    placeholder="Email"
                    className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    name="username"
                    onChange={handleInput}
                    placeholder="Username"
                    className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="password"
                    name="password"
                    onChange={handleInput}
                    placeholder="Password"
                    className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="mt-3 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition">
                    Login
                  </button>
                </div>
                <p className="text-sm mt-4 text-gray-600">
                  Don’t have an account?{" "}
                  <span className="text-green-700 cursor-pointer">Log In</span>
                </p>
                <div className="absolute bottom-10 left-10 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                <div className="absolute bottom-20 left-24 w-40 h-20 bg-green-600 rounded-full  opacity-60"></div>
                <div className="absolute bottom-10 left-1/2 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                <div className="absolute bottom-10 right-10 w-32 h-16 bg-green-600 rounded-full  opacity-60"></div>
                <div className="absolute bottom-20 right-24 w-40 h-20 bg-green-600 rounded-full opacity-50"></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="doctor"
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -120 }}
              transition={smooth}
              className="w-full h-full flex"
            >
              <div className="w-[40%] h-full flex flex-col justify-center px-10 bg-white/60 backdrop-blur-lg">
                <div className="absolute top-10 left-10 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                <div className="absolute top-20 left-24 w-40 h-20 bg-green-600 rounded-full  opacity-60"></div>
                <div className="absolute top-10 left-1/2 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                <div className="absolute top-10 right-10 w-32 h-16 bg-green-600 rounded-full  opacity-60"></div>
                <div className="absolute top-20 right-24 w-40 h-20 bg-green-600 rounded-full  opacity-50"></div>
                <h2 className="text-3xl font-semibold mb-6 text-green-700">
                  Welcome Back
                </h2>
                <div className="flex flex-col gap-4">
                  <input
                    type="email"
                    name="email"
                    onChange={handleInput}
                    placeholder="Email"
                    className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="email"
                    name="email"
                    onChange={handleInput}
                    placeholder="Email"
                    className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="email"
                    name="email"
                    onChange={handleInput}
                    placeholder="Email"
                    className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="password"
                    name="password"
                    onChange={handleInput}
                    placeholder="Password"
                    className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="mt-3 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition">
                    Login
                  </button>
                  <div className="absolute bottom-10 left-10 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                  <div className="absolute bottom-20 left-24 w-40 h-20 bg-green-600 rounded-full  opacity-60"></div>
                  <div className="absolute bottom-10 left-1/2 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-16 bg-green-600 rounded-full  opacity-60"></div>
                  <div className="absolute bottom-20 right-24 w-40 h-20 bg-green-600 rounded-full opacity-50"></div>
                </div>
                <p className="text-sm mt-4 text-gray-600">
                  Already have an account
                  <span className="text-green-700 cursor-pointer">Log In</span>
                </p>
              </div>

              <div className="w-[60%] h-full relative group">
                <img
                  src="https://images.unsplash.com/photo-1527195694714-9b939fac3432?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page;
