import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Home, Building2, Store, Trees, XCircle, CheckCircle, MinusCircle, Wind, Cpu, PowerOff, ShieldAlert, Zap, Armchair, Check, Shield, Video, Sun, Thermometer, Lightbulb, Power, Camera, Radio, DoorOpen, BellRing, Flame, Droplets, Plug, ToggleLeft, Download, Smartphone, Footprints, Euro, Lock } from 'lucide-react';
import { CONFIG_DATA, DB_PRODUCTS } from '../constants';
import { ProductDetail, ConfigStep, ConfigOption } from '../types';
import { supabase } from '../lib/supabase';
import { jsPDF } from 'jspdf';

// --- Icons Mapping ---
const iconMap: Record<string, React.ElementType> = {
  home: Home, 'building-2': Building2, store: Store, trees: Trees, 'x-circle': XCircle,
  'check-circle': CheckCircle, 'minus-circle': MinusCircle, wind: Wind, cpu: Cpu, 'power-off': PowerOff,
  'shield-alert': ShieldAlert, zap: Zap, armchair: Armchair, lightbulb: Lightbulb
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
  const [isCalculating, setIsCalculating] = useState(false);

  const handleNext = (val: string) => {
    setDirection(1);
    setAnswers(prev => ({ ...prev, [step]: val }));
    setStep(prev => prev + 1);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.email || !contact.firstName || !contact.lastName) return; // Basic validation

    // Start Calculation Effect
    setIsCalculating(true);
    setDirection(1);

    // Wait for animation
    setTimeout(() => {
      setIsCalculating(false);
      setStep(prev => prev + 1);
    }, 3000);
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
                <StepContent step={step} data={CONFIG_DATA[step]} onSelect={handleNext} direction={direction} currentAnswer={answers[step]} />
              </motion.div>
            ) : step === 6 ? (
              isCalculating ? (
                <motion.div key="calculating" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Calculating />
                </motion.div>
              ) : (
                <motion.div key="contact" className="w-full">
                  <ContactForm contact={contact} setContact={setContact} onSubmit={handleContactSubmit} direction={direction} />
                </motion.div>
              )
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

// --- Calculating Screen (Wow Effect) ---
const Calculating = () => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("Analyse de votre logement...");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    setTimeout(() => setText("Sélection des meilleurs produits..."), 1000);
    setTimeout(() => setText("Optimisation de votre pack..."), 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      <div className="relative w-32 h-32 mb-8">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-white/10 stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          ></circle>
          <circle
            className="text-[#E0A32B] progress-ring__circle stroke-current"
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          ></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{progress}%</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2 animate-pulse">{text}</h3>
      <p className="text-slate-400">L'IA Konexlab travaille pour vous</p>
    </div>
  );
};

// --- Step Content ---
const stepVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 50 : -50 }),
  center: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -50 : 50, transition: { duration: 0.2 } })
};

