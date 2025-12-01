import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ShieldCheck, Twitter } from 'lucide-react';

interface FooterProps {
    onOpenLegal: () => void;
    onOpenFaq: () => void;
    onScrollToConfig: () => void;
    onScrollToCompare: () => void;
    onScrollHome: () => void;
}

export const Footer = ({ onOpenLegal, onOpenFaq, onScrollToConfig, onScrollToCompare, onScrollHome }: FooterProps) => (
    <footer className="relative bg-[#2C343D] border-t border-[#E0A32B]/10 pt-20 pb-10 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E0A32B]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-[#E0A32B]/10 border border-[#E0A32B]/20">
                            <ShieldCheck className="text-[#F2F3F4] w-6 h-6" />
                        </div>
                        <span className="text-2xl tracking-tight text-[#F2F3F4] font-display">
                            <span className="font-light text-[#E0A32B]">Konex</span>
                            <span className="font-bold">lab</span>
                        </span>
                    </div>
                    <p className="text-[#8B8589] text-sm leading-relaxed max-w-sm">
                        La sécurité intelligente, sans abonnement, sans complexité. <br />
                        Propriété totale de votre matériel. Installation par des experts.
                    </p>
                </div>

                <div>
                    <h4 className="font-display font-bold text-[#F2F3F4] mb-6">Navigation</h4>
                    <ul className="space-y-4">
                        {['Accueil', 'Configurateur', 'Comparatif', 'Contact'].map((item) => (
                            <li key={item}>
                                <a href="#" className="text-sm text-[#8B8589] hover:text-[#F2F3F4] transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-[#8B8589] group-hover:bg-[#F2F3F4] transition-colors"></span>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-display font-bold text-[#F2F3F4] mb-6">Légal</h4>
                    <ul className="space-y-4">
                        {['Mentions Légales', 'CGV', 'Confidentialité'].map((item) => (
                            <li key={item}>
                                <a href="#" className="text-sm text-[#8B8589] hover:text-[#F2F3F4] transition-colors">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="pt-8 border-t border-[#E0A32B]/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-[#8B8589]">
                    © 2024 Konexlab. Tous droits réservés.
                </p>
                <div className="flex items-center gap-6">
                    <a href="https://www.instagram.com/konexlab?igsh=bmM4bm5tNTB5Z3lq&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-[#8B8589] hover:text-[#F2F3F4] transition-colors hover:scale-110 transform duration-200">
                        <Instagram size={18} />
                    </a>
                    <a href="https://www.facebook.com/share/17nz8GQMfT/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-[#8B8589] hover:text-[#F2F3F4] transition-colors hover:scale-110 transform duration-200">
                        <Facebook size={18} />
                    </a>
                    {[Linkedin, Twitter].map((Icon, i) => (
                        <a key={i} href="#" className="text-[#8B8589] hover:text-[#F2F3F4] transition-colors hover:scale-110 transform duration-200">
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);
