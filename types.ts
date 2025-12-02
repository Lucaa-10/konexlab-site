export type ProductKey = 'camera' | 'motion' | 'door' | 'smoke' | 'button' | 'siren' | 'thermo' | 'temp' | 'plug' | 'switch';

export interface ProductDetail {
  title: string;
  name?: string;
  icon: string;
  desc: string;
  specs?: string[];
}

export interface ConfigOption {
  l: string; // Label
  i: string; // Icon name
  v: string; // Value
  img?: string; // Image path
}

export interface ConfigStep {
  q: string; // Question
  opts: ConfigOption[];
}

export type ModalType = 'menu' | 'faq' | 'legal' | 'checkout' | 'product' | null;

export interface UpsellItem {
  id: string;
  name: string;
  desc: string;
  price: number;
}