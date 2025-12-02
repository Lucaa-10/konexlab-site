import { ProductDetail, ConfigStep, ProductKey } from './types';

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  camera: {
    title: "Caméra Hub G3",
    icon: "camera",
    desc: "Le cerveau de ta maison. Elle filme en haute définition, reconnait les visages et sert de chef d'orchestre pour tous tes autres capteurs.",
    specs: ["Résolution 2K 1296p", "Vision 360° motorisée", "Hub Zigbee 3.0 intégré", "Reconnaissance IA locale"]
  },
  motion: {
    title: "Détecteur de Mouvements",
    icon: "radio",
    desc: "Il capte tout ce qui bouge. Parfait pour la sécurité ou pour allumer la lumière tout seul quand tu passes.",
    specs: ["Angle de détection 170°", "Portée 7 mètres", "Capteur de luminosité", "Pile autonomie 2 ans"]
  },
  door: {
    title: "Capteur Portes/Fenêtres",
    icon: "door-open",
    desc: "Le gardien de tes entrées. Tu reçois une notif directe si une porte ou fenêtre s'ouvre quand t'es pas là.",
    specs: ["Installation adhésive facile", "Détection ouverture", "Historique d'activité", "Ultra compact"]
  },
  smoke: {
    title: "Détecteur de Fumée",
    icon: "flame",
    desc: "Indispensable. Il sonne fort en cas de fumée et t'envoie une alerte sur ton tel, où que tu sois.",
    specs: ["Sirène 85dB", "Alerte mobile", "Pile 10 ans", "Certifié EN 14604"]
  },
  button: {
    title: "Le Bouton",
    icon: "shield",
    desc: "Ton raccourci magique. Pose-le à l'entrée : un clic et l'alarme est activée en partant.",
    specs: ["3 types de clics", "Mode SOS / Panique", "Format mini", "Sans fil"]
  }
};

export const CONFIG_DATA: Record<number, ConfigStep> = {
  1: { q: "C'est quoi ton logement ?", opts: [{ l: "Maison", i: "home", v: "Maison", img: "/assets/modern_house_option_1764673436863.png" }, { l: "Appart", i: "building-2", v: "Appart", img: "/assets/apartment_interior_1764673540632.png" }, { l: "Bureau", i: "store", v: "Bureau", img: "/assets/modern_office_1764673555771.png" }] },
  2: { q: "T'as un extérieur ?", opts: [{ l: "Oui", i: "trees", v: "Oui", img: "/assets/garden_terrace_1764673571249.png" }, { l: "Non", i: "x-circle", v: "Non", img: "/assets/living_room_no_view_1764673606484.png" }] },
  3: { q: "L'isolation, ça dit quoi ?", opts: [{ l: "Top", i: "check-circle", v: "Bon", img: "/assets/insulation_good_1764673621158.png" }, { l: "Moyen", i: "minus-circle", v: "Moyen", img: "/assets/insulation_medium_1764673636265.png" }, { l: "Bof", i: "wind", v: "Mauvais", img: "/assets/insulation_medium_1764673636265.png" }] },
  4: { q: "Déjà équipé en domotique ?", opts: [{ l: "Oui", i: "cpu", v: "Oui", img: "/assets/modern_office_1764673555771.png" }, { l: "Non", i: "power-off", v: "Non", img: "/assets/living_room_no_view_1764673606484.png" }] },
  5: { q: "Ta priorité c'est quoi ?", opts: [{ l: "Sécurité", i: "shield-alert", v: "Secu", img: "/assets/modern_house_option_1764673436863.png" }, { l: "Économies", i: "zap", v: "Eco", img: "/assets/insulation_good_1764673621158.png" }, { l: "Confort", i: "armchair", v: "Conf", img: "/assets/apartment_interior_1764673540632.png" }] }
};

export const DB_PRODUCTS: Record<ProductKey, ProductDetail> = {
  camera: { title: "Caméra Hub G3", icon: "camera", desc: "Centrale & Vidéo" },
  motion: { title: "Capteur Mouvement", icon: "radio", desc: "Sécurité & Lumière" },
  door: { title: "Capteur Ouverture", icon: "door-open", desc: "Portes & Fenêtres" },
  siren: { title: "Sirène Intérieure", icon: "bell-ring", desc: "Alarme 105dB" },
  smoke: { title: "Détecteur Fumée", icon: "flame", desc: "Sécurité Incendie" },
  thermo: { title: "Tête Thermostatique", icon: "thermometer", desc: "Chauffage auto" },
  temp: { title: "Capteur Température", icon: "droplets", desc: "Suivi climat" },
  plug: { title: "Prise Connectée", icon: "plug", desc: "Contrôle appareils" },
  switch: { title: "Interrupteur Sans Fil", icon: "toggle-left", desc: "Commande lumière" },
  button: { title: "Bouton", icon: "shield", desc: "Contrôle alarme" }
};