import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Home, Building2, Store, Trees, XCircle, CheckCircle, MinusCircle, Wind, Cpu, PowerOff, ShieldAlert, Zap, Armchair, Check, Shield, Video, Sun, Thermometer, Lightbulb, Power, Camera, Radio, DoorOpen, BellRing, Flame, Droplets, Plug, ToggleLeft, Download } from 'lucide-react';
import { CONFIG_DATA, DB_PRODUCTS } from '../constants';
import { ProductDetail, ConfigStep, ConfigOption } from '../types';
import { supabase } from '../lib/supabase';
import { jsPDF } from 'jspdf';

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
  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [direction, setDirection] = useState(1);

  const handleNext = (val: string) => {
    setDirection(1);
    setAnswers(prev => ({ ...prev, [step]: val }));
    setStep(prev => prev + 1);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.email || !contact.firstName || !contact.lastName) return; // Basic validation
    setDirection(1);
    setStep(prev => prev + 1);
  };

  const reset = () => {
    setDirection(-1);
    setStep(1);
    setAnswers({});
    setContact({ firstName: '', lastName: '', email: '', phone: '' });
  };

  return (
    <div id="configurator-anchor" className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-24 sm:mb-40 relative z-10">
      <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-2xl shadow-black/50 p-8 sm:p-16 min-h-[600px] flex flex-col overflow-hidden">

        {/* Progress Dots */}
        {step <= 6 && (
          <div className="flex flex-col items-center mb-12 z-10">
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-3">Ton Projet sur-mesure</h2>
            <p className="text-slate-400 text-lg mb-8 font-light">Configure ta solution idéale en 30 secondes.</p>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
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
            ) : step === 6 ? (
              <motion.div key="contact" className="w-full">
                <ContactForm contact={contact} setContact={setContact} onSubmit={handleContactSubmit} direction={direction} />
              </motion.div>
            ) : (
              <motion.div key="result" className="w-full">
                <ConfigResult answers={answers} contact={contact} onReset={reset} />
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
            className="group relative flex flex-col items-center justify-center gap-6 p-8 rounded-[2rem] bg-[#2C343D]/50 border border-[#E0A32B]/10 hover:border-[#E0A32B]/40 transition-all duration-300 overflow-hidden min-h-[280px]"
          >
            {/* Background Image */}
            {opt.img && (
              <div className="absolute inset-0 z-0">
                <img
                  src={opt.img}
                  alt={opt.l}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 text-transparent"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-[#0B1121]/80 to-transparent opacity-90 group-hover:opacity-60 transition-all duration-500" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-br from-[#E0A32B]/0 to-[#E0A32B]/0 group-hover:from-[#E0A32B]/10 group-hover:to-transparent transition-all duration-500 z-10"></div>

            <div className="relative z-20 w-20 h-20 rounded-2xl bg-[#2C343D]/80 backdrop-blur-sm border border-[#E0A32B]/10 flex items-center justify-center text-[#E0A32B] group-hover:text-[#F2F3F4] group-hover:scale-110 group-hover:border-[#E0A32B]/30 group-hover:shadow-[0_0_30px_-10px_rgba(224,163,43,0.2)] transition-all duration-300">
              <Icon size={32} strokeWidth={1.5} />
            </div>

            <span className="relative z-20 font-display font-bold text-lg text-[#E0A32B] group-hover:text-white transition-colors drop-shadow-lg">{opt.l}</span>

            {/* Selection Indicator */}
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-[#E0A32B]/30 flex items-center justify-center group-hover:border-[#E0A32B] transition-colors z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E0A32B] opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100 duration-300"></div>
            </div>
          </motion.button>
        );
      })}
    </div>
  </motion.div>
);

// --- Contact Form ---
const ContactForm = ({ contact, setContact, onSubmit, direction }: { contact: any, setContact: any, onSubmit: any, direction: number }) => (
  <motion.div
    custom={direction}
    variants={stepVariants}
    initial="enter"
    animate="center"
    exit="exit"
    className="w-full max-w-2xl mx-auto"
  >
    <div className="text-center mb-10">
      <span className="inline-block py-1 px-3 rounded-full bg-[#E0A32B]/10 border border-[#E0A32B]/20 text-[#E0A32B] text-xs font-mono font-bold uppercase tracking-widest mb-4">
        Étape 06 / 06
      </span>
      <h3 className="text-3xl sm:text-4xl font-display font-bold text-[#F2F3F4]">Vos Coordonnées</h3>
      <p className="text-slate-400 mt-4">Pour vous envoyer votre configuration personnalisée.</p>
    </div>

    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Prénom"
          required
          value={contact.firstName}
          onChange={e => setContact({ ...contact, firstName: e.target.value })}
          className="w-full p-4 rounded-xl bg-[#2C343D]/50 border border-[#E0A32B]/10 text-white placeholder-slate-500 focus:border-[#E0A32B] focus:outline-none transition-colors"
        />
        <input
          type="text"
          placeholder="Nom"
          required
          value={contact.lastName}
          onChange={e => setContact({ ...contact, lastName: e.target.value })}
          className="w-full p-4 rounded-xl bg-[#2C343D]/50 border border-[#E0A32B]/10 text-white placeholder-slate-500 focus:border-[#E0A32B] focus:outline-none transition-colors"
        />
      </div>
      <input
        type="email"
        placeholder="Email"
        required
        value={contact.email}
        onChange={e => setContact({ ...contact, email: e.target.value })}
        className="w-full p-4 rounded-xl bg-[#2C343D]/50 border border-[#E0A32B]/10 text-white placeholder-slate-500 focus:border-[#E0A32B] focus:outline-none transition-colors"
      />
      <input
        type="tel"
        placeholder="Téléphone"
        value={contact.phone}
        onChange={e => setContact({ ...contact, phone: e.target.value })}
        className="w-full p-4 rounded-xl bg-[#2C343D]/50 border border-[#E0A32B]/10 text-white placeholder-slate-500 focus:border-[#E0A32B] focus:outline-none transition-colors"
      />
      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-[#E0A32B] text-[#0B1121] font-bold text-lg shadow-lg shadow-[#E0A32B]/20 hover:bg-[#F2B749] transition-all transform hover:scale-[1.02]"
      >
        Voir mon résultat
      </button>
    </form>
  </motion.div>
);

// --- Result Content ---
const ConfigResult = ({ answers, contact, onReset }: { answers: Record<number, string>; contact: any; onReset: () => void }) => {
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

  // Get Background Image
  const housingType = answers[1];
  const housingOption = CONFIG_DATA[1].opts.find(o => o.v === housingType);
  const bgImage = housingOption?.img;

  // --- Supabase Integration (Direct Edge Function) ---
  React.useEffect(() => {
    const saveLead = async () => {
      if (!supabase) return;

      try {
        const sessionKey = `konexlab_lead_${Date.now()}`;
        if (sessionStorage.getItem('lead_saved')) return;

        // Call Edge Function directly (Bypassing Database Table)
        const { data, error } = await supabase.functions.invoke('odoo-sync', {
          body: {
            configuration: answers,
            pack_title: title,
            first_name: contact.firstName,
            last_name: contact.lastName,
            email: contact.email,
            phone: contact.phone
          }
        });

        if (error) {
          console.error('Supabase Function error:', error);
        } else {
          console.log('Lead sent to Odoo via Edge Function', data);
          sessionStorage.setItem('lead_saved', 'true');
        }
      } catch (err) {
        console.error('Error saving lead:', err);
      }
    };

    saveLead();
  }, [answers, title, contact]);

  // --- PDF Generation ---
  const downloadPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Helper to load image
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      });
    };

    // 1. Header Background
    doc.setFillColor(11, 17, 33); // Dark Blue #0B1121
    doc.rect(0, 0, pageWidth, 40, 'F');

    // 2. Logo / Brand
    doc.setTextColor(224, 163, 43); // Gold #E0A32B
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Konexlab", 20, 20);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("La Maison de Demain", 20, 30);

    // 3. Project Image (Dynamic)
    try {
      if (bgImage) {
        const imgElement = await loadImage(bgImage);
        // Aspect ratio calculation to fit width
        const imgHeight = (imgElement.height * (pageWidth - 40)) / imgElement.width;
        // Crop or fit? Let's fit width, max height 60
        doc.addImage(imgElement, 'PNG', 20, 50, pageWidth - 40, 60, undefined, 'FAST');
      }
    } catch (e) {
      console.warn("Could not load project image for PDF", e);
    }

    // 4. Title & Client Info
    const startY = 120;
    doc.setTextColor(11, 17, 33); // Dark Blue
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(title, 20, startY);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100); // Grey
    doc.text(`Préparé pour : ${contact.firstName} ${contact.lastName}`, 20, startY + 8);
    doc.text(`Date : ${new Date().toLocaleDateString()}`, 20, startY + 14);

    // 5. Equipment List (2 Columns)
    doc.setFontSize(14);
    doc.setTextColor(11, 17, 33);
    doc.setFont("helvetica", "bold");
    doc.text("Votre Matériel Recommandé", 20, startY + 30);

    let yPos = startY + 40;
    const colWidth = (pageWidth - 50) / 2;

    recProducts.forEach((p, index) => {
      const xPos = index % 2 === 0 ? 20 : 20 + colWidth + 10;
      if (index % 2 === 0 && index !== 0) yPos += 25; // New row

      doc.setFillColor(245, 247, 250); // Light grey bg
      doc.roundedRect(xPos, yPos, colWidth, 20, 2, 2, 'F');

      doc.setFontSize(11);
      doc.setTextColor(11, 17, 33);
      doc.setFont("helvetica", "bold");
      doc.text(p.title, xPos + 5, yPos + 7);

      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      // Simple text wrap for description
      const splitDesc = doc.splitTextToSize(p.desc, colWidth - 10);
      doc.text(splitDesc, xPos + 5, yPos + 13);
    });

    // 6. Scenarios
    yPos += 35;
    doc.setFontSize(14);
    doc.setTextColor(11, 17, 33);
    doc.setFont("helvetica", "bold");
    doc.text("Vos Scénarios Intelligents", 20, yPos);
    yPos += 10;

    const scenarios = [
      "Départ Maison : Alarme ON + Lumières OFF + Chauffage ÉCO.",
      "Simulation de Présence : Les lumières s'allument aléatoirement.",
      "Nuit Tranquille : Alarme périmétrique ON + Volets fermés."
    ];

    scenarios.forEach((s) => {
      doc.setFillColor(224, 163, 43); // Gold bullet
      doc.circle(23, yPos - 1, 1, 'F');

      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      doc.setFont("helvetica", "normal");
      doc.text(s, 28, yPos);
      yPos += 8;
    });

    // 7. Footer
    doc.setFillColor(11, 17, 33);
    doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text("Konexlab - Solutions Domotiques & Sécurité - www.konexlab.com", pageWidth / 2, pageHeight - 8, { align: 'center' });

    doc.save("Konexlab_Etude_Premium.pdf");
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Immersive Background */}
      {bgImage && (
        <div className="fixed inset-0 z-0">
          <img src={bgImage} className="w-full h-full object-cover blur-xl scale-110" alt="Background" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl mx-auto"
      >
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-black/50 overflow-hidden">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-[#E0A32B] to-[#F2B749] text-[#0B1121] mb-6 shadow-lg shadow-[#E0A32B]/30 animate-pulse">
              <Check size={40} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl text-slate-300 font-medium tracking-wide uppercase mb-2">Configuration Terminée</h3>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white mb-4 drop-shadow-lg">{title}</h2>
            <p className="text-slate-300 max-w-lg mx-auto">
              Une solution parfaitement adaptée à votre {housingType.toLowerCase()}.
            </p>
          </div>

          {/* Equipment Grid with Staggered Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {recProducts.map((p, i) => {
              const Icon = ProductIconMap[p.icon] || Shield;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex flex-col items-center text-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="p-3 bg-white/10 rounded-xl text-[#E0A32B] mb-3"><Icon size={24} /></div>
                  <p className="text-sm font-bold text-white mb-1">{p.title}</p>
                  <p className="text-xs text-slate-400 leading-tight">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Scenarios */}
          <div className="bg-black/20 rounded-2xl p-6 mb-10 border border-white/5">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">Vos Scénarios Intelligents</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recScenarios.map((s, i) => {
                const Icon = resultIcons[s.i] || Shield;
                return (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-200">
                    <Icon size={16} className="text-[#E0A32B]" /> {s.t}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={downloadPDF}
              className="group flex-1 py-5 rounded-xl bg-gradient-to-r from-[#E0A32B] to-[#F2B749] text-[#0B1121] font-bold text-lg shadow-xl shadow-[#E0A32B]/20 hover:shadow-[#E0A32B]/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
            >
              <Download size={24} className="group-hover:animate-bounce" />
              Télécharger mon Étude (PDF)
            </button>
            <button
              onClick={onReset}
              className="flex-1 py-5 rounded-xl bg-white/5 text-white font-bold text-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              Recommencer
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Un expert Konexlab a reçu votre dossier et vous recontactera sous 24h.
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};