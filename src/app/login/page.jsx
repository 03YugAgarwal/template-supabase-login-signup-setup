"use client";

import { UserAuth } from "@/context/AuthContext";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const { session, signIn  } = UserAuth();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState(undefined)
  const [password, setPassword] = useState(undefined)

  const router = useRouter()

  const handleLogIn = async (e) => {

    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn(email, password);
      if (result.success) {
        toast.success("Log In successful!", {
          duration: 5000,
        });
        router.push("/dashboard");
      }

      if(!result.success){
        toast.error(result.error, {
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        });
      }
      
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Log In failed";
      toast.error(message, {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogIn}>
        <input placeholder="email" value={email} type="email" onChange={(e)=>setEmail(e.target.value)} required />
        <input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  required />
        <button disabled={loading}>Submit</button>
        <p>New? <Link href="/register">Create Account</Link></p>
      </form>
    </div>
  );
};

export default Login;
