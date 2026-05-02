"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrutalistButton } from "@/components/BrutalistButton";
import { BrutalistInput } from "@/components/BrutalistInput";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    level: "CA Inter",
    attemptDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt:", formData);
    // Registration logic will go here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="neo-card w-full max-w-2xl bg-secondary text-white space-y-8">
        <h1 className="text-5xl font-heading text-center underline">REGISTER</h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          <div className="md:col-span-2">
            <BrutalistInput 
              label="FULL NAME" 
              name="fullName"
              placeholder="Elon Musk (Future CA)"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <BrutalistInput 
            label="EMAIL" 
            name="email"
            type="email" 
            placeholder="ca.student@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <BrutalistInput 
            label="PASSWORD" 
            name="password"
            type="password" 
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <div className="flex flex-col space-y-2 w-full">
            <label className="font-heading text-2xl text-black">CA LEVEL</label>
            <select 
              name="level"
              className="bg-white border-brutalist shadow-brutalist px-4 py-3 text-xl font-body focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[4px_4px_0px_#000] transition-all"
              value={formData.level}
              onChange={handleChange}
            >
              <option>CA Foundation</option>
              <option>CA Inter</option>
              <option>CA Final</option>
            </select>
          </div>

          <BrutalistInput 
            label="ATTEMPT DATE" 
            name="attemptDate"
            type="date" 
            value={formData.attemptDate}
            onChange={handleChange}
            required
          />
          
          <div className="md:col-span-2">
            <BrutalistButton type="submit" variant="primary" className="w-full py-4 text-3xl mt-4">
              LAUNCH ACCOUNT
            </BrutalistButton>
          </div>
        </form>

        <p className="text-xl font-body text-center">
          ALREADY HAVE AN ACCOUNT?{" "}
          <Link href="/login" className="font-bold underline hover:text-primary text-primary">
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
}
