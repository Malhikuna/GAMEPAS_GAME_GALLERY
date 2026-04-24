"use client";

import { motion } from "framer-motion";

export default function ArcadeCabinet({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen bg-[#0a0c10] overflow-hidden flex flex-col items-center justify-between py-6 md:py-10 px-4 md:px-8 font-mono selection:bg-[#ffbd3f] selection:text-[#005692]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-[#005692]/10 via-[#0a0c10] to-[#0a0c10] pointer-events-none" />

      {/* ELEMEN FISIK KABINET: Gril Speaker Atas & Logo Marquee */}
      <div className="w-full max-w-4xl flex items-center justify-between px-16 mb-4 md:mb-6 pointer-events-none z-0">
        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-[#050608] border-[6px] border-[#12161c] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)] grid grid-cols-3 gap-1 p-2 md:p-3 opacity-40">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-black/50 rounded-full w-full h-full" />
          ))}
        </div>

        <motion.div animate={{ opacity: [1, 1, 0.1, 1, 1, 0.4, 1, 0.8, 1, 1, 0.2, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "mirror" }} className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[#005692]/80 blur-[50px] rounded-full" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gamepas_logo.png" alt="Gamepas Marquee" className="relative z-10 h-10 md:h-14 object-contain drop-shadow-[0_0_15px_rgba(255,189,63,0.2)]" />
        </motion.div>

        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-[#050608] border-[6px] border-[#12161c] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)] grid grid-cols-3 gap-1 p-2 md:p-3 opacity-40">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-black/50 rounded-full w-full h-full" />
          ))}
        </div>
      </div>

      {/* =========================================
          ARCADE MONITOR BEZEL (Layar CRT)
          ========================================= */}
      <div className="relative w-full max-w-6xl flex-1 aspect-auto md:aspect-video flex flex-col bg-[#020508] border-12 md:border-20 border-[#12161c] rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_100px_rgba(0,0,0,1)] overflow-hidden p-4 md:p-8 z-20">
        {/* EFEK VISUAL MONITOR CRT (Efek Melengkung & Cahaya) */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[50%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12)_0%,transparent_70%)] rounded-[100%] pointer-events-none z-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[30%] bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06)_0%,transparent_70%)] rounded-[100%] pointer-events-none z-50" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent_0px,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] pointer-events-none z-50 mix-blend-overlay " />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,1),inset_0_0_60px_rgba(0,0,0,0.9)] pointer-events-none z-50" />

        <motion.div animate={{ opacity: [0.07, 0.11, 0.08, 0.1, 0.07] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-[#005692] mix-blend-screen pointer-events-none z-40" />

        {/* --- DI SINILAH KONTEN HALAMAN AKAN MUNCUL --- */}
        {children}
      </div>

      {/* ELEMEN FISIK KABINET: Panel Kontrol Bawah */}
      <div className="w-full max-w-4xl flex items-center justify-between mt-6 md:mt-8 px-10 md:px-20 opacity-60 pointer-events-none z-0">
        <div className="relative w-16 h-16 md:w-24 md:h-24 bg-[#1a1a1a] rounded-full border-8 md:border-12 border-[#0a0a0a] shadow-inner flex items-center justify-center">
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-red-600 shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.5)] border-2 border-red-800" />
          <div className="absolute w-2 md:w-3 h-10 md:h-14 bg-zinc-600 -bottom-5 md:-bottom-7 -z-10" />
        </div>

        <div className="flex gap-4 md:gap-6 rotate-[-15deg]">
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-blue-600 border-4 md:border-[6px] border-[#0a0a0a] shadow-[0_5px_0_#0a0a0a,inset_0_2px_5px_rgba(255,255,255,0.4)] active:translate-y-1 active:shadow-none" />
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-emerald-500 border-4 md:border-[6px] border-[#0a0a0a] shadow-[0_5px_0_#0a0a0a,inset_0_2px_5px_rgba(255,255,255,0.4)] mt-4 md:mt-6 active:translate-y-1 active:shadow-none" />
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-yellow-500 border-4 md:border-[6px] border-[#0a0a0a] shadow-[0_5px_0_#0a0a0a,inset_0_2px_5px_rgba(255,255,255,0.4)] mt-8 md:mt-12 active:translate-y-1 active:shadow-none" />
        </div>
      </div>
    </main>
  );
}
