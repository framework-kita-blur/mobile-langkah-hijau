import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { brand } from '@/constants/brand';

/** Kerangka layar tab utama: header sapaan tetap di atas, isi bisa digulir. */
export function TabScreen({ children }: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.cream },
  content: { padding: 16, gap: 12 },
});
