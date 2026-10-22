/**
 * Palet warna dan font Langkah Hijau.
 * Nilai diambil dari desain di folder `Asset_Mobile_App`.
 */
export const brand = {
  primary: '#266210',
  primaryDark: '#063B00',
  lime: '#90B800',
  yellow: '#E1E100',
  cream: '#F9FBF3',
  softGreen: '#E8EFD5',
  white: '#FFFFFF',
  border: '#E5E5E5',
  muted: '#F5F5F5',
  gray: '#737373',
  grayDark: '#4B5563',
  text: '#1F2937',
  black: '#0A0A0A',
  danger: '#D33C33',
  dangerSoft: '#F9E6E3',
  warning: '#E7000B',
  switchOff: '#D4D4D4',
} as const;

/** Nama font Poppins yang dimuat di `src/app/_layout.tsx`. */
export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
} as const;

export type FontWeight = keyof typeof fonts;
