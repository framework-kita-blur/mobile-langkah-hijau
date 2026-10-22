import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { brand } from '@/constants/brand';
import { useAuth } from '@/providers/auth-provider';

/** Header sapaan di layar tab utama: avatar, "Halo, <nama>!", dan subjudul. */
export function AppHeader() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <Ionicons name="person-circle" size={38} color={brand.gray} />
      <View style={styles.texts}>
        <AppText weight="semibold" size={12} color={brand.primary}>
          Halo, {user.name}!
        </AppText>
        <AppText size={12} color={brand.gray}>
          Siap melangkah hari ini?
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: brand.white,
    borderBottomWidth: 1,
    borderBottomColor: brand.border,
  },
  texts: { flex: 1 },
});
