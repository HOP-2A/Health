"use client";

import { useProvider } from "@/providers/AuthProvidor";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, doctor } = useProvider();
  const router = useRouter();
  useEffect(() => {
    if (doctor === null) return;

    if (doctor) {
      router.replace("/doctor");
    }
    if (!doctor && !user) {
      router.replace("login");
    }
  }, [doctor, router, user]);

  return <div>{children}</div>;
}
