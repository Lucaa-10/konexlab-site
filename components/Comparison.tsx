import React from 'react';
import { FadeIn } from './FadeIn';

export const Comparison = () => (
    <section id="compare-section" className="w-full max-w-4xl mx-auto px-4 mb-32 relative z-10">
        <FadeIn>
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">Pourquoi choisir Konexlab ?</h2>
                <p className="text-slate-400">Le futur vs le passé.</p>
            </div>

            <div className="bg-[#2C343D]/40 backdrop-blur-md rounded-3xl border border-[#E0A32B]/10 overflow-hidden relative">
                {/* Neon Glow Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#E0A32B] to-transparent opacity-30"></div>

                <div className="grid grid-cols-3 bg-[#E0A32B]/5 p-6 text-center border-b border-[#E0A32B]/5">
                    <div></div>
                    <div className="font-display font-bold text-[#F2F3F4] text-lg tracking-wide">Konexlab</div>
                    <div className="font-display font-bold text-[#8B8589]/60 text-lg">Élec Classique</div>
                </div>
                <div className="p-4">
                    {[
                        { label: "Budget", k: "Fixe & Transparent", e: "Variable & Flou" },
                        { label: "Installation", k: "Sans fil (Propre)", e: "Saignées & Poussière" },
                        { label: "Pilotage", k: "App Unique (Intuitive)", e: "Complexe / Inexistant" },
                        { label: "Évolutivité", k: "Illimitée", e: "Figée" },
                        { label: "Design", k: "Premium & Discret", e: "Daté" }
                    ].map((row, i) => (
                        <div key={i} className="grid grid-cols-3 items-center py-6 border-b border-[#E0A32B]/5 last:border-0 hover:bg-[#E0A32B]/[0.02] transition-colors rounded-xl px-4 group">
                            <div className="font-bold text-[#8B8589] text-sm">{row.label}</div>
                            <div className="flex justify-center">
                                <span className="font-bold text-[#2C343D] bg-[#E0A32B] px-4 py-1.5 rounded-full text-xs sm:text-sm border border-[#E0A32B]/20 shadow-[0_0_15px_-5px_rgba(224,163,43,0.4)] group-hover:shadow-[0_0_20px_-5px_rgba(224,163,43,0.6)] transition-all">
                                    {row.k}
                                </span>
                            </div>
                            <div className="text-center text-[#8B8589]/60 text-xs sm:text-sm font-medium">{row.e}</div>
                        </div>
                    ))}
                </div>
            </div>
        </FadeIn>
    </section>
);
