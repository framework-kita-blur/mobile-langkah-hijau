import { Stack } from 'expo-router';

import { brand } from '@/constants/brand';

/** Stack di dalam tab Settings, supaya tab bar tetap tampil di layar Profil dan Izin Aplikasi. */
export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: brand.cream } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="permissions" />
    </Stack>
  );
}
