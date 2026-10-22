import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { mockUser, type User } from '@/data/mock';
import * as authService from '@/services/auth-service';

type AuthContextValue = {
  /** Pengguna aktif. Selama masih placeholder, nilainya data mock walau belum login. */
  user: User;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (fullName: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * PLACEHOLDER: belum ada penjagaan rute. Semua layar bisa dibuka agar UI mudah ditinjau.
 * TODO: setelah Supabase Auth terpasang, simpan sesi dan lindungi rute (Stack.Protected).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    setUser(await authService.signIn(email, password));
  }, []);

  const signUp = useCallback(async (fullName: string, email: string, password: string) => {
    setUser(await authService.signUp(fullName, email, password));
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user: user ?? mockUser, isSignedIn: user !== null, signIn, signUp, signOut }),
    [user, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth harus dipakai di dalam <AuthProvider>.');
  return context;
}
