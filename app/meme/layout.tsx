"use client";

import { fetchMeme } from "@/Store/slices/MemeSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function MemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();



  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }

    

  }, [status, router]);

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen"> Loading... </div>; // ✅ Prevents rendering before checking auth
  }

  return <>{children}</>; // ✅ Proper JSX return
}
