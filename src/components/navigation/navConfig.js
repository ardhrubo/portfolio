import {
  Home,
  Briefcase,
  FolderKanban,
  Layers,
  Compass,
  Atom,
  Mail,
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'hero', label: 'Home', href: '#hero', icon: Home },
  { id: 'experience', label: 'Experience', href: '#experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', href: '#projects', icon: FolderKanban },
  { id: 'skills', label: 'Skills', href: '#skills', icon: Layers },
  { id: 'strategy', label: 'Approach', href: '#strategy', icon: Compass },
  { id: 'simulation-lab', label: '3D Lab', href: '#simulation-lab', icon: Atom },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
];

export const MOBILE_NAV_IDS = ['hero', 'projects', 'experience', 'contact'];

export const MOBILE_NAV_ITEMS = MOBILE_NAV_IDS.map((id) =>
  NAV_ITEMS.find((item) => item.id === id)
);
