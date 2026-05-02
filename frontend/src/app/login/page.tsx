"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrutalistButton } from "@/components/BrutalistButton";
import { BrutalistInput } from "@/components/BrutalistInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    // Auth logic will go here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="neo-card w-full max-w-md bg-primary space-y-8">
        <h1 className="text-5xl font-heading text-center underline">LOGIN</h1>
        
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
          
          <BrutalistButton type="submit" className="w-full py-4 text-3xl mt-4">
            ENTER THE ORBIT
          </BrutalistButton>
        </form>

        <p className="text-xl font-body text-center">
          NEW HERE?{" "}
          <Link href="/register" className="font-bold underline hover:text-secondary">
            JOIN NOW
          </Link>
        </p>
      </div>
    </div>
  );
}
