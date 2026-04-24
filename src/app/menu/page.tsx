"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function MainMenu() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Daftar menu yang akan ditampilkan
  const menuItems = [
    { title: "Game Inventory", path: "/inventory" },
    { title: "Active Timeline", path: "/timeline" },
    { title: "Guild Roster (Members)", path: "/guild" },
    { title: "Read Lore (About Us)", path: "/lore" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center font-mono z-10">
      {/* Judul Menu */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-12 text-center">
        <h1 className="text-[#ffbd3f] text-4xl md:text-6xl font-black tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,189,63,0.5)] uppercase">Main Menu</h1>
        <div className="h-1 w-full bg-[#005692] mt-4 opacity-50" />
      </motion.div>

      {/* List Menu Vertikal */}
      <div className="flex flex-col gap-4 md:gap-6 w-full max-w-md px-8">
        {menuItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex items-center cursor-pointer"
            >
              {/* Kursor Panah (Hanya muncul saat di-hover) */}
              <div className={`absolute -left-8 md:-left-12 text-[#ffbd3f] text-xl md:text-2xl transition-opacity duration-200 ${hoveredIndex === index ? "opacity-100 animate-pulse" : "opacity-0"}`}>►</div>

              {/* Teks Menu */}
              <h2
                className={`text-xl md:text-2xl font-bold tracking-widest uppercase transition-all duration-300 ${
                  hoveredIndex === index ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-105" : "text-[#005692] drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                }`}
              >
                {item.title}
              </h2>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Instruksi Bawah */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="absolute bottom-10 text-[#005692] text-xs md:text-sm tracking-[0.3em] uppercase opacity-60">
        Select Your Destiny
      </motion.div>
    </div>
  );
}
