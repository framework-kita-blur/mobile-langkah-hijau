import { router } from 'expo-router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { setUnauthorizedHandler } from '@/lib/api';
import { getStoredUser, getToken } from '@/lib/token-storage';
import * as authService from '@/services/auth-service';
import type { User } from '@/types/user';

type AuthContextValue = {
  user: User | null;
  isSignedIn: boolean;
  /** True selama sesi tersimpan dipulihkan saat aplikasi dibuka. */
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (fullName: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = useCallback(async (email: string, password: string) => {
    setUser(await authService.signIn(email, password));
  }, []);

  const signUp = useCallback(async (fullName: string, email: string, password: string) => {
    setUser(await authService.signUp(fullName, email, password));
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authService.signOut();
    } catch {
      // Tetap keluarkan pengguna walau penyimpanan lokal gagal dibersihkan.
    } finally {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      void signOut().finally(() => router.replace('/login'));
    });
    return () => setUnauthorizedHandler(null);
  }, [signOut]);

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      try {
        const [token, storedUser] = await Promise.all([getToken(), getStoredUser()]);
        if (active && token && storedUser) {
          setUser(storedUser);
        } else if (active && (token || storedUser)) {
          await authService.signOut();
        }
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    void restoreSession();
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isSignedIn: user !== null, isLoading, signIn, signUp, signOut }),
    [user, isLoading, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth harus dipakai di dalam <AuthProvider>.');
  return context;
}