const StepContent = ({ step, data, onSelect, direction, currentAnswer }: { step: number, data: ConfigStep, onSelect: (val: string) => void, direction: number, currentAnswer?: string }) => (

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
            className={`group relative flex flex-col items-center justify-center gap-6 p-8 rounded-[2rem] 
                    bg-white/5 backdrop-blur-md border border-white/10 
                    hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]
                    transition-all duration-300 overflow-hidden min-h-[280px]
                    ${currentAnswer === opt.v ? 'ring-2 ring-[#E0A32B] bg-white/10' : ''}
                  `}
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

  let scenarioFlow: { t: string; i: any }[] = [];

  if (answers[5] === 'Secu') {
    title = "Pack Sécurité Sur-Mesure";
    recProducts.push(DB_PRODUCTS.door, DB_PRODUCTS.motion, DB_PRODUCTS.siren);
    scenarioFlow = [
      { t: "Intrusion Détectée", i: Footprints },
      { t: "Sirène 105dB", i: BellRing },
      { t: "Alerte Mobile", i: Smartphone }
    ];
  } else if (answers[5] === 'Eco') {
    title = "Pack Économies d'Énergie";
    recProducts.push(DB_PRODUCTS.thermo, DB_PRODUCTS.temp, DB_PRODUCTS.door);
    scenarioFlow = [
      { t: "Fenêtre Ouverte", i: Wind },
      { t: "Chauffage Coupé", i: Thermometer },
      { t: "Économies €", i: Euro }
    ];
  } else {
    title = "Pack Confort Absolu";
    recProducts.push(DB_PRODUCTS.switch, DB_PRODUCTS.plug, DB_PRODUCTS.motion);
    scenarioFlow = [
      { t: "Retour Maison", i: Home },
      { t: "Lumières On", i: Lightbulb },
      { t: "Ambiance Cozy", i: Armchair }
    ];
  }

  // Get Background Image
  const housingType = answers[1];
  const housingOption = CONFIG_DATA[1].opts.find(o => o.v === housingType);
  const bgImage = housingOption?.img;

  // --- PDF Generation ---
  const generatePDF = async (returnBlob = false) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Helper to load image with timeout
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Try to avoid CORS issues
        img.src = src;

        const timeout = setTimeout(() => reject(new Error("Image load timeout")), 5000);

        img.onload = () => {
          clearTimeout(timeout);
          resolve(img);
        };
        img.onerror = (err) => {
          clearTimeout(timeout);
          reject(err);
        };
      });
    };

    console.log("Generating PDF... Return Blob:", returnBlob);

    // 1. Background Image (Full Page)
    try {
      if (bgImage) {
        console.log("Loading background image:", bgImage);
        const imgElement = await loadImage(bgImage);
        console.log("Image loaded");
        doc.addImage(imgElement, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');

        // Dark Overlay with Transparency
        doc.saveGraphicsState();
        // @ts-ignore
        doc.setGState(new doc.GState({ opacity: 0.85 }));
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        doc.restoreGraphicsState();
      }
    } catch (e) {
      console.warn("Could not load project image for PDF", e);
    }

    // Fallback Background if no image
    if (!bgImage) {
      doc.setFillColor(11, 17, 33);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
    }

    // 2. Header
    // Gradient-like effect for header? No, keep it clean.
    // Let's add a gold line at the top
    doc.setDrawColor(224, 163, 43);
    doc.setLineWidth(2);
    doc.line(0, 0, pageWidth, 0);

    // Logo Area
    doc.setTextColor(224, 163, 43); // Gold
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("Konexlab", 20, 25);

    doc.setTextColor(200, 200, 200);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("LA MAISON DE DEMAIN", 20, 32);

    // 3. Title & Client Info
    const startY = 60;
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    // Split title if too long
    const splitTitle = doc.splitTextToSize(title, pageWidth - 40);
    doc.text(splitTitle, 20, startY);

    const titleHeight = splitTitle.length * 12;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 180, 180); // Light Grey
    doc.text(`PRÉPARÉ POUR`, 20, startY + titleHeight + 10);

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text(`${contact.firstName} ${contact.lastName}`, 20, startY + titleHeight + 18);

    doc.setFontSize(11);
    doc.setTextColor(180, 180, 180);
    doc.text(new Date().toLocaleDateString(), pageWidth - 40, startY + titleHeight + 18, { align: 'right' });

    // 4. Equipment List (Glassmorphism Cards)
    let yPos = startY + titleHeight + 40;

    doc.setFontSize(14);
    doc.setTextColor(224, 163, 43); // Gold
    doc.setFont("helvetica", "bold");
    doc.text("MATÉRIEL RECOMMANDÉ", 20, yPos);

    yPos += 10;
    const colWidth = (pageWidth - 50) / 2;
    const cardHeight = 35;

    recProducts.forEach((p, index) => {
      const xPos = index % 2 === 0 ? 20 : 20 + colWidth + 10;
      if (index % 2 === 0 && index !== 0) yPos += (cardHeight + 5); // New row

      // Glass Card Background
      doc.saveGraphicsState();
      // @ts-ignore
      doc.setGState(new doc.GState({ opacity: 0.1 })); // Very transparent white
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(xPos, yPos, colWidth, cardHeight, 3, 3, 'F');
      doc.restoreGraphicsState();

      // Card Border
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.1);
      doc.roundedRect(xPos, yPos, colWidth, cardHeight, 3, 3, 'S');

      // Content
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text(p.title, xPos + 5, yPos + 10);

      doc.setFontSize(9);
      doc.setTextColor(200, 200, 200);
      doc.setFont("helvetica", "normal");
      const splitDesc = doc.splitTextToSize(p.desc, colWidth - 10);
      doc.text(splitDesc, xPos + 5, yPos + 18);
    });

    // 5. Scenario Flow (Visual)
    yPos += (cardHeight + 25);

    // Check for page break
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 40;
      doc.setFillColor(11, 17, 33);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
    }

    doc.setFontSize(14);
    doc.setTextColor(224, 163, 43);
    doc.setFont("helvetica", "bold");
    doc.text("VOTRE EXPÉRIENCE AU QUOTIDIEN", 20, yPos);
    yPos += 20;

    // Draw Flow Steps
    const flowStepWidth = (pageWidth - 40) / 3;

    scenarioFlow.forEach((s, i) => {
      const xCenter = 20 + (i * flowStepWidth) + (flowStepWidth / 2);

      // Circle background for step
      doc.setFillColor(255, 255, 255);
      doc.saveGraphicsState();
      // @ts-ignore
      doc.setGState(new doc.GState({ opacity: 0.1 }));
      doc.circle(xCenter, yPos + 10, 12, 'F');
      doc.restoreGraphicsState();

      doc.setDrawColor(224, 163, 43);
      doc.setLineWidth(0.5);
      doc.circle(xCenter, yPos + 10, 12, 'S');

      // Step Text
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text(s.t, xCenter, yPos + 30, { align: 'center' });

      // Arrow to next step
      if (i < scenarioFlow.length - 1) {
        const arrowX = 20 + ((i + 1) * flowStepWidth);
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(16);
        doc.text(">", arrowX, yPos + 12, { align: 'center' });
      }
    });

    // 6. Footer
    const footerY = pageHeight - 15;
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.1);
    doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);

    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.text("Konexlab - Solutions Domotiques & Sécurité - www.konexlab.com", pageWidth / 2, footerY + 5, { align: 'center' });

    if (returnBlob) {
      return doc.output('datauristring').split(',')[1]; // Return Base64 only
    } else {
      doc.save("Konexlab_Etude_Premium.pdf");
    }
  };

  // --- Supabase Integration (Direct Edge Function) ---
  React.useEffect(() => {
    const saveLead = async () => {
      if (!supabase) return;

      try {
        const sessionKey = `konexlab_lead_${Date.now()}`;
        if (sessionStorage.getItem('lead_saved')) return;

        // Generate PDF Base64
        let pdfContent = null;
        try {
          pdfContent = await generatePDF(true);
        } catch (e) {
          console.warn("Failed to generate PDF for attachment", e);
        }

        // Call Edge Function directly (Bypassing Database Table)
        const { data, error } = await supabase.functions.invoke('odoo-sync', {
          body: {
            configuration: answers,
            pack_title: title,
            first_name: contact.firstName,
            last_name: contact.lastName,
            email: contact.email,
            phone: contact.phone,
            pdf_content: pdfContent,
            pdf_name: `Etude_Konexlab_${contact.lastName}.pdf`
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

          {/* Visual Scenario Flow */}
          <div className="bg-white/5 rounded-2xl p-6 mb-10 border border-white/10">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-6 tracking-wider text-center">Votre Expérience au Quotidien</h4>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden sm:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-white/5 via-[#E0A32B]/50 to-white/5 -translate-y-1/2 z-0" />

              {scenarioFlow.map((s, i) => {
                const Icon = s.i;
                return (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-3 w-full sm:w-1/3">
                    <div className="w-16 h-16 rounded-full bg-[#0B1121] border border-[#E0A32B]/30 flex items-center justify-center shadow-[0_0_15px_rgba(224,163,43,0.2)]">
                      <Icon size={28} className="text-[#E0A32B]" />
                    </div>
                    <p className="text-sm font-bold text-white text-center">{s.t}</p>
                    {i < scenarioFlow.length - 1 && (
                      <div className="sm:hidden text-slate-500">↓</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price Comparator (The Killer Feature) */}
          <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-[#0B1121] to-[#1a2333] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E0A32B]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <h4 className="text-center text-lg font-bold text-white mb-6">Pourquoi choisir Konexlab ?</h4>

            <div className="grid grid-cols-3 gap-4 text-center items-end">
              {/* Labels */}
              <div className="text-left space-y-4 pb-2">
                <div className="text-xs text-slate-400 font-medium h-8 flex items-center">Abonnement Mensuel</div>
                <div className="text-xs text-slate-400 font-medium h-8 flex items-center">Engagement</div>
                <div className="text-xs text-slate-400 font-medium h-8 flex items-center">Coût sur 5 ans</div>
              </div>

              {/* Competitors */}
              <div className="space-y-4 pb-2 opacity-50 grayscale">
                <div className="text-xs font-bold text-slate-300 mb-2">Alarmes Classiques</div>
                <div className="h-8 flex items-center justify-center text-slate-300 font-mono">49€ / mois</div>
                <div className="h-8 flex items-center justify-center text-slate-300">36 mois</div>
                <div className="h-8 flex items-center justify-center text-red-400 font-bold font-mono">~ 2 940 €</div>
              </div>

              {/* Konexlab */}
              <div className="space-y-4 pb-2 relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#E0A32B] text-[#0B1121] text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  MEILLEUR CHOIX
                </div>
                <div className="text-xs font-bold text-[#E0A32B] mb-2">Konexlab</div>
                <div className="h-8 flex items-center justify-center text-white font-bold text-lg font-mono">0€</div>
                <div className="h-8 flex items-center justify-center text-white">Aucun</div>
                <div className="h-8 flex items-center justify-center text-[#4ADE80] font-bold text-lg font-mono">0 €</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-center">
              <p className="text-sm text-slate-300">
                Économie réalisée : <span className="text-[#E0A32B] font-bold text-lg">2 940 €</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => generatePDF(false)}
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