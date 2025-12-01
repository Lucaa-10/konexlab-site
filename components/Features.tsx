import React from 'react';
import { ScanSearch, Wrench, Wallet } from 'lucide-react';
import { FadeIn } from './FadeIn';

export const Features = () => (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 sm:py-32 relative z-10">
        <div className="text-center mb-20">
            <FadeIn>
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-[#F2F3F4] tracking-tighter mb-6 drop-shadow-lg">
                    L'approche <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2F3F4] to-[#E0A32B]">Konexlab</span>
                </h2>
                <p className="text-[#8B8589] mt-4 max-w-2xl mx-auto text-lg font-light leading-relaxed px-4">
                    On rend la maison intelligente simple, fiable et accessible. <br className="hidden sm:block" />
                    <span className="text-[#F2F3F4]/80 font-medium block mt-2">Une technologie invisible pour un confort visible.</span>
                </p>
            </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { icon: ScanSearch, title: "Analyse 360°", desc: "Chaque maison est unique. On scanne tes besoins pour une solution chirurgicale." },
                { icon: Wrench, title: "Installation Pro", desc: "Nos techniciens certifiés s'occupent de tout. Zéro câble apparent, zéro poussière." },
                { icon: Wallet, title: "Propriété Totale", desc: "Une fois acheté, le matériel est à toi. Aucun abonnement, aucun frais caché." }
            ].map((item, idx) => (
                <FadeIn key={idx} delay={idx * 0.1} className="group relative bg-[#2C343D]/50 backdrop-blur-sm rounded-[2rem] p-8 border border-[#E0A32B]/10 hover:border-[#E0A32B]/30 transition-all duration-500 hover:bg-[#2C343D]/80">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#E0A32B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"></div>

                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-[#2C343D] rounded-2xl flex items-center justify-center text-[#F2F3F4] mb-6 group-hover:scale-110 group-hover:bg-[#E0A32B]/10 transition-all duration-300 shadow-lg shadow-black/20">
                            <item.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-[#F2F3F4] mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                        <p className="text-sm text-[#8B8589] leading-relaxed group-hover:text-[#F2F3F4] transition-colors">{item.desc}</p>
                    </div>
                </FadeIn>
            ))}
        </div>
    </section>
);
