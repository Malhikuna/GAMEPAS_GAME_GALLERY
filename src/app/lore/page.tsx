"use client";

import { motion } from "framer-motion";
import ArcadeCabinet from "../../components/ArcadeCabinet";

export default function LorePage() {
  // Varian animasi untuk efek teks muncul per baris (Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.8, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8 } },
  };

  return (
    <div className="relative w-full h-full flex flex-col z-10 overflow-hidden p-4 md:p-8">
      {/* Judul Halaman */}
      <div className="text-center mb-6 md:mb-8 flex-shrink-0 border-b-2 border-[#005692]/50 pb-4">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-[#ffbd3f] text-3xl md:text-5xl font-black tracking-[0.4em] uppercase drop-shadow-[0_0_15px_rgba(255,189,63,0.6)]"
        >
          The Lore
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-[#005692] text-xs md:text-sm tracking-widest uppercase mt-2 font-bold">
          Terminal Logs // Gamepas
        </motion.p>
      </div>

      {/* Konten Cerita (Terminal Style) */}
      <div className="flex-1 bg-[#030b14]/80 border-4 border-[#005692] p-6 md:p-10 overflow-y-auto custom-scrollbar shadow-[inset_0_0_50px_rgba(0,0,0,1)] relative">
        {/* Efek Garis Tepi Kiri ala Code Editor */}
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-[#005692]/30" />

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="pl-4 md:pl-6 space-y-8 max-w-3xl mx-auto">
          {/* Prologue */}
          <motion.section variants={itemVariants} className="space-y-2">
            <h2 className="text-[#ffbd3f] text-xl md:text-2xl font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#005692] text-sm">▶</span> Chapter I: The Origin
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed text-justify">
              Terbentuk di koridor Universitas Pasundan, kami adalah sekumpulan mahasiswa Teknik Informatika yang menolak untuk hanya menjadi penonton atau bahkan pemain. Gamepas didirikan sebagai wadah tempat bertemunya para kreator,
              penulis, seniman, dan programmer yang disatukan oleh satu *passion*: meracik dunia digital dari nol.
            </p>
          </motion.section>

          {/* The Arsenal (Tech Stack) */}
          {/* <motion.section variants={itemVariants} className="space-y-2">
            <h2 className="text-[#ffbd3f] text-xl md:text-2xl font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#005692] text-sm">▶</span> Chapter II: The Arsenal
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed text-justify mb-3">Kami tidak terikat pada satu senjata. Senjata kami berevolusi sesuai dengan kebutuhan *Quest* yang ada di depan mata:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 font-bold">✦</span>
                <span>
                  <strong className="text-white">Game Engines:</strong> Unity (C#) & Godot (GDScript).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">✦</span>
                <span>
                  <strong className="text-white">Web Frontiers:</strong> React, Next.js, Vite, Tailwind CSS.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold">✦</span>
                <span>
                  <strong className="text-white">Art & Audio:</strong> Aseprite (Pixel Art) & LMMS (BGM Synths).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✦</span>
                <span>
                  <strong className="text-white">Core Spells:</strong> Java, Rust, PHP, TypeScript.
                </span>
              </li>
            </ul>
          </motion.section> */}

          {/* Active Quests */}
          <motion.section variants={itemVariants} className="space-y-2">
            <h2 className="text-[#ffbd3f] text-xl md:text-2xl font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#005692] text-sm">▶</span> Chapter II: Active Quests
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed text-justify">Perjalanan kami masih panjang. Saat ini, kami sedang menempa diri untuk menghadapi kerasnya Game Jam.</p>
          </motion.section>

          {/* Closing */}
          <motion.section variants={itemVariants} className="pt-6 mt-6 border-t border-[#005692]/30 text-center">
            <p className="text-[#008cff] font-bold tracking-[0.2em] uppercase animate-pulse">_ SYSTEM.READY // JOIN THE PARTY _</p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
