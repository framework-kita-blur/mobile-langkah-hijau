import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { TabScreen } from '@/components/tab-screen';
import { brand } from '@/constants/brand';
import { type Vehicle } from '@/data/mock';
import { getVehicles } from '@/services/data-service';

export default function VehicleScreen() {
  // PLACEHOLDER: perubahan hanya hidup di memori. Nanti disimpan ke Supabase dan SQLite.
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => [...getVehicles()]);

  const setActive = (id: string) => setVehicles((list) => list.map((v) => ({ ...v, isActive: v.id === id })));

  const confirmDelete = (vehicle: Vehicle) =>
    Alert.alert('Hapus kendaraan', `Hapus ${vehicle.name}?`, [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => setVehicles((list) => list.filter((v) => v.id !== vehicle.id)) },
    ]);

  const comingSoon = (title: string) => Alert.alert(title, 'Fitur ini belum tersedia pada tahap antarmuka.');

  return (
    <TabScreen>
      {vehicles.map((vehicle) => (
        <Pressable key={vehicle.id} accessibilityRole="button" onPress={() => setActive(vehicle.id)}>
          <Card variant={vehicle.isActive ? 'tinted' : 'outlined'} style={styles.vehicle}>
            <MaterialCommunityIcons
              name={vehicle.type === 'car' ? 'car' : 'motorbike'}
              size={40}
              color={brand.black}
              style={styles.icon}
            />
            <View style={styles.info}>
              <AppText weight="semibold" size={15} color={brand.text}>
                {vehicle.name}
              </AppText>
              <AppText size={12} color={brand.gray}>
                CC: {vehicle.cc} CC
              </AppText>
              <AppText size={12} color={brand.gray}>
                Jenis Bahan Bakar: {vehicle.fuel}
              </AppText>
              <View style={styles.actions}>
                <Button
                  label="Edit"
                  variant="outline"
                  height={36}
                  onPress={() => comingSoon('Edit kendaraan')}
                  style={styles.action}
                />
                <Button
                  label="Hapus"
                  variant="danger"
                  height={36}
                  onPress={() => confirmDelete(vehicle)}
                  style={styles.action}
                />
              </View>
            </View>
          </Card>
        </Pressable>
      ))}

      <Pressable accessibilityRole="button" onPress={() => comingSoon('Tambah kendaraan')} style={styles.add}>
        <Ionicons name="add-circle-outline" size={34} color={brand.gray} />
        <AppText size={12} color={brand.grayDark}>
          Tambah Data Kendaraan
        </AppText>
      </Pressable>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  vehicle: { flexDirection: 'row', gap: 16, padding: 16 },
  icon: { marginTop: 4 },
  info: { flex: 1, gap: 2 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 6 },
  action: { paddingHorizontal: 16 },
  add: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 90,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: brand.primary,
    borderRadius: 12,
    backgroundColor: brand.white,
  },
});
