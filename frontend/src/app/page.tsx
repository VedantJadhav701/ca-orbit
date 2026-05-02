import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-12">
        <div className="relative group">
          <h1 className="text-7xl md:text-9xl font-heading text-primary border-brutalist-lg bg-black px-8 py-4 shadow-brutalist transform -rotate-2 group-hover:rotate-0 transition-transform duration-150">
            CA ORBIT
          </h1>
          <div className="absolute -top-4 -right-4 bg-secondary text-white font-heading text-2xl px-4 py-2 border-brutalist shadow-brutalist transform rotate-12">
            STUDY OS
          </div>
        </div>

        <p className="max-w-2xl text-2xl md:text-3xl font-body text-white bg-black/50 p-6 border-brutalist-lg shadow-brutalist backdrop-blur-sm">
          The ultimate productivity system for <span className="text-primary font-bold underline">Chartered Accountant</span> students.
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          <Link href="/login" className="neo-btn px-12 py-6 text-3xl font-heading">
            LOGIN NOW
          </Link>
          <Link href="/register" className="neo-btn bg-secondary text-white px-12 py-6 text-3xl font-heading hover:bg-red-600">
            JOIN THE ORBIT
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
          <div className="neo-card transform hover:-translate-y-2 transition-transform">
            <h3 className="text-3xl font-heading mb-4 underline">AUTH SYSTEM</h3>
            <p className="text-xl">Secure JWT-based authentication with student onboarding.</p>
          </div>
          <div className="neo-card bg-primary transform hover:-translate-y-2 transition-transform rotate-1">
            <h3 className="text-3xl font-heading mb-4 underline">STUDY PLANNER</h3>
            <p className="text-xl">Rule-based tasks generated from your exam date & subjects.</p>
          </div>
          <div className="neo-card bg-secondary text-white transform hover:-translate-y-2 transition-transform -rotate-1">
            <h3 className="text-3xl font-heading mb-4 underline">STATS TRACKER</h3>
            <p className="text-xl">Visualise your progress with subject-wise stats & streaks.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 border-t-4 border-black bg-primary text-black text-center font-heading text-2xl">
        © 2026 CA ORBIT - BUILT FOR THE BRAVE
      </footer>
    </div>
  );
}
