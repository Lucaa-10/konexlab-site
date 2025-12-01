import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuModal, ProductModal, FAQModal, LegalModal, CheckoutModal } from './components/Modals';
import { Configurator } from './components/Configurator';
import { ModalType } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Comparison } from './components/Comparison';
import { Footer } from './components/Footer';

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalType | string>(null);
  const closeModal = () => setActiveModal(null);

  const scrollToConfig = () => document.getElementById('configurator-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToCompare = () => document.getElementById('compare-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  const scrollHome = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans text-white bg-transparent overflow-x-hidden relative selection:bg-[#E0A32B] selection:text-white">
      {/* Dynamic Background Mesh */}
      <div className="dynamic-bg" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar
          onOpenMenu={() => setActiveModal('menu')}
          onScrollToConfig={scrollToConfig}
          onScrollToCompare={scrollToCompare}
        />

        <main className="flex-grow flex flex-col items-center w-full">
          <Hero
            onOpenProduct={(id: string) => setActiveModal(`product:${id}`)}
            onOpenCheckout={() => setActiveModal('checkout')}
          />
          <Features />
          <Comparison />
          <Configurator />
        </main>

        <Footer
          onOpenLegal={() => setActiveModal('legal')}
          onOpenFaq={() => setActiveModal('faq')}
          onScrollToConfig={scrollToConfig}
          onScrollToCompare={scrollToCompare}
          onScrollHome={scrollHome}
        />
      </div>

      <AnimatePresence>
        {activeModal === 'menu' && (
          <MenuModal onClose={closeModal} onNavigate={(section) => {
            if (section === 'configurator') scrollToConfig();
            else if (section === 'compare') scrollToCompare();
            else if (section === 'faq') setActiveModal('faq');
          }} />
        )}
        {typeof activeModal === 'string' && activeModal.startsWith('product:') && (
          <ProductModal productId={activeModal.split(':')[1]} onClose={closeModal} />
        )}
        {activeModal === 'faq' && <FAQModal onClose={closeModal} />}
        {activeModal === 'legal' && <LegalModal onClose={closeModal} />}
        {activeModal === 'checkout' && <CheckoutModal onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
}