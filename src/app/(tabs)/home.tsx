import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { TabScreen } from '@/components/tab-screen';
import { brand } from '@/constants/brand';
import { getMonthlySummary, getVehicles } from '@/services/data-service';

function StatCard({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <Card variant="outlined" style={styles.stat}>
      <AppText size={13} color={brand.gray}>
        {label}
      </AppText>
      <AppText weight="bold" size={22} color={brand.primary}>
        {value}
        <AppText weight="semibold" size={16} color={brand.primary}>
          {' '}
          {unit}
        </AppText>
      </AppText>
    </Card>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const summary = getMonthlySummary();
  const activeVehicle = getVehicles().find((vehicle) => vehicle.isActive);
  const isHigher = summary.changePercent >= 0;

  return (
    <TabScreen>
      <Card variant="tinted" style={styles.summary}>
        <AppText weight="semibold" size={14} color={brand.primary}>
          Emisi Karbon Bulan Ini
        </AppText>
        <AppText weight="bold" size={36} color={brand.primary}>
          {summary.emissionKg}
          <AppText weight="semibold" size={18} color={brand.primary}>
            {' '}
            kg CO2
          </AppText>
        </AppText>
        <AppText weight="medium" size={12} color={isHigher ? brand.warning : brand.primary}>
          {Math.abs(summary.changePercent)}% {isHigher ? 'lebih tinggi' : 'lebih rendah'} dari bulan sebelumnya
        </AppText>
      </Card>

      <View style={styles.row}>
        <StatCard label="Commuting" value={summary.commutingKg} unit="kg CO2" />
        <StatCard label="Pribadi" value={summary.personalKg} unit="kg CO2" />
      </View>
      <View style={styles.row}>
        <StatCard label="Total Jarak Tempuh" value={summary.totalDistanceKm} unit="km" />
        <Card variant="outlined" style={styles.stat}>
          <AppText size={13} color={brand.gray}>
            Kendaraan Dipilih
          </AppText>
          <View style={styles.vehicle}>
            <MaterialCommunityIcons name="motorbike" size={26} color={brand.primary} />
            <AppText weight="bold" size={16} color={brand.primary}>
              {activeVehicle?.name ?? '-'}
            </AppText>
          </View>
        </Card>
      </View>

      <Card variant="outlined" style={styles.recent}>
        <AppText weight="semibold" size={14} color={brand.primary}>
          Aktivitas Perjalanan Terakhir
        </AppText>
        <View>
          {summary.recent.map((item, index) => (
            <View key={item.id} style={[styles.recentRow, index > 0 && styles.recentDivider]}>
              <AppText size={13} color={brand.gray}>
                {item.dateLabel}
              </AppText>
              <AppText weight="bold" size={13} color={brand.primary}>
                {item.emissionKg} kg CO2
              </AppText>
            </View>
          ))}
        </View>
        <Button label="Lihat Semua" height={40} onPress={() => router.navigate('/trip')} />
      </Card>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  summary: { alignItems: 'center', gap: 8, paddingVertical: 20, paddingHorizontal: 16 },
  row: { flexDirection: 'row', gap: 12 },
  stat: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 16, minHeight: 92 },
  vehicle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  recent: { padding: 12, gap: 8 },
  recentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 44, paddingHorizontal: 8 },
  recentDivider: { borderTopWidth: 1, borderTopColor: brand.border },
});
