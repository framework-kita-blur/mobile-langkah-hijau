import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { brand } from '@/constants/brand';
import { images } from '@/constants/images';

const slides = [
  {
    title: 'Pantau Emisi Kendaraan',
    description: 'Ketahui seberapa besar jejak karbon yang dihasilkan dari setiap perjalananmu',
    image: images.onboarding[0],
  },
  {
    title: 'Pelacakan Otomatis & Cerdas',
    description: 'Ketahui seberapa besar jejak karbon yang dihasilkan dari setiap perjalananmu',
    image: images.onboarding[1],
  },
  {
    title: 'Wujudkan Kampus Hijau',
    description: 'Mulai langkah nyata untuk mendukung keberlanjutan lingkungan kampusmu',
    image: images.onboarding[2],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const isLast = index === slides.length - 1;

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  const goNext = () => {
    const next = Math.min(index + 1, slides.length - 1);
    listRef.current?.scrollToIndex({ index: next, animated: true });
    setIndex(next);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.title}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <View style={styles.illustration}>
              <Image source={item.image} contentFit="contain" style={{ width, aspectRatio: 402 / 440 }} />
            </View>
            <View style={styles.texts}>
              <AppText weight="semibold" size={22} color={brand.primary} style={styles.center}>
                {item.title}
              </AppText>
              <AppText size={15} color={brand.grayDark} style={[styles.center, styles.description]}>
                {item.description}
              </AppText>
            </View>
          </View>
        )}
      />

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.dots}>
          {slides.map((slide, i) => (
            <View key={slide.title} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <View style={styles.actions}>
          {isLast ? (
            <>
              <Button label="Masuk" rounded="pill" height={36} fontSize={15} onPress={() => router.replace('/login')} />
              <Button
                label="Daftar"
                variant="soft"
                rounded="pill"
                height={36}
                fontSize={15}
                onPress={() => router.replace('/register')}
              />
            </>
          ) : (
            <Button label="Selanjutnya" rounded="pill" height={36} fontSize={15} onPress={goNext} />
          )}
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace('/login')}
        style={[styles.skip, { top: insets.top + 8 }]}>
        <AppText weight="semibold" size={13} color={brand.primary}>
          Lewati
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.white },
  illustration: { flex: 1, backgroundColor: brand.cream, alignItems: 'center', justifyContent: 'center' },
  texts: { backgroundColor: brand.white, paddingTop: 24, paddingHorizontal: 24, minHeight: 130 },
  center: { textAlign: 'center' },
  description: { marginTop: 10, lineHeight: 24 },
  footer: { backgroundColor: brand.white, paddingHorizontal: 16 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingBottom: 18 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EFEFEF' },
  dotActive: { backgroundColor: brand.lime },
  actions: { gap: 12, minHeight: 84 },
  skip: {
    position: 'absolute',
    right: 12,
    height: 28,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: brand.softGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
