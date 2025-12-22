"use client";
import { useUser } from "@clerk/nextjs";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  clerkId: string;
};

type Doctor = {
  id: string;
  username: string;
  email: string;
  profilePic: string;
  phoneNumber: string;
  experienceYears: number;
  createdAt: Date;
  clerkId: string;
};

type ContextType = {
  user: User | null;
  doctor: Doctor | null;
  setUser: Dispatch<SetStateAction<null | User>>;
  setDoctor: Dispatch<SetStateAction<null | Doctor>>;
};

export const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const { user: clerkUser } = useUser();
  console.log(clerkUser);
  useEffect(() => {
    const find = async () => {
      if (!clerkUser?.id) return;
      try {
        if (clerkUser.publicMetadata.role === "USER") {
          const res = await fetch("/api/find-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: clerkUser.id,
            }),
          });

          if (!res.ok) throw new Error("Failed to fetch user");
          const userData = await res.json();
          setUser(userData);
        } else {
          const res = await fetch("/api/find-doctor", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: clerkUser.id,
            }),
          });
          if (!res.ok) throw new Error("Failed to fetch doctor");
          const doctorData = await res.json();
          console.log(doctorData);
          setDoctor(doctorData);
        }
      } catch (error) {
        console.error("Error fetching user/doctor data:", error);
      }
    };

    find();
  }, [clerkUser]);
  const values = {
    user,
    setUser,
    doctor,
    setDoctor,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useProvider = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("use auth");
  }
  return authContext;
};
