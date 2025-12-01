import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, Settings, ArrowLeftRight, HelpCircle, Camera, Radio, DoorOpen, Shield, Flame, Check, Box, PlusCircle, Lock, BoxSelect, MapPin, Phone, Mail } from 'lucide-react';
import { PRODUCT_DETAILS } from '../constants';

// --- Overlay ---
const Overlay = ({ children, onClick, align = 'center' }: { children: React.ReactNode; onClick: () => void; align?: 'center' | 'end' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    onClick={onClick}
    className={`fixed inset-0 z-[100] flex w-full h-full bg-slate-950/60 backdrop-blur-md p-4 ${
      align === 'end' ? 'items-end sm:items-center justify-center' : 'items-center justify-center'
    }`}
  >
    {children}
  </motion.div>
);

// --- Animation Variants ---
const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.15 } }
};

const bottomSheetVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.2 } }
};

// --- Shared Elements ---
const CloseButton = ({ onClick, dark = false }: { onClick: () => void; dark?: boolean }) => (
  <button
    onClick={onClick}
    className={`rounded-full p-2 transition-colors ${
      dark 
        ? 'hover:bg-slate-100 text-slate-700' 
        : 'hover:bg-white/20 text-white'
    }`}
  >
    <X size={20} />
  </button>
);

// --- MENU MODAL ---
export const MenuModal = ({ onClose, onNavigate }: { onClose: () => void; onNavigate: (section: string) => void }) => (
  <Overlay onClick={onClose} align="end">
    <motion.div
      variants={bottomSheetVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-sm bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl"
    >
      <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
        <span className="font-bold text-lg">Menu</span>
        <CloseButton onClick={onClose} />
      </div>
      <div className="p-4 flex flex-col gap-2 pb-8 sm:pb-4">
        {[
          { id: 'configurator', label: 'Configurateur', icon: Settings },
          { id: 'compare', label: 'Comparatif', icon: ArrowLeftRight },
          { id: 'faq', label: 'Questions / Réponses', icon: HelpCircle },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => { onClose(); onNavigate(item.id); }}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group"
          >
            <div className="p-2 bg-slate-100 rounded-lg text-slate-900 group-hover:bg-slate-200 transition-colors">
              <item.icon size={18} />
            </div>
            <span className="font-semibold text-slate-700 group-hover:text-slate-900">{item.label}</span>
          </button>
        ))}
        <div className="h-px bg-slate-100 my-2" />
        <a
          href="mailto:Luca.clarembaux@hotmail.com"
          className="flex items-center justify-center w-full p-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
        >
          Nous Contacter
        </a>
      </div>
    </motion.div>
  </Overlay>
);

// --- PRODUCT MODAL ---
const iconMap: Record<string, React.ElementType> = {
  camera: Camera, radio: Radio, "door-open": DoorOpen, shield: Shield, flame: Flame,
};

