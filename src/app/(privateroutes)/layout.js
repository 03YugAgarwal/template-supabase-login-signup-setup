"use client";

import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function PrivateLayout({children}) {
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
        <>{children}</>
    )


}