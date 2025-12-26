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
    console.log("hi");
    if (user) {
      router.replace("/user");
    }
  }, [user, router]);
  console.log(user);
  if (doctor === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <div>{children}</div>;
}
