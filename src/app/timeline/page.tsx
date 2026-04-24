"use client";

import { motion, Variants } from "framer-motion";
import ArcadeCabinet from "../../components/ArcadeCabinet";
// Import Icon dari react-icons
import { FaCheck, FaFire, FaLock, FaExclamationTriangle } from "react-icons/fa";

// Data Timeline / Quests
const questData = [
  {
    id: 1,
    title: "NoveJam 2025",
    date: "November 2025",
    description: "...",
    status: "DONE",
  },
  {
    id: 2,
    title: "GameJam+ 2025",
    date: "November 2025",
    description: "...",
    status: "DONE",
  },
  {
    id: 3,
    title: "Global Game Jam 2026",
    date: "Early 2026",
    description: "...",
    status: "DONE",
  },
  {
    id: 4,
    title: "Gameseed 2026",
    date: "April 25, 2026",
    description: "The ultimate trial begins! 30 days to build, survive, and deploy a game from scratch.",
    status: "ACTIVE",
  },
  {
    id: 5,
    title: "???",
    date: "Mid 2026",
    description: "???",
    status: "LOCKED",
  },
];

export default function QuestsPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="relative w-full h-full flex flex-col z-10 overflow-hidden p-4 md:p-8">
      {/* Header Quest Log */}
      <div className="text-center mb-6 md:mb-8 flex-shrink-0 border-b-2 border-[#005692]/50 pb-4">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-[#ffbd3f] text-3xl md:text-5xl font-black tracking-[0.3em] uppercase drop-shadow-[0_0_15px_rgba(255,189,63,0.6)]"
        >
          Gamepas Timeline
        </motion.h1>
        <p className="text-[#005692] text-xs md:text-sm tracking-widest uppercase mt-2 font-bold">Campaign Roadmap // Current Objective</p>
      </div>

      {/* Area Timeline */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative px-2 md:px-10">
        {/* Garis Vertikal Utama */}
        <div className="absolute left-[23px] md:left-[51px] top-4 bottom-10 w-[4px] bg-[#005692]/40 rounded-full" />

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8 pb-10">
          {questData.map((quest) => {
            const isDone = quest.status === "DONE";
            const isActive = quest.status === "ACTIVE";
            const isLocked = quest.status === "LOCKED";

            return (
              <motion.div key={quest.id} variants={itemVariants} className="relative pl-14 md:pl-24">
                {/* Titik Node (Bulatan di Garis) */}
                <div
                  className={`absolute left-0 md:left-7 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-[#030b14] border-4 z-10 
                    ${isDone ? "border-[#005692] text-[#005692]" : ""}
                    ${isActive ? "border-[#ffbd3f] text-[#ffbd3f] shadow-[0_0_15px_rgba(255,189,63,0.8)]" : ""}
                    ${isLocked ? "border-slate-700 text-slate-700" : ""}
                  `}
                >
                  {/* PENGGUNAAN REACT ICONS */}
                  {isDone && <FaCheck className="text-xl" />}
                  {isActive && (
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <FaFire className="text-2xl text-[#ffbd3f]" />
                    </motion.div>
                  )}
                  {isLocked && <FaLock className="text-xl text-slate-700" />}
                </div>

                {/* Kartu Konten Quest */}
                <div
                  className={`p-4 md:p-5 border-2 rounded-sm relative overflow-hidden transition-all duration-300
                    ${isDone ? "bg-[#005692]/10 border-[#005692] opacity-70" : ""}
                    ${isActive ? "bg-[#005692]/40 border-[#ffbd3f] shadow-[4px_4px_0px_rgba(255,189,63,0.5)] scale-[1.02]" : ""}
                    ${isLocked ? "bg-[#030b14]/50 border-slate-700 opacity-50 border-dashed" : ""}
                  `}
                >
                  {/* Efek Garis Background untuk Active Quest */}
                  {isActive && <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,189,63,0.05)_10px,rgba(255,189,63,0.05)_20px)] pointer-events-none" />}

                  <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4 mb-2">
                    <h2 className={`text-xl md:text-2xl font-black uppercase tracking-wider ${isActive ? "text-white" : "text-slate-300"}`}>{quest.title}</h2>
                    <span
                      className={`flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest px-3 py-1 border whitespace-nowrap self-start
                        ${isDone ? "bg-transparent border-[#005692] text-[#005692]" : ""}
                        ${isActive ? "bg-[#ffbd3f] border-[#ffbd3f] text-[#030b14] animate-pulse" : ""}
                        ${isLocked ? "bg-transparent border-slate-700 text-slate-700" : ""}
                      `}
                    >
                      {/* Ikon peringatan untuk Main Quest yang sedang aktif */}
                      {isActive && <FaExclamationTriangle />}
                      {isActive ? "MAIN QUEST" : quest.date}
                    </span>
                  </div>

                  <p className={`text-sm md:text-base leading-relaxed ${isActive ? "text-[#ffbd3f]" : "text-slate-400"}`}>{quest.description}</p>

                  {isActive && (
                    <div className="mt-4 flex items-center gap-2">
                      <span className="h-[2px] w-full bg-[#ffbd3f]/30" />
                      <span className="text-[#ffbd3f] text-[10px] uppercase tracking-[0.2em] whitespace-nowrap font-bold">In Progress</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
