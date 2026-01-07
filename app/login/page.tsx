"use client";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import MenuBar from "../_components/MenuBar";
import { usePathname } from "next/navigation";
import Footer from "../_components/Footer";
import { toast } from "sonner";

const smooth: Transition = {
  type: "spring",
  stiffness: 90,
  damping: 10,
  mass: 0.8,
};

const Page = () => {
  const [role, setRole] = useState<"user" | "doctor">("user");
  const pathname = usePathname();
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const login = async () => {
    if (!isLoaded || !signIn) return;

    try {
      const result = await signIn.create({
        identifier: input.email,
        password: input.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        await new Promise((resolve) => setTimeout(resolve, 500));

        router.push("/doctor");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Алдаа гарлаа", {
        style: {
          background: "rgba(239,68,68,0.95)",
          color: "#fef2f2",
          borderRadius: "10px",
        },
      });
    }
  };

  return (
    <div className="w-screen flex items-center  relative min-h-screen flex-col overflow-hidden gap-[30px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-screen h-screen flex items-center flex-col gap-[30px]"
        >
          <MenuBar />
          <div className="flex">
            <button
              onClick={changeRoleToDoc}
              className="px-4 py-2 rounded-xl bg-green-600 text-white font-medium 
             hover:bg-green-700 active:scale-95 transition-all w-[150px] h-[50px]"
            >
              Doctor
            </button>

            <button
              onClick={changeRoleToUser}
              className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 font-medium
             hover:bg-gray-300 active:scale-95 transition-all ml-3  w-[150px] h-[50px]"
            >
              User
            </button>
          </div>

          <div className="w-[65%] h-[75%] rounded-[40px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex border border-green-500 bg-white/70">
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
                      src="https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="w-full h-full object-cover "
                      alt=""
                    />
                  </div>

                  <div className="w-[40%] h-full flex flex-col justify-center px-10   relative">
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
                        value={input.email}
                        onChange={handleInput}
                        placeholder="Email"
                        className="p-3 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={handleInput}
                        placeholder="Password"
                        className="p-3 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        onClick={login}
                        className="mt-3 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
                      >
                        Login
                      </button>
                    </div>
                    <p className="text-sm mt-4 text-gray-600">
                      Don&apos;t have an account?{" "}
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => router.push("/signup")}
                      >
                        Sign Up
                      </span>
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
                  <div className="w-[40%] h-full flex flex-col justify-center px-10   relative">
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
                        value={input.email}
                        onChange={handleInput}
                        placeholder="Email"
                        className="p-3 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={handleInput}
                        placeholder="Password"
                        className="p-3 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        onClick={login}
                        className="mt-3 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
                      >
                        Login
                      </button>
                      <div className="absolute bottom-10 left-10 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                      <div className="absolute bottom-20 left-24 w-40 h-20 bg-green-600 rounded-full  opacity-60"></div>
                      <div className="absolute bottom-10 left-1/2 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                      <div className="absolute bottom-10 right-10 w-32 h-16 bg-green-600 rounded-full  opacity-60"></div>
                      <div className="absolute bottom-20 right-24 w-40 h-20 bg-green-600 rounded-full opacity-50"></div>
                    </div>
                    <p className="text-sm mt-4 text-gray-600">
                      Don&apos;t have an account?{" "}
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => router.push("/signup")}
                      >
                        Sign Up
                      </span>
                    </p>
                  </div>

                  <div className="w-[60%] h-full relative group">
                    <img
                      src="https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Page;
