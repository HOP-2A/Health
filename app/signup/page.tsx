"use client";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import MenuBar from "../_components/MenuBar";

const smooth: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 18,
  mass: 0.6,
};

const Page = () => {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "doctor">("user");
  const pathname = usePathname();
  const [userInput, setUserInput] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [doctorInput, setDoctorInput] = useState({
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    experienceYear: 0,
  });
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setUserInput((prev) => {
        return { ...prev, email: value };
      });
    }
    if (name === "password") {
      setUserInput((prev) => {
        return { ...prev, password: value };
      });
    }
    if (name === "username") {
      setUserInput((prev) => {
        return { ...prev, username: value };
      });
    }
  };
  const userSignUp = async () => {
    const user = await fetch("api/user-create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: userInput.email,
        username: userInput.username,
        password: userInput.password,
      }),
    });
    if (user) {
      router.push("/");
    }
  };
  const doctorSignUp = async () => {
    const doctor = await fetch("api/doctor-create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: doctorInput.email,
        username: doctorInput.username,
        password: doctorInput.password,
        experienceYears: doctorInput.experienceYear,
        phoneNumber: doctorInput.phoneNumber,
      }),
    });
    if (doctor) {
      router.push("/");
    }
    console.log(doctor);
  };
  const handleDoctorInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setDoctorInput((prev) => {
        return { ...prev, email: value };
      });
    }
    if (name === "profilePic") {
      setDoctorInput((prev) => {
        return { ...prev, profilePic: value };
      });
    }
    if (name === "experienceYear") {
      setDoctorInput((prev) => {
        return { ...prev, experienceYear: Number(value) };
      });
    }
    if (name === "phoneNumber") {
      setDoctorInput((prev) => {
        return { ...prev, phoneNumber: value };
      });
    }
    if (name === "password") {
      setDoctorInput((prev) => {
        return { ...prev, password: value };
      });
    }
    if (name === "username") {
      setDoctorInput((prev) => {
        return { ...prev, username: value };
      });
    }
  };
  console.log(doctorInput, "doctor input");
  console.log(userInput, "user input");
  const changeRoleToDoc = () => {
    setRole("doctor");
    setUserInput({
      email: "",
      password: "",
      username: "",
    });
  };
  const changeRoleToUser = () => {
    setRole("user");
    setDoctorInput({
      email: "",
      password: "",
      experienceYear: 0,
      username: "",
      phoneNumber: "",
    });
  };
  return (
    <div
      className="w-screen h-screen flex items-center bg-gray-100 relative min-h-screen flex-col overflow-hidden gap-[30px]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551970634-086c4065fa85?q=80&w=3270&auto=format&fit=crop')",
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
          className="relative z-10 w-screen h-screen flex items-center flex-col gap-[30px]"
        >
          <MenuBar />
          <div className="flex">
            <button
              onClick={() => changeRoleToDoc()}
              className="px-4 py-2 rounded-xl bg-green-600 text-white font-medium 
                   hover:bg-green-700 active:scale-95 transition-all w-[150px] h-[50px]"
            >
              Doctor
            </button>

            <button
              onClick={() => changeRoleToUser()}
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
                      src="https://images.unsplash.com/photo-1495584816685-4bdbf1b5057e?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="w-full h-full object-cover "
                      alt=""
                    />
                  </div>

                  <div className="w-[40%] h-full flex flex-col justify-center px-10 relative">
                    <div className="absolute top-10 left-10 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                    <div className="absolute top-20 left-24 w-40 h-20 bg-green-600 rounded-full  opacity-60"></div>
                    <div className="absolute top-10 left-1/2 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                    <div className="absolute top-10 right-10 w-32 h-16 bg-green-600 rounded-full  opacity-60"></div>
                    <div className="absolute top-20 right-24 w-40 h-20 bg-green-600 rounded-full  opacity-50"></div>

                    <h2 className="text-3xl font-semibold mb-6 text-green-700">
                      Create An Account
                    </h2>
                    <div className="flex flex-col gap-4">
                      <input
                        type="text"
                        name="email"
                        onChange={handleUserInput}
                        placeholder="Email"
                        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        name="username"
                        onChange={handleUserInput}
                        placeholder="Username"
                        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="password"
                        name="password"
                        onChange={handleUserInput}
                        placeholder="Password"
                        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        className="mt-3 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
                        onClick={userSignUp}
                      >
                        Sign Up
                      </button>
                    </div>
                    <p className="text-sm mt-4 text-gray-600">
                      Already have an account?
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => router.push("/login")}
                      >
                        Log In
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
                  <div className="w-[40%] h-full flex flex-col justify-center px-10 relative">
                    <div className="absolute top-10 left-10 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                    <div className="absolute top-20 left-24 w-40 h-20 bg-green-600 rounded-full  opacity-60"></div>
                    <div className="absolute top-10 left-1/2 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                    <div className="absolute top-10 right-10 w-32 h-16 bg-green-600 rounded-full  opacity-60"></div>
                    <div className="absolute top-20 right-24 w-40 h-20 bg-green-600 rounded-full  opacity-50"></div>
                    <h2 className="text-3xl font-semibold mb-6 text-green-700">
                      Create An Account
                    </h2>
                    <div className="flex flex-col gap-4">
                      <input
                        type="email"
                        name="email"
                        onChange={handleDoctorInput}
                        placeholder="Email"
                        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        name="username"
                        onChange={handleDoctorInput}
                        placeholder="Username"
                        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        name="phoneNumber"
                        onChange={handleDoctorInput}
                        placeholder="Phone Number"
                        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="number"
                        name="experienceYear"
                        onChange={handleDoctorInput}
                        placeholder="Experience Year"
                        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="password"
                        name="password"
                        onChange={handleDoctorInput}
                        placeholder="Password"
                        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        className="mt-3 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
                        onClick={() => doctorSignUp()}
                      >
                        Sign Up
                      </button>
                      <div className="absolute bottom-10 left-10 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                      <div className="absolute bottom-20 left-24 w-40 h-20 bg-green-600 rounded-full  opacity-60"></div>
                      <div className="absolute bottom-10 left-1/2 w-32 h-16 bg-green-600 rounded-full  opacity-70"></div>
                      <div className="absolute bottom-10 right-10 w-32 h-16 bg-green-600 rounded-full  opacity-60"></div>
                      <div className="absolute bottom-20 right-24 w-40 h-20 bg-green-600 rounded-full opacity-50"></div>
                    </div>
                    <p className="text-sm mt-4 text-gray-600">
                      Already have an account?
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => router.push("/login")}
                      >
                        Log In
                      </span>
                    </p>
                  </div>

                  <div className="w-[60%] h-full relative group">
                    <img
                      src="https://images.unsplash.com/photo-1495584816685-4bdbf1b5057e?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
    </div>
  );
};

export default Page;
