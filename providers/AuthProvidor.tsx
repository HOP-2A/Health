"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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

export type Doctor = {
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
  loading: boolean;
  find: () => Promise<void>;
};

export const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const { user: clerkUser, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const find = async () => {
      // Wait for Clerk to load
      if (!isLoaded) {
        return;
      }

      // If no clerk user, redirect to login
      if (!clerkUser) {
        setLoading(false);
        return;
      }

      // Fetch user/doctor data based on role
      if (clerkUser.publicMetadata.role === "USER") {
        const res = await fetch(`/api/find-user/${clerkUser.id}`, {
          method: "GET",
        });

        const userData = await res.json();
        setUser(userData);
      } else {
        const res = await fetch(`/api/find-doctor/${clerkUser.id}`, {
          method: "GET",
        });
        const doctorData = await res.json();
        setDoctor(doctorData);
      }
      setLoading(false);
    };

    find();
  }, [clerkUser, isLoaded, router]);

  const find = async () => {
    if (!clerkUser?.id) return;
    if (clerkUser.publicMetadata.role === "USER") {
      const res = await fetch(`/api/find-user/${clerkUser.id}`, {
        method: "GET",
      });

      const userData = await res.json();
      setUser(userData);
    } else {
      const res = await fetch(`/api/find-doctor/${clerkUser.id}`, {
        method: "GET",
      });
      const doctorData = await res.json();

      setDoctor(doctorData);
    }
  };

  const values = {
    user,
    setUser,
    doctor,
    setDoctor,
    loading,
    find,
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
