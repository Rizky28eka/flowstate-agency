export type Currency = 'USD' | 'IDR' | 'EUR' | 'GBP';
export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';

export interface OrganizationSettings {
  organizationName: string;
  logoUrl: string;
  timezone: string;
  currency: Currency;
  dateFormat: DateFormat;
}

// Mock data representing the current organization settings stored in the database.
export const MOCK_ORGANIZATION_SETTINGS: OrganizationSettings = {
  organizationName: 'Flowstate Agency',
  logoUrl: '/placeholder.svg', // Using a placeholder from the public folder
  timezone: 'Asia/Jakarta',
  currency: 'IDR',
  dateFormat: 'DD/MM/YYYY',
};

// Pre-defined options for settings UI
export const TIMEZONE_OPTIONS = [
  'America/New_York', 
  'Europe/London', 
  'Asia/Tokyo', 
  'Asia/Jakarta', 
  'Australia/Sydney'
];

export const CURRENCY_OPTIONS: Currency[] = ['USD', 'IDR', 'EUR', 'GBP'];

export const DATE_FORMAT_OPTIONS: DateFormat[] = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'];
