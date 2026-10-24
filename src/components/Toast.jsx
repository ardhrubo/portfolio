import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast-notification" role="status" aria-live="polite">
      <CheckCircle2 className="size-4.5 text-primary shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
