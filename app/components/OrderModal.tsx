'use client';

import React from 'react';
import OrderForm from './OrderForm';

type OrderModalProps = {
  open: boolean;
  onClose: () => void;
  defaultCombo?: 'c1' | 'c2' | 'c3';
  defaultSize?: string;
};

export default function OrderModal({ open, onClose, defaultCombo = 'c1', defaultSize = '' }: OrderModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="absolute -top-10 right-0">
          <button
            aria-label="Đóng"
            onClick={onClose}
            className="text-white bg-red-600 hover:bg-red-700 rounded-full px-3 py-1 text-sm shadow"
          >
            Đóng
          </button>
        </div>
        <OrderForm defaultCombo={defaultCombo} defaultSize={defaultSize} onSubmitted={onClose} />
      </div>
    </div>
  );
}


