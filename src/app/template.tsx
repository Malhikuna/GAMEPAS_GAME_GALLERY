"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading 1.5 detik agar animasinya terlihat jelas
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="retro-loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            // Background tetap sama seperti Home (Biru Tua Gelap), z-index di bawah kaca CRT
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#030b14] font-mono rounded-[2rem] md:rounded-[3rem] overflow-hidden"
          >
            {/* Ambient Glow di tengah layar (Sama persis dengan Home) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#005692]/25 via-transparent to-transparent pointer-events-none" />

            {/* Kontainer Loading Baru yang Minimalis */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Teks "LOADING" dengan Efek Mengetik */}
              <div className="flex gap-1">
                {"LOADING".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.1,
                      delay: i * 0.1, // Jeda antar huruf 0.1 detik
                      ease: "easeInOut",
                    }}
                    className="text-[#ffbd3f] text-3xl md:text-4xl font-black tracking-widest uppercase drop-shadow-[0_0_8px_rgba(255,189,63,0.5)]"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Animasi Baris Piksel Horizontal */}
              <div className="flex gap-2">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      // Efek pendaran neon yang mengalir
                      opacity: [0.2, 1, 0.2],
                      scale: [1, 1.2, 1],
                      boxShadow: ["0 0 0px rgba(0, 140, 255, 0)", "0 0 15px rgba(0, 140, 255, 0.8)", "0 0 0px rgba(0, 140, 255, 0)"],
                    }}
                    transition={{
                      duration: 1, // Total durasi satu siklus
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.08, // Jeda antar piksel untuk efek mengalir
                    }}
                    // Piksel kotak kecil warna biru neon
                    className="w-3 h-3 bg-[#008cff] rounded-sm"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konten Asli Halaman */}
      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="w-full h-full flex-1">
          {children}
        </motion.div>
      )}
    </div>
  );
}
