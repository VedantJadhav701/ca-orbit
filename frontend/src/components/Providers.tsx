"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

function SessionSync({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated" && session) {
      // Sync NextAuth session token into the js-cookie so api.ts can use it
      const token = (session as any).orbit_token;
      if (token) {
        Cookies.set("orbit_token", token, { expires: 7 });
      }

      // Check onboarding redirection
      const onboardingCompleted = (session as any).onboarding_completed;
      
      // If onboarding is done, skip survey
      if (onboardingCompleted && pathname === "/survey") {
        router.push("/dashboard");
      }
      
      // If onboarding is NOT done, force them to survey if they try to access dashboard
      if (!onboardingCompleted && pathname === "/dashboard") {
        router.push("/survey");
      }
    }
  }, [session, status, pathname, router]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SessionSync>
        {children}
      </SessionSync>
    </SessionProvider>
  );
}
