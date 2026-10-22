import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { BackHeader } from '@/components/back-header';
import { Card } from '@/components/card';
import { brand } from '@/constants/brand';

type Permission = {
  key: 'push' | 'gps' | 'background';
  label: string;
  icon: ReturnType<typeof renderIcon>;
};

function renderIcon(key: Permission['key']) {
  switch (key) {
    case 'push':
      return <Ionicons name="notifications-outline" size={20} color={brand.primary} />;
    case 'gps':
      return <Ionicons name="location-outline" size={20} color={brand.primary} />;
    case 'background':
      return <MaterialCommunityIcons name="map-marker-path" size={20} color={brand.primary} />;
  }
}

const permissions: Permission[] = [
  { key: 'push', label: 'Notifikasi Push', icon: renderIcon('push') },
  { key: 'gps', label: 'GPS', icon: renderIcon('gps') },
  { key: 'background', label: 'Perekaman Latar Belakang', icon: renderIcon('background') },
];

export default function PermissionsScreen() {
  // PLACEHOLDER: saklar hanya mengubah state. TODO: minta izin sungguhan lewat expo-location dan expo-notifications.
  const [enabled, setEnabled] = useState<Record<Permission['key'], boolean>>({
    push: false,
    gps: false,
    background: false,
  });

  return (
    <View style={styles.container}>
      <BackHeader title="Izin Aplikasi" />
      <View style={styles.content}>
        <Card>
          {permissions.map((item, index) => (
            <View key={item.key} style={[styles.row, index > 0 && styles.divider]}>
              {item.icon}
              <AppText weight="medium" size={14} color={brand.black} style={styles.label}>
                {item.label}
              </AppText>
              <Switch
                value={enabled[item.key]}
                onValueChange={(value) => setEnabled((prev) => ({ ...prev, [item.key]: value }))}
                trackColor={{ false: brand.switchOff, true: brand.lime }}
                thumbColor={brand.white}
              />
            </View>
          ))}
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.cream },
  content: { padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, height: 60, paddingHorizontal: 16 },
  divider: { borderTopWidth: 1, borderTopColor: brand.border },
  label: { flex: 1 },
});
