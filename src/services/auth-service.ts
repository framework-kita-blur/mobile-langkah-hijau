import { ApiError, apiRequest } from '@/lib/api';
import { clearToken, setStoredUser, setToken } from '@/lib/token-storage';
import type { User } from '@/types/user';

type LoginResponse = {
  token: string;
  user: {
    user_id: string;
    name: string;
    email: string;
    role: 'Web' | 'Mobile';
    student_profile: { npm: string; faculty: string; user_id: string } | null;
  };
};

export async function signIn(email: string, password: string): Promise<User> {
  const data = await apiRequest<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });

  if (!data?.token || !data.user) {
    throw new ApiError('Respons server tidak dikenali. Coba lagi nanti.');
  }

  if (data.user.role !== 'Mobile') {
    throw new ApiError('Akun ini tidak dapat digunakan di aplikasi mobile.', 403);
  }

  const user: User = {
    id: data.user.user_id,
    name: data.user.name,
    email: data.user.email,
    npm: data.user.student_profile?.npm ?? '',
    faculty: data.user.student_profile?.faculty ?? '',
  };

  await setToken(data.token);
  await setStoredUser(user);
  return user;
}

export async function signUp(_fullName: string, _email: string, _password: string): Promise<User> {
  // TODO: sambungkan ke POST /api/auth/register setelah endpoint tersedia di backend.
  throw new ApiError('Pendaftaran belum tersedia. Hubungi tim backend.');
}

export async function signOut(): Promise<void> {
  await clearToken();
}

export async function changePassword(_oldPassword: string, _newPassword: string): Promise<void> {
  // TODO: sambungkan ke endpoint ganti kata sandi setelah tersedia di backend.
  throw new ApiError('Ganti kata sandi belum tersedia.');
}
