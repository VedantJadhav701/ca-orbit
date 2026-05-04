"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 mesh-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-black border-brutalist-lg shadow-[16px_16px_0px_#FFD60A] p-10 md:p-14 space-y-10"
      >
        <div className="text-center">
          <h1 className="text-6xl font-heading text-primary text-glow mb-2">CA ORBIT</h1>
          <p className="text-xl text-gray-300 font-body">Sign in to access your Mission Command Center</p>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/survey" })}
          className="w-full flex items-center justify-center gap-4 bg-white text-black border-brutalist shadow-brutalist px-6 py-5 text-2xl font-heading hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_#000] transition-all"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          SIGN IN WITH GOOGLE
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-[3px] bg-white/20"></div>
          <span className="text-gray-400 font-heading text-lg">OR</span>
          <div className="flex-1 h-[3px] bg-white/20"></div>
        </div>

        {/* Manual Login Redirect */}
        <Link
          href="/register"
          className="block w-full text-center neo-btn bg-secondary text-white px-6 py-5 text-2xl font-heading"
        >
          CREATE ACCOUNT
        </Link>

        <p className="text-center text-gray-400 font-body text-lg">
          By signing in, you agree to our Terms of Service
        </p>
      </motion.div>
    </div>
  );
}
