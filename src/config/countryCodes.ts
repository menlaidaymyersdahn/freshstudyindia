export interface CountryCodeItem {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  example: string;
}

export const COUNTRY_CODES: CountryCodeItem[] = [
  // West & Sub-Saharan Africa (Primary Student Base)
  { name: 'Liberia', code: 'LR', dialCode: '+231', flag: '🇱🇷', example: '88 942 5645' },
  { name: 'Ghana', code: 'GH', dialCode: '+233', flag: '🇬🇭', example: '24 123 4567' },
  { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: '🇳🇬', example: '803 123 4567' },
  { name: 'Sierra Leone', code: 'SL', dialCode: '+232', flag: '🇸🇱', example: '76 123 456' },
  { name: 'Guinea', code: 'GN', dialCode: '+224', flag: '🇬🇳', example: '620 12 34 56' },
  { name: 'Ivory Coast (Côte d’Ivoire)', code: 'CI', dialCode: '+225', flag: '🇨🇮', example: '07 12 34 56' },
  { name: 'Gambia', code: 'GM', dialCode: '+220', flag: '🇬🇲', example: '701 2345' },
  { name: 'Kenya', code: 'KE', dialCode: '+254', flag: '🇰🇪', example: '712 345 678' },
  { name: 'Rwanda', code: 'RW', dialCode: '+250', flag: '🇷🇼', example: '788 123 456' },
  { name: 'Uganda', code: 'UG', dialCode: '+256', flag: '🇺🇬', example: '772 123 456' },
  { name: 'Tanzania', code: 'TZ', dialCode: '+255', flag: '🇹🇿', example: '712 345 678' },
  { name: 'Cameroon', code: 'CM', dialCode: '+237', flag: '🇨🇲', example: '6 71 23 45 67' },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '🇿🇦', example: '71 123 4567' },
  { name: 'Ethiopia', code: 'ET', dialCode: '+251', flag: '🇪🇹', example: '91 123 4567' },
  { name: 'Senegal', code: 'SN', dialCode: '+221', flag: '🇸🇳', example: '77 123 45 67' },
  { name: 'Zambia', code: 'ZM', dialCode: '+260', flag: '🇿🇲', example: '97 123 4567' },
  { name: 'Zimbabwe', code: 'ZW', dialCode: '+263', flag: '🇿🇼', example: '77 123 4567' },
  { name: 'DR Congo', code: 'CD', dialCode: '+243', flag: '🇨🇩', example: '81 234 5678' },
  { name: 'Congo Republic', code: 'CG', dialCode: '+242', flag: '🇨🇬', example: '06 123 4567' },
  { name: 'Togo', code: 'TG', dialCode: '+228', flag: '🇹🇬', example: '90 12 34 56' },
  { name: 'Benin', code: 'BJ', dialCode: '+229', flag: '🇧🇯', example: '97 12 34 56' },
  { name: 'Mali', code: 'ML', dialCode: '+223', flag: '🇲🇱', example: '70 12 34 56' },
  { name: 'Burkina Faso', code: 'BF', dialCode: '+226', flag: '🇧🇫', example: '70 12 34 56' },
  { name: 'Niger', code: 'NE', dialCode: '+227', flag: '🇳🇪', example: '90 12 34 56' },
  { name: 'Gabon', code: 'GA', dialCode: '+241', flag: '🇬🇦', example: '06 12 34 56' },
  { name: 'Angola', code: 'AO', dialCode: '+244', flag: '🇦🇴', example: '923 123 456' },
  { name: 'Mozambique', code: 'MZ', dialCode: '+258', flag: '🇲🇿', example: '84 123 4567' },
  { name: 'Botswana', code: 'BW', dialCode: '+267', flag: '🇧🇼', example: '71 234 567' },
  { name: 'Namibia', code: 'NA', dialCode: '+264', flag: '🇳🇦', example: '81 123 4567' },
  { name: 'South Sudan', code: 'SS', dialCode: '+211', flag: '🇸🇸', example: '92 123 4567' },
  { name: 'Sudan', code: 'SD', dialCode: '+249', flag: '🇸🇩', example: '91 123 4567' },
  { name: 'Egypt', code: 'EG', dialCode: '+20', flag: '🇪🇬', example: '10 1234 5678' },
  { name: 'Morocco', code: 'MA', dialCode: '+212', flag: '🇲🇦', example: '6 12 34 56 78' },

  // Asia & Destination
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳', example: '94441 47777' },
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: '🇦🇪', example: '50 123 4567' },
  { name: 'Qatar', code: 'QA', dialCode: '+974', flag: '🇶🇦', example: '3312 3456' },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '+966', flag: '🇸🇦', example: '50 123 4567' },
  { name: 'China', code: 'CN', dialCode: '+86', flag: '🇨🇳', example: '138 0013 8000' },
  { name: 'Philippines', code: 'PH', dialCode: '+63', flag: '🇵🇭', example: '917 123 4567' },
  { name: 'Pakistan', code: 'PK', dialCode: '+92', flag: '🇵🇰', example: '300 1234567' },
  { name: 'Bangladesh', code: 'BD', dialCode: '+880', flag: '🇧🇩', example: '1712 345678' },
  { name: 'Sri Lanka', code: 'LK', dialCode: '+94', flag: '🇱🇰', example: '71 234 5678' },
  { name: 'Nepal', code: 'NP', dialCode: '+977', flag: '🇳🇵', example: '984 1234567' },

  // Americas, Europe & Global
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', example: '202 555 0123' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦', example: '416 555 0123' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', example: '7911 123456' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺', example: '412 345 678' },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪', example: '151 23456789' },
  { name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷', example: '6 12 34 56 78' },
  { name: 'Netherlands', code: 'NL', dialCode: '+31', flag: '🇳🇱', example: '6 12345678' },
  { name: 'Sweden', code: 'SE', dialCode: '+46', flag: '🇸🇪', example: '70 123 45 67' },
  { name: 'Switzerland', code: 'CH', dialCode: '+41', flag: '🇨🇭', example: '78 123 45 67' }
];

