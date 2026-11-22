import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, Globe2, Search, AlertCircle } from 'lucide-react';
import {
  COUNTRY_CODES,
  CountryCodeItem,
  DEFAULT_COUNTRY_CODE,
  parsePhoneNumber,
} from '../config/countryCodes';

interface PhoneInputFieldProps {
  value: string;
  onChange: (fullPhoneNumber: string) => void;
  onCountrySelect?: (countryName: string) => void;
  label?: string;
  required?: boolean;
  id?: string;
  placeholder?: string;
  className?: string;
  helperText?: string;
  error?: string | null;
}

export const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  value,
  onChange,
  onCountrySelect,
  label = 'WhatsApp / Phone Number',
  required = true,
  id = 'phone-input',
  placeholder,
  className = '',
  helperText,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const initialParsed = parsePhoneNumber(value);
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeItem>(
    initialParsed.countryItem || DEFAULT_COUNTRY_CODE
  );
  const [localNumber, setLocalNumber] = useState<string>(initialParsed.localNumber || '');

  // Keep internal state synchronized when parent value changes externally
  useEffect(() => {
    if (!value) {
      setLocalNumber('');
      return;
    }
    const updated = parsePhoneNumber(value);
    setLocalNumber(updated.localNumber || '');
    if (updated.dialCode && updated.dialCode !== selectedCountry.dialCode) {
      const matched =
        updated.countryItem ||
        COUNTRY_CODES.find((c) => c.dialCode === updated.dialCode) ||
        DEFAULT_COUNTRY_CODE;
      setSelectedCountry(matched);
    }
  }, [value, selectedCountry.dialCode]);

  // Focus search input when opening dropdown
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleDialCodeSelect = (country: CountryCodeItem) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery('');

    const combined = localNumber ? `${country.dialCode} ${localNumber}` : country.dialCode;
    onChange(combined);

    if (onCountrySelect) {
      onCountrySelect(country.name);
    }
  };

  const handleLocalNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // Support pasting a full international number (e.g. +233 24 123 4567)
    if (raw.startsWith('+')) {
      const parsedPasted = parsePhoneNumber(raw);
      if (parsedPasted.countryItem) {
        setSelectedCountry(parsedPasted.countryItem);
        if (onCountrySelect) {
          onCountrySelect(parsedPasted.countryItem.name);
        }
      }
      setLocalNumber(parsedPasted.localNumber);
      onChange(raw.trim());
      return;
    }

    const cleaned = raw.replace(/[^\d\s-]/g, '');
    setLocalNumber(cleaned);
    const combined = cleaned.trim() ? `${selectedCountry.dialCode} ${cleaned.trim()}` : '';
    onChange(combined);
  };

  const filteredCountries = COUNTRY_CODES.filter((c) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  const hasError = Boolean(error);

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-[13px] font-semibold text-[#0B1F3A] tracking-[-0.01em]"
        >
          {label}
          {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div
        className={`relative flex items-stretch min-h-[46px] rounded-lg bg-[#F4F6F9] border transition-all duration-150 ${
          hasError
            ? 'border-red-400 bg-red-50/30 focus-within:bg-white focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15'
            : 'border-slate-200 hover:border-slate-300 focus-within:bg-white focus-within:border-[#0B1F3A] focus-within:ring-2 focus-within:ring-[#0B1F3A]/10'
        }`}
      >
        {/* Country Code Selector */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={`Selected country code: ${selectedCountry.name} ${selectedCountry.dialCode}`}
            className="h-full min-h-[44px] flex items-center gap-1.5 px-3 bg-slate-100/80 hover:bg-slate-200/70 border-r border-slate-200 rounded-l-lg text-[#0B1F3A] text-sm font-semibold transition-colors select-none focus:outline-none cursor-pointer"
          >
            <span className="text-base leading-none" aria-hidden="true">
              {selectedCountry.flag}
            </span>
            <span className="font-mono text-[13px] font-semibold tabular-nums text-[#0B1F3A]">
              {selectedCountry.dialCode}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Searchable Dropdown Popover */}
          {isOpen && (
            <div
              role="listbox"
              aria-label="Select country calling code"
              className="absolute left-0 top-full mt-1.5 w-[min(19.5rem,calc(100vw-2.5rem))] max-h-72 bg-white rounded-xl shadow-[0_16px_40px_rgba(11,31,58,0.16)] border border-slate-200 z-50 overflow-hidden flex flex-col"
            >
              <div className="p-2.5 border-b border-slate-100 bg-[#F8FAFC]">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search country or code (+231, Liberia)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0B1F3A] text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="overflow-y-auto flex-1 divide-y divide-slate-100/80 p-1">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => {
                    const isSelected = country.code === selectedCountry.code;
                    return (
                      <button
                        key={`${country.code}-${country.dialCode}`}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleDialCodeSelect(country)}
                        className={`w-full min-h-[40px] flex items-center justify-between px-2.5 py-2 text-left text-xs rounded-lg transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#0B1F3A]/6 text-[#0B1F3A] font-semibold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <span className="text-base leading-none shrink-0" aria-hidden="true">
                            {country.flag}
                          </span>
                          <span className="truncate">{country.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="font-mono font-semibold tabular-nums text-[#0B1F3A]">
                            {country.dialCode}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#C5922E]" />}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No country found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Local Phone Number Input */}
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required={required}
          value={localNumber}
          onChange={handleLocalNumberChange}
          placeholder={placeholder || `e.g. ${selectedCountry.example}`}
          aria-invalid={hasError}
          className="flex-1 min-w-0 px-3.5 py-2.5 bg-transparent rounded-r-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none tabular-nums"
        />
      </div>

      {error ? (
        <p className="text-xs text-red-600 font-medium flex items-center gap-1.5 pt-0.5" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : (
        <p className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
          <Globe2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            {helperText ||
              `${selectedCountry.flag} ${selectedCountry.name} (${selectedCountry.dialCode}) — include your active WhatsApp number for admissions updates.`}
          </span>
        </p>
      )}
    </div>
  );
};
