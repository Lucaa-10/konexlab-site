import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Home, Building2, Store, Trees, XCircle, CheckCircle, MinusCircle, Wind, Cpu, PowerOff, ShieldAlert, Zap, Armchair, Mail, Check, Shield, Video, Sun, Thermometer, Lightbulb, Power, Camera, Radio, DoorOpen, BellRing, Flame, Droplets, Plug, ToggleLeft } from 'lucide-react';
import { CONFIG_DATA, DB_PRODUCTS } from '../constants';
import { ProductDetail, ConfigStep, ConfigOption } from '../types';
import { supabase } from '../lib/supabase';

// --- Icons Mapping ---
const iconMap: Record<string, React.ElementType> = {
  home: Home, 'building-2': Building2, store: Store, trees: Trees, 'x-circle': XCircle,
  'check-circle': CheckCircle, 'minus-circle': MinusCircle, wind: Wind, cpu: Cpu, 'power-off': PowerOff,
  'shield-alert': ShieldAlert, zap: Zap, armchair: Armchair
};

const resultIcons: Record<string, React.ElementType> = {
  'shield-alert': ShieldAlert, video: Video, sun: Sun, thermometer: Thermometer, wind: Wind, lightbulb: Lightbulb, power: Power
};

const ProductIconMap: Record<string, React.ElementType> = {
  camera: Camera, radio: Radio, 'door-open': DoorOpen, 'bell-ring': BellRing, flame: Flame,
  thermometer: Thermometer, droplets: Droplets, plug: Plug, 'toggle-left': ToggleLeft, shield: Shield
};

// --- Main Component ---
export const Configurator = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(1);

  const handleNext = (val: string) => {
    setDirection(1);
    setAnswers(prev => ({ ...prev, [step]: val }));
    setStep(prev => prev + 1);
  };

  const reset = () => {
    setDirection(-1);
    setStep(1);
    setAnswers({});
  };

  return (
    <div id="configurator-anchor" className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-24 sm:mb-40 relative z-10">
      <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-2xl shadow-black/50 p-8 sm:p-16 min-h-[600px] flex flex-col overflow-hidden">

        {/* Progress Dots */}
        {step <= 5 && (
          <div className="flex flex-col items-center mb-12 z-10">
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-3">Ton Projet sur-mesure</h2>
            <p className="text-slate-400 text-lg mb-8 font-light">Configure ta solution idéale en 30 secondes.</p>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === step
                    ? 'w-12 bg-[#854F6C] shadow-[0_0_10px_rgba(133,79,108,0.5)]'
                    : i < step
                      ? 'w-3 bg-[#854F6C]/40'
                      : 'w-3 bg-[#2B124C]'
                    }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Content */}
        <div className="flex-grow flex flex-col justify-center relative z-10">
          <AnimatePresence mode="wait" custom={direction}>
            {step <= 5 ? (
              <motion.div key={step} className="w-full">
                <StepContent step={step} data={CONFIG_DATA[step]} onSelect={handleNext} direction={direction} />
              </motion.div>
            ) : (
              <motion.div key="result" className="w-full">
                <ConfigResult answers={answers} onReset={reset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Background blobs specific to configurator */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#854F6C]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#854F6C]/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};

// --- Step Content ---
const stepVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 50 : -50 }),
  center: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -50 : 50, transition: { duration: 0.2 } })
};

const StepContent = ({ step, data, onSelect, direction }: { step: number, data: ConfigStep, onSelect: (val: string) => void, direction: number }) => (
  <motion.div
    custom={direction}
    variants={stepVariants}
    initial="enter"
    animate="center"
    exit="exit"
    className="w-full max-w-4xl mx-auto"
  >
    <div className="text-center mb-10">
      <span className="inline-block py-1 px-3 rounded-full bg-[#E0A32B]/10 border border-[#E0A32B]/20 text-[#E0A32B] text-xs font-mono font-bold uppercase tracking-widest mb-4">
        Étape 0{step} / 05
      </span>
      <h3 className="text-3xl sm:text-4xl font-display font-bold text-[#F2F3F4]">{data.q}</h3>
    </div>

    <div className={`grid gap-6 ${data.opts.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' : 'grid-cols-1 sm:grid-cols-3'}`}>
      {data.opts.map((opt: ConfigOption, idx: number) => {
        const Icon = iconMap[opt.i];
        return (
          <motion.button
            key={idx}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(opt.v)}
            className="group relative flex flex-col items-center justify-center gap-6 p-8 rounded-[2rem] bg-[#2C343D]/50 border border-[#E0A32B]/10 hover:bg-[#2C343D] hover:border-[#E0A32B]/40 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#E0A32B]/0 to-[#E0A32B]/0 group-hover:from-[#E0A32B]/5 group-hover:to-transparent transition-all duration-500"></div>

            <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#2C343D] border border-[#E0A32B]/10 flex items-center justify-center text-[#E0A32B] group-hover:text-[#F2F3F4] group-hover:scale-110 group-hover:border-[#E0A32B]/30 group-hover:shadow-[0_0_30px_-10px_rgba(224,163,43,0.2)] transition-all duration-300">
              <Icon size={32} strokeWidth={1.5} />
            </div>

            <span className="relative z-10 font-display font-bold text-lg text-[#E0A32B] group-hover:text-white transition-colors">{opt.l}</span>

            {/* Selection Indicator */}
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-[#E0A32B]/10 flex items-center justify-center group-hover:border-[#E0A32B] transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E0A32B] opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100 duration-300"></div>
            </div>
          </motion.button>
        );
      })}
    </div>
  </motion.div>
);

