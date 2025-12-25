"use client";

import { AuthProvider, useProvider } from "@/providers/AuthProvidor";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useProvider();
  const router = useRouter();
  useEffect(() => {
    if (user === null) return;
    if (!user) router.replace("/doctor");
  }, [user, router]);

  if (user === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return <div>{children}</div>;
}
