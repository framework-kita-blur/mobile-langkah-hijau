import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { brand } from '@/constants/brand';
import { AuthProvider, useAuth } from '@/providers/auth-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  return (
    <AuthProvider>
      <RootNavigator fontsReady={fontsLoaded || !!fontError} />
    </AuthProvider>
  );
}

function RootNavigator({ fontsReady }: { fontsReady: boolean }) {
  const { isSignedIn, isLoading } = useAuth();

  useEffect(() => {
    if (fontsReady && !isLoading) SplashScreen.hideAsync();
  }, [fontsReady, isLoading]);

  if (!fontsReady || isLoading) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: brand.cream } }}>
        <Stack.Protected guard={!isSignedIn} redirectTo="/home">
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </Stack.Protected>
        <Stack.Protected guard={isSignedIn} redirectTo="/login">
          <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
