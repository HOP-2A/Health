"use client";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const smooth: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 18,
  mass: 0.6,
};

const Page = () => {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "doctor">("user");
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
    profilePic: "",
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
    const user = fetch("api/user-create", {
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
    console.log(user);
  };
  const doctorSignUp = async () => {
    const doctor = fetch("api/doctor-create", {
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
        profilePic: doctorInput.profilePic,
      }),
    });
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
  console.log(doctorInput);
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
      profilePic: "",
    });
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      {/* <button onClick={() => changeRoleToDoc()}>Click</button>
      <button onClick={() => changeRoleToUser()}>user</button> */}
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
              <div className="w-[40%] h-full flex flex-col justify-center px-10 bg-white/60 backdrop-blur-lg">
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
                    type="text"
                    name="profilePic"
                    onChange={handleDoctorInput}
                    placeholder="Profile Picture"
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
                    onClick={doctorSignUp}
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
