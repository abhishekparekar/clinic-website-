import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

let addToastGlobal = null;

export function showToast(message, type = 'success') {
  if (addToastGlobal) {
    addToastGlobal(message, type);
  }
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    addToastGlobal = (message, type) => {
      const id = Date.now() + Math.random();
      setToasts(prev => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 4200);
    };

    return () => {
      addToastGlobal = null;
    };
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type} glass-panel`} role="alert">
          {t.type === 'success' && <CheckCircle2 size={20} color="#059669" />}
          {t.type === 'error' && <AlertCircle size={20} color="#DC2626" />}
          {t.type === 'info' && <Info size={20} color="#0284C7" />}
          <span style={{ flex: 1, fontWeight: 500, color: 'var(--text-main)' }}>{t.message}</span>
          <button 
            onClick={() => removeToast(t.id)} 
            style={{ padding: '4px', color: 'var(--text-subtle)', cursor: 'pointer' }}
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
