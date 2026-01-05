"use client";

import { useProvider } from "@/providers/AuthProvidor";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, doctor } = useProvider();
  const router = useRouter();

  useEffect(() => {
    if (user === null) return;

    if (user && !doctor) {
      router.replace("/user");
    }
    if (!user && !doctor) {
      router.replace("login");
    }
  }, [user, router, doctor]);


  return <div>{children}</div>;
}
