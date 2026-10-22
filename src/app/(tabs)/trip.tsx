import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { TabScreen } from '@/components/tab-screen';
import { brand } from '@/constants/brand';
import { type Trip } from '@/data/mock';
import { getTrips, syncTrips } from '@/services/data-service';

/** Kelompokkan perjalanan per tanggal tanpa mengubah urutan kemunculan. */
function groupByDate(trips: Trip[]) {
  const groups = new Map<string, Trip[]>();
  for (const trip of trips) {
    groups.set(trip.dateLabel, [...(groups.get(trip.dateLabel) ?? []), trip]);
  }
  return [...groups.entries()];
}

export default function TripScreen() {
  const [syncing, setSyncing] = useState(false);
  const groups = useMemo(() => groupByDate(getTrips()), []);

  const onSync = async () => {
    setSyncing(true);
    // PLACEHOLDER: belum mengirim apa pun. Lihat src/services/data-service.ts.
    await syncTrips();
    setSyncing(false);
  };

  return (
    <TabScreen>
      <Button label="Sinkronkan Data" height={40} fontSize={15} loading={syncing} onPress={onSync} />

      {groups.map(([date, trips]) => (
        <Card key={date} variant="outlined" style={styles.group}>
          <AppText weight="semibold" size={14} color={brand.text}>
            {date}
          </AppText>
          {trips.map((trip) => (
            <View key={trip.id} style={styles.trip}>
              <View style={styles.details}>
                <AppText size={13}>Jarak Tempuh: {trip.distanceKm} KM</AppText>
                <AppText size={13}>Lama Perjalanan: {trip.durationMin} Menit</AppText>
                <AppText size={13}>Emisi Karbon: {trip.emissionKg} Kg CO2</AppText>
              </View>
              <View style={styles.badge}>
                <AppText weight="semibold" size={11} color={brand.white}>
                  {trip.label}
                </AppText>
              </View>
            </View>
          ))}
        </Card>
      ))}
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  group: { padding: 12, gap: 12 },
  trip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: brand.cream,
    borderRadius: 8,
    padding: 12,
  },
  details: { gap: 2 },
  badge: { backgroundColor: brand.primary, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 4 },
});
