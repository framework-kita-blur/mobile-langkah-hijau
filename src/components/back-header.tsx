import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { brand } from '@/constants/brand';

/** Header layar dalam: tombol kembali dan judul. */
export function BackHeader({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 14 }]}>
      <Pressable accessibilityRole="button" accessibilityLabel="Kembali" hitSlop={12} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color={brand.gray} />
      </Pressable>
      <AppText weight="semibold" size={16} color={brand.primaryDark}>
        {title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: brand.white,
  },
});
