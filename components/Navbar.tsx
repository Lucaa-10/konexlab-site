import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Menu } from 'lucide-react';

interface NavbarProps {
    onOpenMenu: () => void;
    onScrollToConfig: () => void;
    onScrollToCompare: () => void;
}

export const Navbar = ({ onOpenMenu, onScrollToConfig, onScrollToCompare }: NavbarProps) => (
    <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
        <div className="w-full max-w-5xl bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/20 px-6 py-4 flex items-center justify-between">
            <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-[#E0A32B]/20 blur-lg rounded-full group-hover:bg-[#E0A32B]/40 transition-all"></div>
                    <div className="relative p-2 rounded-lg bg-[#E0A32B]/5 border border-[#E0A32B]/10 group-hover:bg-[#E0A32B]/10 transition-all">
                        <ShieldCheck className="text-[#F2F3F4] w-5 h-5" />
                    </div>
                </div>
                <span className="text-xl tracking-tight text-[#F2F3F4] font-display">
                    <span className="font-light text-[#E0A32B]">Konex</span>
                    <span className="font-bold">lab</span>
                </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
                <button onClick={onScrollToConfig} className="text-sm font-medium text-[#8B8589] hover:text-[#F2F3F4] transition-colors hover:scale-105 transform duration-200">Configurateur</button>
                <button onClick={onScrollToCompare} className="text-sm font-medium text-[#8B8589] hover:text-[#F2F3F4] transition-colors hover:scale-105 transform duration-200">Konexlab vs Élec</button>
                <a href="mailto:Luca.clarembaux@hotmail.com" className="group relative px-6 py-2.5 rounded-full bg-[#E0A32B] text-[#2C343D] text-xs font-bold hover:bg-white transition-all overflow-hidden">
                    <span className="relative z-10">Contact</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </a>
            </div>
            <button onClick={onOpenMenu} className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Menu className="w-6 h-6" />
            </button>
        </div>
    </motion.nav>
);