export const ProductModal = ({ productId, onClose }: { productId: string; onClose: () => void }) => {
  const product = PRODUCT_DETAILS[productId];
  if (!product) return null;
  const Icon = iconMap[product.icon] || BoxSelect;

  return (
    <Overlay onClick={onClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden m-4"
      >
        <div className="relative h-40 bg-slate-900 flex items-end p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-400 via-slate-900 to-slate-900"></div>
          <div className="absolute top-4 right-4 z-10">
            <CloseButton onClick={onClose} />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white">
              <Icon size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white">{product.title}</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-slate-600 leading-relaxed mb-6">{product.desc}</p>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Caractéristiques</h4>
            <ul className="space-y-3">
              {product.specs?.map((spec, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <Check size={16} className="text-emerald-500 shrink-0" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </Overlay>
  );
};

// --- FAQ MODAL ---
export const FAQModal = ({ onClose }: { onClose: () => void }) => (
  <Overlay onClick={onClose}>
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[85vh]"
    >
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h3 className="text-xl font-bold text-slate-900">Questions / Réponses</h3>
        <CloseButton onClick={onClose} dark />
      </div>
      <div className="p-6 overflow-y-auto space-y-4">
        {[
          { q: "Compatible smartphone ?", a: "Oui, iOS et Android. Tout est pilotable à distance." },
          { q: "Coupure internet ?", a: "L'alarme fonctionne en local. Historique dispo au retour de la connexion." },
          { q: "Locataire ?", a: "Oui, installation sans fil non destructive. Déménageable facilement." },
          { q: "Zéro abonnement, vraiment ?", a: "Vraiment. Tu achètes l'équipement, il est à toi. Pas de frais cachés." }
        ].map((item, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-colors">
            <h4 className="font-bold text-slate-900 mb-2">{item.q}</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </Overlay>
);

// --- LEGAL MODAL ---
export const LegalModal = ({ onClose }: { onClose: () => void }) => (
  <Overlay onClick={onClose}>
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[85vh]"
    >
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h3 className="text-xl font-bold text-slate-900">Mentions Légales</h3>
        <CloseButton onClick={onClose} dark />
      </div>
      <div className="p-6 overflow-y-auto space-y-6">
        <div>
          <h4 className="font-bold text-slate-900 mb-2">Éditeur</h4>
          <p className="text-sm text-slate-600">Konexlab (Luca Clarembaux)<br />Rue du Galibot 25, 7110 Strépy-Bracquegnies</p>
          <div className="mt-2 flex flex-col gap-1">
             <a href="mailto:Luca.clarembaux@hotmail.com" className="text-sm text-indigo-600 hover:underline flex items-center gap-2"><Mail size={14}/> Luca.clarembaux@hotmail.com</a>
             <a href="tel:+32493714028" className="text-sm text-indigo-600 hover:underline flex items-center gap-2"><Phone size={14}/> 0493 71 40 28</a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-2">Hébergeur</h4>
          <p className="text-sm text-slate-600">Odoo S.A.</p>
        </div>
      </div>
    </motion.div>
  </Overlay>
);

// --- CHECKOUT MODAL ---
export const CheckoutModal = ({ onClose }: { onClose: () => void }) => {
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const basePrice = 399;
  
  const toggleUpsell = (id: string) => {
    setSelectedUpsells(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const totalPrice = basePrice + selectedUpsells.reduce((acc, id) => acc + (id === 'sensor' ? 29 : 19), 0);

  return (
    <Overlay onClick={onClose} align="end">
      <motion.div
        variants={window.innerWidth < 640 ? bottomSheetVariants : modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Récapitulatif</h3>
            <p className="text-xs text-slate-500">Ton Pack Sécurité</p>
          </div>
          <CloseButton onClick={onClose} dark />
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Box size={14} /> Inclus dans le pack
            </h4>
            <div className="space-y-2">
              {[
                { name: "1x Caméra Hub G3", icon: Camera },
                { name: "1x Capteur Mouvement", icon: Radio },
                { name: "2x Capteurs Ouverture", icon: DoorOpen },
                { name: "1x Bouton d'Armement", icon: Shield },
                { name: "1x Détecteur de Fumée", icon: Flame }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 bg-white rounded-lg text-slate-900 shadow-sm border border-slate-100"><item.icon size={16} /></div>
                  <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <PlusCircle size={14} /> Complète ton installation
            </h4>
            <div className="space-y-3">
              {[
                { id: 'sensor', title: "Capteur d'Ouverture", desc: "Pour une fenêtre de plus", price: 29 },
                { id: 'plug', title: "Prise Connectée", desc: "Gère une lampe à distance", price: 19 }
              ].map((item) => {
                const isSelected = selectedUpsells.includes(item.id);
                return (
                  <div 
                    key={item.id}
                    onClick={() => toggleUpsell(item.id)}
                    className={`cursor-pointer flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                      isSelected 
                        ? 'bg-emerald-50 border-emerald-200 ring-1 ring-emerald-500' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-300'
                      }`}>
                        {isSelected && <Check size={12} />}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isSelected ? 'text-emerald-900' : 'text-slate-900'}`}>{item.title}</p>
                        <p className="text-[10px] text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-900">+{item.price}€</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="p-5 border-t border-slate-100 bg-white pb-8 sm:pb-5 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs text-slate-500 font-medium">Total TTC</p>
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full mt-1">
                <Check size={10} strokeWidth={3} />
                <span className="text-[10px] font-bold">Installation incluse</span>
              </div>
            </div>
            <motion.span 
              key={totalPrice}
              initial={{ scale: 1.2, color: '#10B981' }}
              animate={{ scale: 1, color: '#020617' }}
              className="text-3xl font-black text-slate-900 tracking-tight"
            >
              {totalPrice}€
            </motion.span>
          </div>
          <a 
            href="https://votre-domaine-odoo.com/shop/pack-securite-399" 
            className="block w-full py-4 bg-slate-900 text-white text-center font-bold rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg hover:shadow-slate-900/20"
          >
            Je valide mon pack
          </a>
          <div className="text-[10px] text-center text-slate-400 mt-3 flex items-center justify-center gap-1.5">
            <Lock size={12} /> Paiement sécurisé via Odoo
          </div>
        </div>
      </motion.div>
    </Overlay>
  );
};