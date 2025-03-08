"use client";

import { UserAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { session, role, username, loading } = UserAuth();
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!session) {
    router.push("/login")
  }

  return (
    <>
      <h1>Language helper</h1>
    </>
  );
}
