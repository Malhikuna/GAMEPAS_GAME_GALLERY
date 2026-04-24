"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gamesData from "../data/games.json";

export default function Home() {
  // Melacak indeks game yang sedang aktif di-klik
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGame = gamesData[activeIndex];

  // RPG biasanya punya slot tetap. Kita buat 24 kotak inventory.
  const TOTAL_SLOTS = 24;
  const inventorySlots = Array.from({ length: TOTAL_SLOTS }).map((_, i) => gamesData[i] || null);

  return (
    // Background bergaya meja kayu gelap atau tekstur tavern
    <main className="min-h-screen bg-[#050a0f] text-slate-200 flex items-center justify-center p-4 md:p-8 font-mono selection:bg-[#ffbd3f] selection:text-[#005692]">
      {/* Ornamen Background (Opsional, agar tidak terlalu kosong) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#005692]/10 via-transparent to-transparent pointer-events-none" />

      {/* Main RPG Menu Container */}
      <div className="relative w-full max-w-6xl aspect-auto md:aspect-[16/9] flex flex-col md:flex-row gap-6 md:gap-8 z-10">
        {/* =========================================
            PANEL KIRI: ITEM STATUS / DETAILS
            ========================================= */}
        <div className="w-full md:w-5/12 bg-[#005692]/90 border-[6px] border-double border-[#ffbd3f] rounded-sm p-4 md:p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] flex flex-col">
          <div className="flex justify-between items-start mb-4 border-b-2 border-[#ffbd3f]/30 pb-4">
            <h2 className="text-2xl font-bold text-[#ffbd3f] uppercase tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">Item Stats</h2>
            <img src="/gamepas_logo.png" alt="Logo" className="h-8 object-contain drop-shadow-md" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeGame.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} className="flex-1 flex flex-col">
              {/* Gambar / Preview Item */}
              <div className="w-full h-48 md:h-56 border-4 border-[#030b14] bg-black mb-6 relative overflow-hidden shadow-inner group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeGame.thumbnail} alt={activeGame.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pixelated-optional" />
                <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 text-[10px] text-white border border-white/20">LVL. {activeGame.id}</div>
              </div>

              {/* Status Atribut */}
              <div className="space-y-4 flex-1">
                <div>
                  <h1 className="text-3xl font-black text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] uppercase">{activeGame.title}</h1>
                </div>

                <div className="bg-[#030b14]/50 p-4 border border-white/10 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#ffbd3f]">Class (Genre):</span>
                    <span className="text-white text-right">{activeGame.genre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#ffbd3f]">Guild (Dev):</span>
                    <span className="text-white text-right">{activeGame.developer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#ffbd3f]">Weapon (Engine):</span>
                    <span className="text-white text-right">{activeGame.engine}</span>
                  </div>
                </div>
              </div>

              {/* Tombol Equip / Play */}
              <a
                href={activeGame.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block w-full text-center bg-[#ffbd3f] text-[#030b14] py-3 font-bold uppercase tracking-widest border-b-4 border-r-4 border-[#b8860b] hover:bg-white hover:border-slate-300 active:border-t-4 active:border-l-4 active:border-b-0 active:border-r-0 active:mt-[28px] transition-all"
              >
                [ Equip / Play ]
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =========================================
            PANEL KANAN: INVENTORY GRID
            ========================================= */}
        <div className="w-full md:w-7/12 bg-[#005692]/90 border-[6px] border-double border-[#ffbd3f] rounded-sm p-4 md:p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] flex flex-col">
          <div className="flex justify-between items-end mb-6 border-b-2 border-[#ffbd3f]/30 pb-4">
            <h2 className="text-2xl font-bold text-[#ffbd3f] uppercase tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">Inventory</h2>
            <span className="text-sm text-slate-300 uppercase">
              Capacity: {gamesData.length} / {TOTAL_SLOTS}
            </span>
          </div>

          {/* Grid Slots */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 md:gap-3 flex-1 content-start overflow-y-auto pr-2 custom-scrollbar">
            {inventorySlots.map((item, index) => {
              const isActive = index === activeIndex;
              const isEmpty = !item;

              return (
                <button
                  key={index}
                  onClick={() => !isEmpty && setActiveIndex(index)}
                  disabled={isEmpty}
                  className={`
                    relative aspect-square border-2 transition-all duration-200
                    ${isEmpty ? "bg-[#030b14]/40 border-black/50 cursor-not-allowed shadow-inner" : "bg-[#030b14] cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"}
                    ${isActive && !isEmpty ? "border-[#ffbd3f] shadow-[0_0_15px_rgba(255,189,63,0.8)] z-10 scale-105" : "border-[#005692]"}
                  `}
                >
                  {/* Jika slot ada isinya, render thumbnail */}
                  {!isEmpty && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.thumbnail} alt={item.title} className={`w-full h-full object-cover p-1 ${isActive ? "opacity-100" : "opacity-70 hover:opacity-100"}`} />
                      {/* Tanda panah kecil di atas item yang aktif */}
                      {isActive && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-[6px] border-transparent border-t-[#ffbd3f] animate-bounce" />}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