// --- Result Content ---
const ConfigResult = ({ answers, onReset }: { answers: Record<number, string>; onReset: () => void }) => {
  let recProducts: ProductDetail[] = [];
  let recScenarios: { t: string; i: string }[] = [];
  let title = "";

  if (answers[5] === 'Secu') {
    title = "Pack Sécurité Sur-Mesure";
    recProducts.push(DB_PRODUCTS.door, DB_PRODUCTS.motion, DB_PRODUCTS.siren);
    recScenarios.push({ t: "Alerte Intrusion", i: "shield-alert" }, { t: "Vidéo Preuve", i: "video" });
    if (answers[2] === 'Oui') recScenarios.push({ t: "Surveillance Jardin", i: "sun" });
  } else if (answers[5] === 'Eco') {
    title = "Pack Économies d'Énergie";
    recProducts.push(DB_PRODUCTS.thermo, DB_PRODUCTS.temp, DB_PRODUCTS.door);
    recScenarios.push({ t: "Chauffage Intelligent", i: "thermometer" }, { t: "Stop Gaspillage", i: "wind" });
  } else {
    title = "Pack Confort Absolu";
    recProducts.push(DB_PRODUCTS.switch, DB_PRODUCTS.plug, DB_PRODUCTS.motion);
    recScenarios.push({ t: "Lumière Auto", i: "lightbulb" }, { t: "Tout éteindre", i: "power" });
  }

  // --- Supabase Integration ---
  React.useEffect(() => {
    const saveLead = async () => {
      if (!supabase) return; // Safety check: Exit if Supabase is not configured

      try {
        // Only save if we haven't saved this session yet (simple check)
        const sessionKey = `konexlab_lead_${Date.now()}`;
        if (sessionStorage.getItem('lead_saved')) return;

        const { error } = await supabase
          .from('leads')
          .insert([
            {
              configuration: answers,
              pack_title: title,
              status: 'new',
              created_at: new Date().toISOString()
            }
          ]);

        if (error) {
          console.error('Supabase error:', error);
        } else {
          console.log('Lead saved to Supabase');
          sessionStorage.setItem('lead_saved', 'true');
        }
      } catch (err) {
        console.error('Error saving lead:', err);
      }
    };

    saveLead();
  }, [answers, title]);



  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center w-full max-w-2xl mx-auto"
    >
      <div className="inline-flex p-4 rounded-full bg-emerald-100 text-emerald-600 mb-4 shadow-lg shadow-emerald-500/20">
        <Check size={32} />
      </div>
      <h3 className="text-xl text-slate-500 font-medium">Ton Résultat</h3>
      <p className="text-2xl sm:text-3xl font-black text-slate-900 mb-8">{title}</p>

      <div className="bg-white/80 p-6 rounded-2xl border border-white shadow-sm mb-4 text-left">
        <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Matériel Recommandé</h4>
        <div className="space-y-3">
          {recProducts.map((p, i) => {
            const Icon = ProductIconMap[p.icon] || Shield;
            return (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg text-slate-900 shadow-sm"><Icon size={20} /></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{p.title}</p>
                  <p className="text-xs text-slate-500">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white/80 p-6 rounded-2xl border border-white shadow-sm mb-8 text-left">
        <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Ce que tu vas faire</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recScenarios.map((s, i) => {
            const Icon = resultIcons[s.i] || Shield;
            return (
              <div key={i} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <Icon size={16} className="text-emerald-500" /> {s.t}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-8 flex items-center gap-3">
        <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
          <Check size={20} />
        </div>
        <p className="text-sm text-emerald-800 font-medium text-left">
          Votre configuration a bien été transmise à notre équipe. Un expert Konexlab va l'analyser et vous recontacter sous 24h.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onReset}
          className="flex-1 py-4 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-colors"
        >
          Configurer un autre projet
        </button>
      </div>
    </motion.div>
  );
};
// Force Vercel Deployment