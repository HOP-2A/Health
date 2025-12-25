"use client";

import { useProvider } from "@/providers/AuthProvidor";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { doctor, loading } = useProvider();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!doctor) {
      router.replace("/user");
    }
  }, [doctor, loading, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
