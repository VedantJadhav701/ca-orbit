"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { BrutalistButton } from "@/components/BrutalistButton";
import { BrutalistInput } from "@/components/BrutalistInput";
import { authApi } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      
      const data = await authApi.login(formData);
      Cookies.set("orbit_token", data.access_token, { expires: 7 });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "LOGIN FAILED. TRY AGAIN.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="neo-card w-full max-w-md bg-primary space-y-8">
        <h1 className="text-5xl font-heading text-center underline">LOGIN</h1>
        
        {error && (
          <div className="bg-secondary text-white p-4 border-brutalist font-heading text-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <BrutalistInput 
            label="EMAIL" 
            type="email" 
            placeholder="ca.student@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <BrutalistInput 
            label="PASSWORD" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <BrutalistButton 
            type="submit" 
            className="w-full py-4 text-3xl mt-4"
            disabled={loading}
          >
            {loading ? "CONNECTING..." : "ENTER THE ORBIT"}
          </BrutalistButton>
        </form>

        <p className="text-xl font-body text-center text-black">
          NEW HERE?{" "}
          <Link href="/register" className="font-bold underline hover:text-secondary">
            JOIN NOW
          </Link>
        </p>
      </div>
    </div>
  );
}