export const DEFAULT_COUNTRY_CODE = COUNTRY_CODES[0]; // Liberia (+231)

/**
 * Parses an existing full phone string into a dial code and local number
 */
export function parsePhoneNumber(fullPhone: string): { dialCode: string; localNumber: string; countryItem?: CountryCodeItem } {
  if (!fullPhone) {
    return { dialCode: DEFAULT_COUNTRY_CODE.dialCode, localNumber: '', countryItem: DEFAULT_COUNTRY_CODE };
  }

  const clean = fullPhone.trim();

  // Try matching known dial codes from longest to shortest
  const sortedCodes = [...COUNTRY_CODES].sort((a, b) => b.dialCode.length - a.dialCode.length);
  
  for (const item of sortedCodes) {
    if (clean.startsWith(item.dialCode)) {
      const local = clean.substring(item.dialCode.length).trim().replace(/^[\s\-]+/, '');
      return { dialCode: item.dialCode, localNumber: local, countryItem: item };
    }
  }

  // If starts with +, extract leading digits
  const match = clean.match(/^(\+\d{1,4})(.*)$/);
  if (match) {
    return { dialCode: match[1], localNumber: match[2].trim(), countryItem: undefined };
  }

  // Otherwise assume default dial code
  return { dialCode: DEFAULT_COUNTRY_CODE.dialCode, localNumber: clean, countryItem: DEFAULT_COUNTRY_CODE };
}

/**
 * Validates whether a full phone string has a valid country code and sufficient digits
 */
export function validatePhoneNumber(fullPhone: string): { isValid: boolean; error?: string } {
  if (!fullPhone || !fullPhone.trim()) {
    return { isValid: false, error: 'Phone number with country code is required.' };
  }

  const trimmed = fullPhone.trim();
  if (!trimmed.startsWith('+')) {
    return { isValid: false, error: 'Country code is required (must start with + followed by country code, e.g. +231).' };
  }

  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 8) {
    return { isValid: false, error: 'Please enter a complete phone number including country code (at least 8 digits).' };
  }

  return { isValid: true };
}
