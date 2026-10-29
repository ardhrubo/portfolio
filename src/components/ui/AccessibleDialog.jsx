import { useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export default function AccessibleDialog({ title, description, onClose, overlayClass, className, children, onKeyDown }) {
  const opener = useRef(document.activeElement);
  return <Dialog.Root open onOpenChange={open => { if (!open) onClose(); }}>
    <Dialog.Portal><Dialog.Overlay className={overlayClass}>
      <Dialog.Content className={className} onKeyDown={onKeyDown}
        onCloseAutoFocus={event => { event.preventDefault(); if (opener.current?.isConnected) opener.current.focus(); else document.querySelector('.mobile-menu-trigger')?.focus(); }}>
        <Dialog.Title className="sr-only">{title}</Dialog.Title>
        <Dialog.Description className="sr-only">{description}</Dialog.Description>
        {children}
      </Dialog.Content>
    </Dialog.Overlay></Dialog.Portal>
  </Dialog.Root>;
}
