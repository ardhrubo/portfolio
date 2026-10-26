import {
  Home,
  Briefcase,
  FolderKanban,
  Layers,
  Compass,
  Atom,
  Mail,
  Handshake,
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'hero', label: 'Overview', href: '#hero', icon: Home },
  { id: 'projects', label: 'Projects', href: '#projects', icon: FolderKanban },
  { id: 'experience', label: 'Experience', href: '#experience', icon: Briefcase },
  { id: 'skills', label: 'Tech stack', href: '#skills', icon: Layers },
  { id: 'strategy', label: 'Approach', href: '#strategy', icon: Compass },
  { id: 'simulation-lab', label: '3D playground', href: '#simulation-lab', icon: Atom },
  { id: 'services', label: 'Services', href: '#services', icon: Handshake },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
];

export const MOBILE_NAV_IDS = ['hero', 'projects', 'experience', 'contact'];

export const MOBILE_NAV_ITEMS = MOBILE_NAV_IDS.map((id) =>
  NAV_ITEMS.find((item) => item.id === id)
);
