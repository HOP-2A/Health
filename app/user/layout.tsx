"use client";

import { AuthProvider, useProvider } from "@/providers/AuthProvidor";
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
  }, [doctor, router]);

  // if (user === null) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }
  return <div>{children}</div>;
}
