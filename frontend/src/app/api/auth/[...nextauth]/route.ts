import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: '/login', // Optional: Custom sign-in page, but we'll use default or a new one
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch("https://ca-orbit.onrender.com/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              full_name: user.name,
              google_id: user.id,
              avatar_url: user.image
            })
          });
          const data = await res.json();
          if (res.ok) {
            (user as any).orbit_token = data.access_token;
            (user as any).onboarding_completed = data.onboarding_completed;
            return true;
          }
        } catch (e) {
          console.error("Google Auth Error:", e);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.orbit_token = (user as any).orbit_token;
        token.onboarding_completed = (user as any).onboarding_completed;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.sub;
        (session as any).orbit_token = token.orbit_token;
        (session as any).onboarding_completed = token.onboarding_completed;
      }
      return session;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
