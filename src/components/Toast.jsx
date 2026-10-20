import React, { useEffect } from 'react';

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
      <i className="fa-solid fa-circle-check" style={{ color: '#38bdf8' }}></i>
      <span>{message}</span>
    </div>
  );
}
