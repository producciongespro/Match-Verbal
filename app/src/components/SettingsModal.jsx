import React, { useState } from 'react';
import { RefreshCw, X } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, onConfirmReset }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setShowConfirm(false);
    onClose();
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onConfirmReset();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-[#009ee3] px-5 py-3.5 text-white">
          <h3 className="text-xl font-bold tracking-wide">Setup</h3>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1 text-white/90 transition hover:bg-white/20 hover:text-white cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-center">
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="mx-auto flex items-center justify-center gap-2.5 rounded-xl bg-sky-50 px-5 py-3 text-base font-bold text-[#005386] border border-sky-200 transition hover:bg-sky-100 active:scale-98 cursor-pointer"
          >
            <RefreshCw className="h-5 w-5 text-[#009ee3]" />
            <span>Réinitialiser mes progrès</span>
          </button>

          {showConfirm && (
            <div className="mt-5 rounded-xl bg-slate-50 p-4 border border-slate-200 animate-fade-in">
              <p className="text-slate-700 font-semibold mb-4">
                Êtes-vous sûr de vouloir réinitialiser votre progression ?
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-28 rounded-xl bg-[#e4241f] py-2.5 font-bold text-white shadow-xs transition hover:bg-red-700 active:scale-95 cursor-pointer"
                >
                  Oui
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-28 rounded-xl bg-slate-200 py-2.5 font-bold text-slate-700 transition hover:bg-slate-300 active:scale-95 cursor-pointer"
                >
                  Non
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
