/**
 * DATA PLACEHOLDER.
 * Hanya dipakai agar antarmuka bisa dilihat sebelum backend (Supabase) selesai.
 * Hapus berkas ini setelah `src/services/*` terhubung ke backend sungguhan.
 */

export type User = {
  id: string;
  name: string;
  email: string;
  npm: string;
  faculty: string;
};

export type GeofenceLabel = 'Unpad' | 'Pribadi';

export type Trip = {
  id: string;
  /** Label tanggal siap tampil, mis. "Selasa 20 Okt 2026". */
  dateLabel: string;
  distanceKm: number;
  durationMin: number;
  emissionKg: number;
  label: GeofenceLabel;
};

export type RecentActivity = {
  id: string;
  dateLabel: string;
  emissionKg: number;
};

export type MonthlySummary = {
  emissionKg: number;
  /** Persentase perubahan dibanding bulan lalu. Positif berarti lebih tinggi. */
  changePercent: number;
  commutingKg: number;
  personalKg: number;
  totalDistanceKm: number;
  recent: RecentActivity[];
};

export type VehicleType = 'motorcycle' | 'car';

export type Vehicle = {
  id: string;
  name: string;
  type: VehicleType;
  cc: number;
  fuel: string;
  isActive: boolean;
};

export const mockUser: User = {
  id: 'user-1',
  name: 'Bagas Anung Bayu Nugraha',
  email: 'banung0706@gmail.com',
  npm: '140810240046',
  faculty: 'Fakultas Matematika dan IPA',
};

export const mockSummary: MonthlySummary = {
  emissionKg: 42,
  changePercent: 18,
  commutingKg: 21,
  personalKg: 21,
  totalDistanceKm: 21,
  recent: [
    { id: 'r1', dateLabel: 'Selasa, 20 Okt 2026', emissionKg: 8 },
    { id: 'r2', dateLabel: 'Selasa, 20 Okt 2026', emissionKg: 8 },
    { id: 'r3', dateLabel: 'Selasa, 20 Okt 2026', emissionKg: 8 },
  ],
};

export const mockTrips: Trip[] = [
  { id: 't1', dateLabel: 'Selasa 20 Okt 2026', distanceKm: 20, durationMin: 24, emissionKg: 24, label: 'Pribadi' },
  { id: 't2', dateLabel: 'Selasa 20 Okt 2026', distanceKm: 20, durationMin: 24, emissionKg: 24, label: 'Pribadi' },
  { id: 't3', dateLabel: 'Senin 19 Okt 2026', distanceKm: 20, durationMin: 24, emissionKg: 24, label: 'Pribadi' },
];

export const mockVehicles: Vehicle[] = [
  { id: 'v1', name: 'Kendaraan 1', type: 'motorcycle', cc: 200, fuel: 'Bensin', isActive: true },
];
