'use client';

import { useState } from 'react';
import { NumberFormatBase } from 'react-number-format';
import { groupDigits, stripToDigits } from './lib/format-number';

interface NumberFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (digits: string) => void;
}

export default function NumberField({ id, label, placeholder, value, onChange }: NumberFieldProps) {
  // Comma grouping is only applied while the field is NOT focused, so the
  // displayed value never diverges from what's actually being typed (see
  // format-number.ts for why that matters for undo/redo).
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex-1 basis-[200px]">
      <label htmlFor={id} className="block text-xs opacity-70 mb-1 text-[var(--color-text)]">{label}</label>
      <NumberFormatBase
        id={id}
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        format={digits => (isFocused ? digits : groupDigits(digits))}
        removeFormatting={stripToDigits}
        onValueChange={values => onChange(values.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={e => e.currentTarget.select()}
        className="w-full min-h-9 rounded-[var(--radius-md)] px-3 bg-[var(--color-surface)] border border-[var(--color-divider)] text-[var(--color-text)] hover:border-white/30 focus:outline-none focus:border-[var(--color-accent)]"
      />
    </div>
  );
}
