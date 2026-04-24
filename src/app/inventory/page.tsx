"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gamesData from "../../data/games.json";

export default function InventoryPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGame = gamesData[activeIndex];

  const TOTAL_SLOTS = 15;
  const inventorySlots = Array.from({ length: TOTAL_SLOTS }).map((_, i) => gamesData[i] || null);

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row gap-4 md:gap-8 z-10 overflow-hidden">
      {/* PANEL KIRI: ITEM STATUS */}
      <div className="w-full md:w-5/12 bg-[#005692]/90 border-[6px] border-double border-[#ffbd3f] rounded-sm p-4 md:p-5 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] flex flex-col h-full">
        <div className="flex justify-between items-start mb-3 md:mb-4 border-b-2 border-[#ffbd3f]/30 pb-2 md:pb-3 flex-shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-[#ffbd3f] uppercase tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">Item Stats</h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeGame.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="w-full h-36 md:h-60 border-4 border-[#030b14] bg-black mb-3 md:mb-4 relative overflow-hidden shadow-inner group flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeGame.thumbnail} alt={activeGame.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 text-[10px] md:text-xs text-white border border-white/20">LVL. {activeGame.id}</div>
            </div>

            <div className="space-y-2 md:space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] uppercase leading-tight">{activeGame.title}</h1>
              </div>

              <div className="bg-[#030b14]/50 p-2 md:p-3 border border-white/10 text-xs md:text-sm space-y-1.5 md:space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#ffbd3f]">Genre:</span>
                  <span className="text-white text-right font-semibold">{activeGame.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#ffbd3f]">Dev:</span>
                  <span className="text-white text-right font-semibold">{activeGame.developer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#ffbd3f]">Engine:</span>
                  <span className="text-white text-right font-semibold">{activeGame.engine}</span>
                </div>
              </div>
            </div>

            <a
              href={activeGame.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 md:mt-4 block w-full text-center bg-[#ffbd3f] text-[#030b14] py-2 md:py-3 font-black uppercase tracking-[0.2em] border-b-[4px] border-r-[4px] border-[#b8860b] hover:bg-white hover:border-slate-300 active:border-t-[4px] active:border-l-[4px] active:border-b-0 active:border-r-0 active:mt-[16px] md:active:mt-[20px] transition-all flex-shrink-0 text-sm md:text-base"
            >
              [ Equip / Play ]
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PANEL KANAN: INVENTORY GRID */}
      <div className="w-full md:w-7/12 bg-[#005692]/90 border-[6px] border-double border-[#ffbd3f] rounded-sm p-4 md:p-5 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] flex flex-col h-full">
        <div className="flex justify-between items-end mb-4 border-b-2 border-[#ffbd3f]/30 pb-2 md:pb-3 flex-shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-[#ffbd3f] uppercase tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">Inventory</h2>
          <span className="text-xs md:text-sm font-semibold text-slate-300 uppercase">
            Capacity: {gamesData.length} / {TOTAL_SLOTS}
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 md:gap-4 flex-1 content-start overflow-y-auto p-4 custom-scrollbar">
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
                    <img src={item.thumbnail} alt={item.title} className={`w-full h-full object-cover p-1 ${isActive ? "opacity-100" : "opacity-70 hover:opacity-100"}`} />
                    {isActive && <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] md:border-t-[8px] border-transparent border-t-[#ffbd3f] animate-bounce" />}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
