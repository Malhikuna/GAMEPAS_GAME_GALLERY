"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaArrowLeft, FaGamepad, FaVideo, FaUsers } from "react-icons/fa";
import gamesData from "../../../data/games.json";

// Interface untuk member agar TypeScript tidak bingung
interface PartyMember {
  name: string;
  role: string;
}

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();

  // Mencari game berdasarkan ID dari URL
  const game = gamesData.find((g) => g.id.toString() === params.id);

  // Jika game tidak ditemukan (ID salah)
  if (!game) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center font-mono">
        <h1 className="text-red-500 text-4xl font-black mb-4 uppercase">Error 404</h1>
        <p className="text-white mb-8">Cartridge Not Found.</p>
        <button onClick={() => router.push("/inventory")} className="text-[#ffbd3f] hover:underline uppercase">
          Return to Inventory
        </button>
      </div>
    );
  }

  // Fallback data jika di JSON belum ada atribut 'members'
  // @ts-ignore
  const partyMembers: PartyMember[] = game.members || [];

  return (
    <div className="relative w-full h-full flex flex-col z-10 p-4 md:p-8 font-mono">
      {/* Tombol Back */}
      <div className="mb-4 flex-shrink-0">
        <button onClick={() => router.push("/inventory")} className="flex items-center gap-2 text-[#005692] hover:text-[#ffbd3f] transition-colors font-bold uppercase tracking-widest text-sm cursor-pointer">
          <FaArrowLeft /> Back to Vault
        </button>
      </div>

      {/* Kontainer Utama Detail Game */}
      <div className="flex-1 bg-[#030b14]/80 border-[4px] border-double border-[#ffbd3f] p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-6 md:gap-10 overflow-y-auto custom-scrollbar shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
        {/* KOLOM KIRI: Static Thumbnail & Play Button */}
        <div className="w-full md:w-4/12 lg:w-3/12 flex-shrink-0 flex flex-col gap-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full aspect-square bg-black border-4 border-[#005692] overflow-hidden shadow-[0_0_20px_rgba(0,86,146,0.4)] relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent_0px,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] pointer-events-none" />
          </motion.div>

          <a
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-[#ffbd3f] text-[#030b14] py-4 font-black uppercase tracking-[0.2em] border-b-[6px] border-r-[6px] border-[#b8860b] hover:bg-white active:border-t-[6px] active:border-l-[6px] active:border-b-0 active:border-r-0 active:translate-y-[6px] active:translate-x-[6px] transition-all text-sm md:text-base"
          >
            <FaGamepad className="text-xl" /> Play
          </a>
        </div>

        {/* KOLOM KANAN: Konten Utama (Video -> Info -> Log) */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="w-full md:w-8/12 lg:w-9/12 flex flex-col gap-6">
          {/* HEADER VIDEO */}
          {/* @ts-ignore */}
          {game.video && (
            <div className="w-full">
              <h3 className="text-[#ffbd3f] text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <FaVideo className="text-xs" /> Visual Feed
              </h3>
              <div className="w-full aspect-video bg-black border-4 border-[#005692] overflow-hidden shadow-[0_0_20px_rgba(0,86,146,0.4)] relative">
                <iframe
                  // @ts-ignore
                  src={game.video}
                  className="w-full h-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {/* Efek scanlines tipis di atas video */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent_0px,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] pointer-events-none" />
              </div>
            </div>
          )}

          {/* Header Title (Judul & Tag) */}
          <div className="border-b-2 border-[#005692]/50 pb-4">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase drop-shadow-[2px_2px_0px_rgba(0,86,146,1)] leading-none mb-2">{game.title}</h1>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#005692] text-white px-2 py-1 text-xs uppercase font-bold tracking-widest">{game.genre}</span>
              <span className="bg-[#12161c] text-[#ffbd3f] px-2 py-1 text-xs uppercase font-bold tracking-widest border border-[#ffbd3f]/30">LVL. {game.id}</span>
            </div>
          </div>

          {/* Spesifikasi (Grid) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#005692]/10 p-3 border border-[#005692]/30">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Developer</p>
              <p className="text-white font-bold">{game.developer}</p>
            </div>
            <div className="bg-[#005692]/10 p-3 border border-[#005692]/30">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Engine Built</p>
              <p className="text-white font-bold">{game.engine}</p>
            </div>
          </div>

          {/* Party Members (Anggota Tim) - PERBAIKAN STRUKTUR ROLE */}
          <div>
            <h3 className="text-[#ffbd3f] text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <FaUsers className="text-xs" /> Credits / Party Members
            </h3>
            <div className="flex flex-wrap gap-3">
              {partyMembers.length > 0 ? (
                partyMembers.map((member, idx) => (
                  <div key={idx} className="bg-[#030b14] border border-[#005692] flex flex-col px-3 py-2 shadow-[2px_2px_0px_rgba(0,86,146,0.5)] min-w-[140px]">
                    <span className="text-[#ffbd3f] text-[10px] uppercase font-bold tracking-widest mb-0.5 border-b border-[#005692]/50 pb-0.5">{member.role}</span>
                    <span className="text-white text-sm uppercase font-black tracking-wider">{member.name}</span>
                  </div>
                ))
              ) : (
                <span className="text-slate-500 text-xs italic tracking-widest uppercase bg-[#030b14] p-2 border border-slate-800">Data Corrupted / Unknown</span>
              )}
            </div>
          </div>

          {/* Sinopsis / Deskripsi */}
          <div className="flex-1">
            <h3 className="text-[#ffbd3f] text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="text-sm">▶</span> System Logs
            </h3>
            <div className="bg-black/40 p-4 border-l-4 border-[#005692] h-full text-slate-300 text-sm leading-relaxed text-justify">
              <p>
                [INITIATING SECURE FEED...]
                <br />
                <br />
                {game.description}
                <br />
                <br />
                [END OF LOG]
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
