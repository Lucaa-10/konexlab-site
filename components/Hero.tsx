import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Settings, Wrench, UserCheck, CheckCircle2, Camera, Radio, DoorOpen, Shield, Flame, ChevronRight } from 'lucide-react';
import Camera3D from '../assets/camera-3d.png';

interface HeroProps {
    onOpenProduct: (id: string) => void;
    onOpenCheckout: () => void;
}

export const Hero = ({ onOpenProduct, onOpenCheckout }: HeroProps) => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    // Decoder Text Effect
    const DecoderText = ({ text, className }: { text: string, className?: string }) => {
        const [display, setDisplay] = React.useState('');

        React.useEffect(() => {
            let iteration = 0;
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
            const interval = setInterval(() => {
                setDisplay(text.split("").map((letter, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join(""));

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);

            return () => clearInterval(interval);
        }, [text]);

        return <span className={className}>{display}</span>;
    };

    // Typewriter Effect
    const TypewriterText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
        const [display, setDisplay] = React.useState('');

        React.useEffect(() => {
            const timeout = setTimeout(() => {
                let currentIndex = 0;
                const interval = setInterval(() => {
                    if (currentIndex <= text.length) {
                        setDisplay(text.slice(0, currentIndex));
                        currentIndex++;
                    } else {
                        clearInterval(interval);
                    }
                }, 100); // Speed of typing
                return () => clearInterval(interval);
            }, delay * 1000);
            return () => clearTimeout(timeout);
        }, [text, delay]);

        return (
            <span className={className}>
                {display}
                <span className="animate-pulse">|</span>
            </span>
        );
    };

    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-12 sm:pb-24">
            <div className="text-center mb-16 sm:mb-24 relative">
                {/* Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E0A32B]/10 rounded-full blur-[120px] pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold leading-[0.9] text-[#F2F3F4] tracking-tighter mb-6 cursor-default">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="block font-light italic text-3xl sm:text-4xl mb-4"
                        >
                            <span className="text-[#E0A32B]"><DecoderText text="Konex" /></span>
                            <span className="text-white">lab.</span>
                        </motion.div>
                        <div className="min-h-[1.8em] flex flex-col items-center justify-center">
                            <TypewriterText
                                text="La maison de demain."
                                className="text-gradient-pop block"
                                delay={0.5}
                            />
                        </div>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 mx-auto w-full max-w-xl relative z-10"
                >
                    <div className="grid grid-cols-3 items-center p-2 rounded-2xl glass-panel gap-1 sm:gap-2">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-1 sm:px-4 rounded-xl bg-[#E0A32B]/10 border border-[#E0A32B]/20">
                            <Settings className="text-[#E0A32B] w-3 h-3 sm:w-4 sm:h-4 animate-spin-slow" />
                            <span className="text-[10px] sm:text-xs font-bold text-[#E0A32B] uppercase tracking-wide">Config</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-1 sm:px-4 group">
                            <Wrench className="text-[#8B8589] w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" />
                            <span className="text-[10px] sm:text-xs font-bold text-[#8B8589] uppercase tracking-wide">Install</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-1 sm:px-4 group">
                            <UserCheck className="text-[#8B8589] w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] sm:text-xs font-bold text-[#8B8589] uppercase tracking-wide">Formation</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative w-full rounded-[3rem] bg-[#2C343D] border border-[#E0A32B]/20 p-6 sm:p-12 shadow-2xl overflow-hidden group/container"
            >
                {/* Background Atmosphere */}
                <div className="absolute inset-0 bg-[#2C343D]">
                    <div className="absolute top-[-50%] left-[-20%] w-[1000px] h-[1000px] bg-[#1A2026] rounded-full blur-[150px] animate-pulse duration-[10000ms]"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#E0A32B]/5 rounded-full blur-[120px]"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                </div>

                {/* Header Section - Mobile Optimized */}
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-6 border-b border-[#E0A32B]/10 pb-10 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h3 className="text-4xl sm:text-6xl font-display font-bold text-[#F2F3F4] tracking-tighter drop-shadow-lg">
                            Pack Sécurité
                        </h3>
                        <div className="flex items-center gap-3 bg-[#E0A32B]/10 px-5 py-2 rounded-full border border-[#E0A32B]/20 w-fit backdrop-blur-md shadow-[0_0_15px_rgba(224,163,43,0.1)]">
                            <CheckCircle2 className="w-5 h-5 text-[#E0A32B] drop-shadow-[0_0_8px_rgba(224,163,43,0.3)]" />
                            <span className="text-sm font-bold text-[#E0A32B] uppercase tracking-wide">Matériel + Pose inclus</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <span className="text-7xl sm:text-8xl font-display font-bold text-[#F2F3F4] tracking-tighter drop-shadow-[0_4px_0_#2C343D] text-shadow-lg">
                            399€
                        </span>
                        <span className="text-[#8B8589] text-sm uppercase tracking-widest font-bold mt-2">Prix tout compris</span>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Main Camera Card (Hero) */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => onOpenProduct('camera')}
                        className="cursor-pointer lg:col-span-6 relative h-[400px] sm:h-[520px] rounded-[2.5rem] overflow-hidden group shadow-2xl border border-[#E0A32B]/10 bg-[#2C343D]"
                    >
                        <img src={Camera3D} className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-700 group-hover:scale-105 mix-blend-normal" alt="Camera" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2C343D] via-transparent to-transparent"></div>

                        {/* Live Badge */}
                        <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-[#E0A32B]/20 shadow-lg">
                            <div className="w-2 h-2 rounded-full bg-[#E0A32B] animate-pulse shadow-[0_0_15px_rgba(224,163,43,1)]"></div>
                            <span className="text-[10px] font-mono text-[#F2F3F4] tracking-widest uppercase font-bold">Live Feed</span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-10">
                            <div className="flex items-center gap-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="w-16 h-16 rounded-2xl bg-[#E0A32B]/10 backdrop-blur-md border border-[#E0A32B]/20 flex items-center justify-center text-[#E0A32B] shadow-[0_8px_32px_rgba(0,0,0,0.5)] group-hover:bg-[#E0A32B]/20 transition-colors">
                                    <Camera className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-[#F2F3F4] font-display font-bold text-3xl leading-none mb-2">Caméra Hub G3</p>
                                    <p className="text-sm text-[#8B8589] font-medium tracking-wide">Le cerveau intelligent de ta sécurité.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sensors Grid */}
                    <div className="lg:col-span-6 grid grid-cols-2 gap-4 h-full content-start">
                        {[
                            { id: 'motion', icon: Radio, name: "Capteur Mouvement", desc: "Capture chaque mouvement.", count: 1 },
                            { id: 'door', icon: DoorOpen, name: "Capteur Ouverture", desc: "Alerte immédiate.", count: 2 },
                            { id: 'button', icon: Shield, name: "Bouton d'Armement", desc: "Arme tout en un clic.", count: 1 },
                            { id: 'smoke', icon: Flame, name: "Détecteur Fumée", desc: "Alerte incendie.", count: 1, fire: true }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.id}
                                variants={cardVariants}
                                whileHover={{
                                    y: -5,
                                    backgroundColor: item.fire ? 'rgba(42, 21, 21, 1)' : 'rgba(44, 52, 61, 1)',
                                    borderColor: item.fire ? 'rgba(249, 115, 22, 0.4)' : 'rgba(224, 163, 43, 0.3)'
                                }}
                                onClick={() => onOpenProduct(item.id)}
                                className={`cursor-pointer border rounded-[2rem] p-6 flex flex-col justify-between min-h-[200px] relative overflow-hidden group transition-all duration-300 ${item.fire
                                    ? 'bg-[#1a0f0f] border-orange-500/10'
                                    : 'bg-[#2C343D] border-[#E0A32B]/10'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className={`p-3 rounded-2xl shadow-inner transition-colors ${item.fire
                                        ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 group-hover:bg-orange-500/20'
                                        : 'bg-[#E0A32B]/5 text-[#E0A32B] border border-[#E0A32B]/10 group-hover:bg-[#E0A32B]/10'
                                        }`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-mono bg-[#E0A32B]/5 text-[#E0A32B] px-3 py-1.5 rounded-lg border border-[#E0A32B]/5">x{item.count}</span>
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <p className="text-lg font-bold text-[#F2F3F4] mb-1 group-hover:text-white transition-colors">{item.name}</p>
                                    <p className={`text-xs ${item.fire ? 'text-orange-200/60' : 'text-[#8B8589] group-hover:text-[#F2F3F4]'}`}>
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-12 pt-8 border-t border-[#E0A32B]/10 relative z-10">
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={onOpenCheckout}
                        className="group relative flex items-center justify-center w-full py-7 rounded-2xl bg-[#E0A32B] text-[#2C343D] font-display font-bold uppercase tracking-widest text-sm hover:bg-white transition-all shadow-[0_0_30px_-10px_rgba(224,163,43,0.2)] hover:shadow-[0_0_40px_-10px_rgba(224,163,43,0.4)] overflow-hidden"
                    >
                        <span className="flex items-center gap-4 relative z-10">
                            Je commande mon pack
                            <div className="bg-[#2C343D] text-[#E0A32B] rounded-full p-1.5 group-hover:bg-[#2C343D] group-hover:text-white transition-colors">
                                <ChevronRight className="w-4 h-4" strokeWidth={3} />
                            </div>
                        </span>
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
};
