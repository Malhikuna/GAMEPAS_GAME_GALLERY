"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    // PERBAIKAN: Ganti min-h-screen menjadi w-full h-full agar pas di dalam layar monitor
    <main className="relative w-full h-full bg-[#030b14] overflow-hidden flex flex-col items-center justify-center font-mono selection:bg-[#ffbd3f] selection:text-[#005692] rounded-4xl">
      {/* Ambient Glow di tengah layar */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#005692]/20 via-transparent to-transparent pointer-events-none" />

      {/* Konten Utama */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animasi Logo Gamepas Muncul dari Kegelapan */}
        <motion.div initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.5, ease: "easeOut" }} className="relative mb-10 md:mb-14">
          <div className="absolute inset-0 bg-[#005692]/60 blur-[60px] rounded-full" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gamepas_logo.png"
            alt="Gamepas Logo"
            // Ukuran logo sedikit saya sesuaikan agar proporsional di dalam monitor 16:9
            className="relative z-10 h-28 md:h-40 lg:h-48 object-contain drop-shadow-[0_0_30px_rgba(255,189,63,0.4)]"
          />
        </motion.div>

        {/* Tombol Insert Coin yang Berkedip dan Mengarah ke Inventory */}
        <Link href="/menu" className="group">
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center cursor-pointer">
            <div className="text-[#ffbd3f] text-xl md:text-2xl font-black tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(255,189,63,0.8)] group-hover:text-white transition-colors duration-300">Insert Coin</div>

            <div className="mt-4 flex items-center gap-4 text-[#005692] opacity-80">
              <span className="h-[2px] w-8 md:w-12 bg-[#005692]" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em]">PRESS START</span>
              <span className="h-[2px] w-8 md:w-12 bg-[#005692]" />
            </div>
          </motion.div>
        </Link>
      </div>
    </main>
  );
}
