import * as Dialog from '@radix-ui/react-dialog';
import { X, ArrowUpRight, Sparkles } from 'lucide-react';
import { NAV_ITEMS } from './navConfig';
import Button from '../ui/Button';

export default function MobileMenu({ open, onOpenChange, activeSection, onNavClick, onOpenGuide }) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal>
    <Dialog.Overlay className="mobile-menu-overlay" />
    <Dialog.Content className="mobile-menu-panel">
      <div className="mobile-menu-heading"><Dialog.Title>Explore the portfolio</Dialog.Title><Dialog.Close asChild><Button size="icon" variant="ghost" aria-label="Close menu"><X size={20} /></Button></Dialog.Close></div>
      <Dialog.Description>Engineering, research, and the work in between.</Dialog.Description>
      <nav aria-label="All sections">{NAV_ITEMS.map(item => { const Icon = item.icon; return <a key={item.id} href={item.href} onClick={e => onNavClick(e, item)} aria-current={activeSection === item.id ? 'page' : undefined}><Icon size={18} /><span>{item.label}</span><ArrowUpRight size={15} /></a>; })}</nav>
      <Button variant="secondary" className="mobile-guide-action" onClick={onOpenGuide}><Sparkles size={18} />Portfolio guide</Button>
    </Dialog.Content>
  </Dialog.Portal></Dialog.Root>;
}
