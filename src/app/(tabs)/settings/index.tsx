import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { TabScreen } from '@/components/tab-screen';
import { brand } from '@/constants/brand';
import { useAuth } from '@/providers/auth-provider';

type MenuItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export default function SettingsScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const comingSoon = (title: string) => Alert.alert(title, 'Fitur ini belum tersedia pada tahap antarmuka.');

  const menu: MenuItem[] = [
    { label: 'Notifikasi', icon: 'notifications-outline', onPress: () => comingSoon('Notifikasi') },
    { label: 'Izin aplikasi', icon: 'shield-checkmark-outline', onPress: () => router.push('/settings/permissions') },
    {
      label: 'Tentang aplikasi',
      icon: 'information-circle-outline',
      onPress: () => Alert.alert('Langkah Hijau', 'Pemantau emisi karbon mobilitas mahasiswa Universitas Padjadjaran.'),
    },
  ];

  const onSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <TabScreen>
      <Pressable accessibilityRole="button" onPress={() => router.push('/settings/profile')}>
        <Card style={styles.profile}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={26} color={brand.gray} />
          </View>
          <View style={styles.profileInfo}>
            <AppText weight="semibold" size={16} color={brand.primaryDark}>
              {user.name}
            </AppText>
            <AppText size={13} color={brand.gray}>
              {user.email}
            </AppText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={brand.gray} />
        </Card>
      </Pressable>

      <Card>
        {menu.map((item, index) => (
          <Pressable
            key={item.label}
            accessibilityRole="button"
            onPress={item.onPress}
            style={[styles.menuRow, index > 0 && styles.menuDivider]}>
            <Ionicons name={item.icon} size={20} color={brand.primary} />
            <AppText weight="medium" size={14} color={brand.black} style={styles.menuLabel}>
              {item.label}
            </AppText>
            <Ionicons name="chevron-forward" size={18} color={brand.gray} />
          </Pressable>
        ))}
      </Card>

      <Button label="Keluar" variant="dangerSoft" height={32} fontSize={14} onPress={onSignOut} />
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  profile: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: brand.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: { flex: 1 },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: 12, height: 52, paddingHorizontal: 16 },
  menuDivider: { borderTopWidth: 1, borderTopColor: brand.border },
  menuLabel: { flex: 1 },
});
