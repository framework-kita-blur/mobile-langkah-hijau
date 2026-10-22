/**
 * SERVICE PLACEHOLDER: autentikasi.
 * TODO: ganti isi fungsi-fungsi ini dengan Supabase Auth (email + kata sandi, JWT).
 * Tanda tangan fungsi sengaja dibuat async agar pemanggil tidak perlu berubah nanti.
 */
import { mockUser, type User } from '@/data/mock';

const FAKE_LATENCY_MS = 400;
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function signIn(_email: string, _password: string): Promise<User> {
  await wait(FAKE_LATENCY_MS);
  return mockUser;
}

export async function signUp(_fullName: string, _email: string, _password: string): Promise<User> {
  await wait(FAKE_LATENCY_MS);
  return mockUser;
}

export async function signOut(): Promise<void> {
  await wait(100);
}

export async function changePassword(_oldPassword: string, _newPassword: string): Promise<void> {
  await wait(FAKE_LATENCY_MS);
}
