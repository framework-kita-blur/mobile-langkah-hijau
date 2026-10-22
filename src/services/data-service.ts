/**
 * SERVICE PLACEHOLDER: data perjalanan, ringkasan emisi, dan kendaraan.
 * TODO: ganti dengan SQLite (data lokal) dan Supabase (sinkronisasi, kendaraan).
 * Fungsi baca masih sinkron agar layar sederhana. Saat backend siap, ubah menjadi async.
 */
import {
  mockSummary,
  mockTrips,
  mockVehicles,
  type MonthlySummary,
  type Trip,
  type Vehicle,
} from '@/data/mock';

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export function getMonthlySummary(): MonthlySummary {
  return mockSummary;
}

export function getTrips(): Trip[] {
  return mockTrips;
}

export function getVehicles(): Vehicle[] {
  return mockVehicles;
}

/** TODO: kirim ringkasan perjalanan berstatus Pending ke backend (idempoten). */
export async function syncTrips(): Promise<{ synced: number }> {
  await wait(800);
  return { synced: mockTrips.length };
}
