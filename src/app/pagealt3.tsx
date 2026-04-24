"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gamesData from "../data/games.json"; // Pastikan path sesuai

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGame = gamesData[activeIndex];

  const TOTAL_SLOTS = 24;
  const inventorySlots = Array.from({ length: TOTAL_SLOTS }).map((_, i) => gamesData[i] || null);

  return (
    <main className="relative min-h-screen bg-[#0a0c10] overflow-hidden flex flex-col items-center justify-between py-6 md:py-10 px-4 md:px-8 font-mono selection:bg-[#ffbd3f] selection:text-[#005692]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#005692]/10 via-[#0a0c10] to-[#0a0c10] pointer-events-none" />

      {/* ELEMEN FISIK KABINET: Gril Speaker Atas */}
      <div className="w-full max-w-4xl flex justify-between px-16 mb-6 opacity-40 pointer-events-none z-0">
        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-[#050608] border-[6px] border-[#12161c] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)] grid grid-cols-3 gap-1 p-2 md:p-3">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-black/50 rounded-full w-full h-full" />
          ))}
        </div>
        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-[#050608] border-[6px] border-[#12161c] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)] grid grid-cols-3 gap-1 p-2 md:p-3">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-black/50 rounded-full w-full h-full" />
          ))}
        </div>
      </div>

      {/* =========================================
          ARCADE MONITOR BEZEL (Layar CRT)
          PERBAIKAN: Hapus aspect-[16/9], gunakan min-h-[700px] & flex-1 
          agar layar bisa memanjang ke bawah mengisi ruang vertikal
          ========================================= */}
      <div className="relative w-full max-w-6xl flex-1 min-h-[600px] md:min-h-[700px] flex flex-col bg-[#020508] border-[12px] md:border-[20px] border-[#12161c] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8),_inset_0_0_100px_rgba(0,0,0,1)] overflow-hidden p-6 md:p-10 z-20">
        {/* EFEK VISUAL MONITOR CRT */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent_0px,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] pointer-events-none z-50 mix-blend-overlay" />
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] pointer-events-none z-50" />
        <div className="absolute inset-0 bg-[#005692]/5 mix-blend-screen pointer-events-none z-40" />

        {/* --- START OF KONTEN RPG --- */}
        <div className="relative w-full h-full flex flex-col md:flex-row gap-6 md:gap-10 z-10 overflow-y-auto md:overflow-hidden pb-2">
          {/* PANEL KIRI: ITEM STATUS / DETAILS */}
          <div className="w-full md:w-5/12 bg-[#005692]/90 border-[6px] border-double border-[#ffbd3f] rounded-sm p-5 md:p-8 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] flex flex-col">
            <div className="flex justify-between items-start mb-6 border-b-2 border-[#ffbd3f]/30 pb-4">
              <h2 className="text-xl md:text-3xl font-bold text-[#ffbd3f] uppercase tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">Item Stats</h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gamepas_logo.png" alt="Logo" className="h-6 md:h-10 object-contain drop-shadow-md" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeGame.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} className="flex-1 flex flex-col">
                <div className="w-full h-48 md:h-64 border-4 border-[#030b14] bg-black mb-6 relative overflow-hidden shadow-inner group flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activeGame.thumbnail} alt={activeGame.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-black/80 px-2 py-1 text-xs text-white border border-white/20">LVL. {activeGame.id}</div>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] uppercase">{activeGame.title}</h1>
                  </div>

                  <div className="bg-[#030b14]/50 p-4 border border-white/10 text-sm space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#ffbd3f]">Class (Genre):</span>
                      <span className="text-white text-right font-semibold">{activeGame.genre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#ffbd3f]">Guild (Dev):</span>
                      <span className="text-white text-right font-semibold">{activeGame.developer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#ffbd3f]">Weapon (Engine):</span>
                      <span className="text-white text-right font-semibold">{activeGame.engine}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={activeGame.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block w-full text-center bg-[#ffbd3f] text-[#030b14] py-4 md:py-5 font-black uppercase tracking-[0.3em] border-b-[6px] border-r-[6px] border-[#b8860b] hover:bg-white hover:border-slate-300 active:border-t-[6px] active:border-l-[6px] active:border-b-0 active:border-r-0 active:mt-[30px] transition-all"
                >
                  [ Equip / Play ]
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PANEL KANAN: INVENTORY GRID */}
          <div className="w-full md:w-7/12 bg-[#005692]/90 border-[6px] border-double border-[#ffbd3f] rounded-sm p-5 md:p-8 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] flex flex-col h-full">
            <div className="flex justify-between items-end mb-6 border-b-2 border-[#ffbd3f]/30 pb-4 flex-shrink-0">
              <h2 className="text-xl md:text-3xl font-bold text-[#ffbd3f] uppercase tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">Inventory</h2>
              <span className="text-sm font-semibold text-slate-300 uppercase">
                Capacity: {gamesData.length} / {TOTAL_SLOTS}
              </span>
            </div>

            {/* Grid Slots */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 md:gap-4 flex-1 content-start overflow-y-auto pr-3 custom-scrollbar h-full pb-4">
              {inventorySlots.map((item, index) => {
                const isActive = index === activeIndex;
                const isEmpty = !item;

                return (
                  <button
                    key={index}
                    onClick={() => !isEmpty && setActiveIndex(index)}
                    disabled={isEmpty}
                    className={`
                      relative aspect-square border-[3px] transition-all duration-200
                      ${isEmpty ? "bg-[#030b14]/40 border-black/50 cursor-not-allowed shadow-inner" : "bg-[#030b14] cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"}
                      ${isActive && !isEmpty ? "border-[#ffbd3f] shadow-[0_0_15px_rgba(255,189,63,0.8)] z-10 scale-105" : "border-[#005692]"}
                    `}
                  >
                    {!isEmpty && (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.thumbnail} alt={item.title} className={`w-full h-full object-cover p-1 md:p-1.5 ${isActive ? "opacity-100" : "opacity-70 hover:opacity-100"}`} />
                        {isActive && <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-[#ffbd3f] animate-bounce" />}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ELEMEN FISIK KABINET: Panel Kontrol Bawah (Joystick & Tombol) */}
      <div className="w-full max-w-4xl flex items-center justify-between mt-8 px-10 md:px-20 opacity-60 pointer-events-none z-0">
        <div className="relative w-16 h-16 md:w-24 md:h-24 bg-[#1a1a1a] rounded-full border-[8px] md:border-[12px] border-[#0a0a0a] shadow-inner flex items-center justify-center">
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-red-600 shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.5)] border-2 border-red-800" />
          <div className="absolute w-2 md:w-3 h-10 md:h-14 bg-zinc-600 bottom-[-20px] md:bottom-[-28px] -z-10" />
        </div>

        <div className="flex gap-4 md:gap-6 rotate-[-15deg]">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 border-[5px] md:border-[6px] border-[#0a0a0a] shadow-[0_5px_0_#0a0a0a,inset_0_2px_5px_rgba(255,255,255,0.4)] active:translate-y-1 active:shadow-none" />
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-emerald-500 border-[5px] md:border-[6px] border-[#0a0a0a] shadow-[0_5px_0_#0a0a0a,inset_0_2px_5px_rgba(255,255,255,0.4)] mt-4 md:mt-6 active:translate-y-1 active:shadow-none" />
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-yellow-500 border-[5px] md:border-[6px] border-[#0a0a0a] shadow-[0_5px_0_#0a0a0a,inset_0_2px_5px_rgba(255,255,255,0.4)] mt-8 md:mt-12 active:translate-y-1 active:shadow-none" />
        </div>
      </div>
    </main>
  );
}
