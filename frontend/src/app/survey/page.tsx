"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SurveyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    level: "Foundation",
    weakestSubject: "Law",
    studyHours: 4,
    stressLevel: 5,
  });

  const handleComplete = async () => {
    setLoading(true);
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    setLoading(false);
    router.push("/dashboard?survey=completed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mesh-bg">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-black border-brutalist-lg shadow-[16px_16px_0px_#FFD60A] p-8 md:p-12"
      >
        <h1 className="text-5xl font-heading text-primary mb-2 text-glow">MISSION BRIEFING</h1>
        <p className="text-xl text-gray-300 mb-8 font-body">The AI needs your current parameters to generate your strategy.</p>

        {step === 1 && (
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <label className="block text-2xl font-heading mb-4">CURRENT CA LEVEL?</label>
            <select 
              value={formData.level}
              onChange={(e) => setFormData({...formData, level: e.target.value})}
              className="w-full bg-white text-black text-xl font-body p-4 border-brutalist mb-8"
            >
              <option value="Foundation">CA Foundation</option>
              <option value="Inter">CA Intermediate</option>
              <option value="Final">CA Final</option>
            </select>
            <button onClick={() => setStep(2)} className="w-full neo-btn py-4 text-2xl font-heading">NEXT PROTOCOL &rarr;</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <label className="block text-2xl font-heading mb-4">WEAKEST SUBJECT?</label>
            <input 
              type="text" 
              value={formData.weakestSubject}
              onChange={(e) => setFormData({...formData, weakestSubject: e.target.value})}
              className="w-full bg-white text-black text-xl font-body p-4 border-brutalist mb-8"
              placeholder="e.g., Taxation, Audit..."
            />
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="w-1/3 py-4 text-2xl font-heading border-brutalist bg-gray-200 text-black">BACK</button>
              <button onClick={() => setStep(3)} className="w-2/3 neo-btn py-4 text-2xl font-heading">NEXT PROTOCOL &rarr;</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <label className="block text-2xl font-heading mb-4">DAILY STUDY HOURS: {formData.studyHours}H</label>
            <input 
              type="range" 
              min="1" max="16"
              value={formData.studyHours}
              onChange={(e) => setFormData({...formData, studyHours: parseInt(e.target.value)})}
              className="w-full mb-8 accent-primary"
            />
            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="w-1/3 py-4 text-2xl font-heading border-brutalist bg-gray-200 text-black">BACK</button>
              <button onClick={handleComplete} disabled={loading} className="w-2/3 neo-btn bg-secondary text-white py-4 text-2xl font-heading flex justify-center items-center">
                {loading ? <span className="animate-pulse">ANALYZING...</span> : "GENERATE STRATEGY"}
              </button>
            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}
