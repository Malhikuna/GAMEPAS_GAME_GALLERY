"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import guildMembers from "../../data/members.json";

export default function GuildPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState("ALL");

  const filteredMembers = useMemo(() => {
    if (filter === "ALL") return guildMembers;
    return guildMembers.filter((m) => m.role.toUpperCase() === filter);
  }, [filter]);

  const activeMember = filteredMembers[activeIndex] || filteredMembers[0];

  return (
    <div className="relative w-full h-full flex flex-col z-10 overflow-hidden p-2 md:p-4">
      {/* Header ala Layar Seleksi Karakter */}
      <div className="text-center mb-4 flex-shrink-0">
        <motion.h1 animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-[#ffbd3f] text-2xl md:text-4xl font-black tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(255,189,63,0.8)]">
          Choose Your Fighter
        </motion.h1>
        <p className="text-[#005692] text-xs md:text-sm tracking-widest uppercase mt-1">Guild Roster - Gamepas Study Club</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1 overflow-hidden">
        {/* PANEL KIRI: DETAIL KARAKTER (BIG PORTRAIT) */}
        <div className="w-full md:w-5/12 bg-[#005692]/20 border-4 border-[#005692] rounded-sm p-4 flex flex-col relative shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffbd3f] to-transparent opacity-50" />

          <AnimatePresence mode="wait">
            {activeMember && (
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, scale: 0.9, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <div className="w-full aspect-square md:aspect-[4/3] bg-[#030b14] border-4 border-[#ffbd3f] mb-4 relative overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(255,189,63,0.3)] flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activeMember.avatar} alt={activeMember.name} className="w-3/4 h-3/4 object-contain rendering-pixelated" />
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs text-[#ffbd3f] border border-[#ffbd3f]/50 font-bold">LVL. {activeMember.level}</div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3 pb-2">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase drop-shadow-[2px_2px_0px_rgba(0,86,146,1)] leading-tight">{activeMember.name}</h2>
                    <p className="text-[#ffbd3f] text-sm tracking-widest uppercase mt-1">"{activeMember.title}"</p>
                  </div>

                  <div className="bg-[#030b14]/80 p-3 border border-[#005692] text-xs md:text-sm space-y-2">
                    {/* PERBAIKAN: Role dipisah ke barisnya sendiri */}
                    <div className="flex justify-between border-b border-white/10 pb-1">
                      <span className="text-slate-400">Role:</span>
                      <span className="text-white font-bold text-right">{activeMember.role}</span>
                    </div>

                    {/* PERBAIKAN: Division dipisah ke barisnya sendiri (Hanya tampil jika ada data divisi) */}
                    {activeMember.division && (
                      <div className="flex justify-between border-b border-white/10 pb-1">
                        <span className="text-slate-400">Division:</span>
                        <span className="text-white font-bold text-right">{activeMember.division}</span>
                      </div>
                    )}

                    <div>
                      <span className="text-slate-400 block mb-1">Core Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeMember.skills.map((skill, idx) => (
                          <span key={idx} className="bg-[#005692] text-white px-2 py-0.5 text-[10px] uppercase border border-blue-400/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PANEL KANAN: GRID AVATAR ANGGOTA & FILTER */}
        <div className="w-full md:w-7/12 flex flex-col h-full overflow-hidden">
          {/* TABS FILTER */}
          <div className="flex gap-2 mb-3 flex-shrink-0">
            {["ALL", "PENGURUS", "MEMBER"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setFilter(tab);
                  setActiveIndex(0); // Reset seleksi
                }}
                className={`flex-1 py-1.5 text-xs md:text-sm font-bold tracking-widest uppercase transition-all border-b-4 border-r-2 ${
                  filter === tab ? "bg-[#ffbd3f] text-[#030b14] border-[#b8860b]" : "bg-[#030b14] text-[#005692] border-[#005692] hover:bg-[#005692]/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* GRID AVATAR */}
          <div className="bg-[#030b14]/50 border-4 border-[#005692] p-4 flex-1 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-5 gap-2 md:gap-3">
              {filteredMembers.map((member, index) => {
                const isActive = index === activeIndex;
                const isPengurus = member.role === "Pengurus";

                return (
                  <button
                    key={member.id}
                    onClick={() => setActiveIndex(index)}
                    className={`
                        relative aspect-square border-2 transition-all duration-200 overflow-hidden
                        ${
                          isActive
                            ? "border-[#ffbd3f] shadow-[0_0_15px_rgba(255,189,63,0.8)] z-10 scale-110 bg-[#005692]/40"
                            : isPengurus
                              ? "border-yellow-600/50 bg-[#030b14] hover:border-yellow-500 hover:scale-105 opacity-80 hover:opacity-100"
                              : "border-[#005692]/50 bg-[#030b14] hover:border-blue-400 hover:scale-105 opacity-60 hover:opacity-100"
                        }
                      `}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-contain p-1 rendering-pixelated" />

                    {/* Badge Pengurus */}
                    {!isActive && isPengurus && <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-500 rounded-bl-sm" />}

                    {/* Efek seleksi */}
                    {isActive && <div className="absolute -left-1 top-1/2 -translate-y-1/2 text-[#ffbd3f] text-[10px] animate-pulse">▶</div>}
                  </button>
                );
              })}

              {/* Slot Kosong untuk estetika arcade */}
              {[...Array(Math.max(0, 15 - filteredMembers.length))].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square bg-[#030b14]/30 border-2 border-[#005692]/20 flex items-center justify-center">
                  <span className="text-[#005692]/40 text-xs">?</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hint Bawah */}
          <div className="mt-3 text-center text-[#005692] text-xs font-bold tracking-widest uppercase flex-shrink-0">Total Displayed: {filteredMembers.length}</div>
        </div>
      </div>
    </div>
  );
}
