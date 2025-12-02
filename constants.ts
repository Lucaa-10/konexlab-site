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
  1: { q: "C'est quoi ton logement ?", opts: [{ l: "Maison", i: "home", v: "Maison", img: "./images/modern_house_option_1764673436863.png" }, { l: "Appart", i: "building-2", v: "Appart", img: "./images/apartment_interior_1764673540632.png" }, { l: "Bureau", i: "store", v: "Bureau", img: "./images/modern_office_1764673555771.png" }] },
  2: { q: "T'as un extérieur ?", opts: [{ l: "Oui", i: "trees", v: "Oui", img: "./images/garden_terrace_1764673571249.png" }, { l: "Non", i: "x-circle", v: "Non", img: "./images/living_room_no_view_1764673606484.png" }] },
  3: { q: "L'isolation, ça dit quoi ?", opts: [{ l: "Top", i: "check-circle", v: "Bon", img: "./images/insulation_good_1764673621158.png" }, { l: "Moyen", i: "minus-circle", v: "Moyen", img: "./images/insulation_medium_1764673636265.png" }, { l: "Bof", i: "wind", v: "Mauvais", img: "./images/insulation_medium_1764673636265.png" }] },
  4: { q: "Déjà équipé en domotique ?", opts: [{ l: "Oui", i: "cpu", v: "Oui", img: "./images/modern_office_1764673555771.png" }, { l: "Non", i: "power-off", v: "Non", img: "./images/living_room_no_view_1764673606484.png" }] },
  5: { q: "Que doit faire votre maison ?", opts: [{ l: "Sécuriser ma famille", i: "shield-alert", v: "Secu", img: "./images/modern_house_option_1764673436863.png" }, { l: "Réduire mes factures", i: "zap", v: "Eco", img: "./images/insulation_good_1764673621158.png" }, { l: "Gérer mes lumières", i: "lightbulb", v: "Conf", img: "./images/apartment_interior_1764673540632.png" }] }
};

export const DB_PRODUCTS: Record<ProductKey, ProductDetail> = {
  camera: { title: "Caméra Hub G3", icon: "camera", desc: "Centrale & Vidéo", image: "./images/camera_3d.png" },
  motion: { title: "Capteur Mouvement", icon: "radio", desc: "Sécurité & Lumière", image: "./images/motion_sensor.png" },
  door: { title: "Capteur Ouverture", icon: "door-open", desc: "Portes & Fenêtres", image: "./images/door_sensor.png" },
  siren: { title: "Sirène Intérieure", icon: "bell-ring", desc: "Alarme 105dB", image: "./images/button.png" },
  smoke: { title: "Détecteur Fumée", icon: "flame", desc: "Sécurité Incendie" },
  thermo: { title: "Tête Thermostatique", icon: "thermometer", desc: "Chauffage auto" },
  temp: { title: "Capteur Température", icon: "droplets", desc: "Suivi climat" },
  plug: { title: "Prise Connectée", icon: "plug", desc: "Contrôle appareils" },
  switch: { title: "Interrupteur Sans Fil", icon: "toggle-left", desc: "Commande lumière" },
  button: { title: "Bouton", icon: "shield", desc: "Contrôle alarme", image: "./images/button.png" }
};