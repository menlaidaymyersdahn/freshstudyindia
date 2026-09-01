import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, Phone, Globe2 } from 'lucide-react';
import { COUNTRY_CODES, CountryCodeItem, DEFAULT_COUNTRY_CODE, parsePhoneNumber } from '../config/countryCodes';

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
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse current value
  const parsed = parsePhoneNumber(value);
  const [selectedDialCode, setSelectedDialCode] = useState<string>(parsed.dialCode || DEFAULT_COUNTRY_CODE.dialCode);
  const [localNumber, setLocalNumber] = useState<string>(parsed.localNumber || '');

  // Keep internal state synced if parent value changes externally
  useEffect(() => {
    const updated = parsePhoneNumber(value);
    setSelectedDialCode(updated.dialCode || DEFAULT_COUNTRY_CODE.dialCode);
    setLocalNumber(updated.localNumber || '');
  }, [value]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentCountry = COUNTRY_CODES.find(c => c.dialCode === selectedDialCode) || DEFAULT_COUNTRY_CODE;

  const handleDialCodeSelect = (country: CountryCodeItem) => {
    setSelectedDialCode(country.dialCode);
    setIsOpen(false);
    setSearchQuery('');
    
    const combined = country.dialCode + (localNumber ? ` ${localNumber}` : '');
    onChange(combined);

    if (onCountrySelect) {
      onCountrySelect(country.name);
    }
  };

  const handleLocalNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;

    // If user pasted a full number with a plus sign (e.g. +233 24 123 4567)
    if (raw.startsWith('+')) {
      const parsedPasted = parsePhoneNumber(raw);
      setSelectedDialCode(parsedPasted.dialCode);
      setLocalNumber(parsedPasted.localNumber);
      onChange(raw);
      if (parsedPasted.countryItem && onCountrySelect) {
        onCountrySelect(parsedPasted.countryItem.name);
      }
      return;
    }

    // Clean up unwanted characters except numbers and spaces/dashes
    const cleaned = raw.replace(/[^\d\s\-]/g, '');
    setLocalNumber(cleaned);
    const combined = `${selectedDialCode} ${cleaned}`.trim();
    onChange(combined);
  };

  // Filter countries for search
  const filteredCountries = COUNTRY_CODES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.dialCode.includes(searchQuery) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="block text-xs font-bold text-slate-800">
            {label} {required && <span className="text-red-500 font-bold">*</span>}
          </label>
          <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
            Country Code Required
          </span>
        </div>
      )}

      <div className="relative flex items-stretch rounded-xl bg-slate-50 border border-sky-200 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all shadow-sm">
        {/* Country Code Dropdown Trigger */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-full flex items-center gap-1.5 px-3 py-2.5 bg-slate-100/90 hover:bg-slate-200/80 border-r border-sky-200 rounded-l-xl text-slate-900 font-bold text-xs sm:text-sm transition-colors select-none focus:outline-none"
            title="Select Country Calling Code"
          >
            <span className="text-base leading-none">{currentCountry.flag}</span>
            <span className="font-mono text-slate-950 font-bold tracking-tight">{currentCountry.dialCode}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-72 sm:w-80 max-h-72 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
              {/* Search Bar */}
              <div className="p-2 border-b border-slate-100 bg-slate-50">
                <input
                  type="text"
                  autoFocus
                  placeholder="Search country or code (e.g. +231, Liberia)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {/* Country List */}
              <div className="overflow-y-auto flex-1 divide-y divide-slate-50 p-1">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => {
                    const isSelected = country.dialCode === selectedDialCode;
                    return (
                      <button
                        key={`${country.code}-${country.dialCode}`}
                        type="button"
                        onClick={() => handleDialCodeSelect(country)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs rounded-lg transition-colors ${
                          isSelected ? 'bg-blue-50 text-blue-900 font-bold' : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className="text-base">{country.flag}</span>
                          <span className="truncate">{country.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="font-mono font-bold text-slate-900">{country.dialCode}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
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

        {/* Local Number Input */}
        <input
          id={id}
          type="tel"
          required={required}
          value={localNumber}
          onChange={handleLocalNumberChange}
          placeholder={placeholder || `e.g. ${currentCountry.example}`}
          className="flex-1 px-3 py-2.5 bg-transparent rounded-r-xl text-slate-900 font-semibold text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      {/* Helper & Requirement Guidance */}
      {error ? (
        <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1 mt-1">
          <span>⚠️</span> {error}
        </p>
      ) : (
        <p className="text-[11px] text-slate-500 flex items-center gap-1">
          <Globe2 className="w-3 h-3 text-slate-400 inline" />
          <span>{helperText || `Selected code: ${currentCountry.flag} ${currentCountry.name} (${currentCountry.dialCode}). Our admissions office in Monrovia & India will contact you via WhatsApp.`}</span>
        </p>
      )}
    </div>
  );
};
