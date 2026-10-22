import { Image } from 'expo-image';
import { type ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { brand } from '@/constants/brand';
import { images } from '@/constants/images';

type Props = {
  title: string;
  children: ReactNode;
  cardStyle?: StyleProp<ViewStyle>;
};

/** Kerangka bersama layar Login dan Register: judul, kartu putih, logo, lalu isi formulir. */
export function AuthScreen({ title, children, cardStyle }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
        <AppText weight="semibold" size={16} color={brand.text} style={styles.title}>
          {title}
        </AppText>
        <View style={[styles.card, cardStyle]}>
          <Image source={images.logo} contentFit="contain" style={styles.logo} />
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: brand.cream },
  content: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, gap: 16 },
  title: { textAlign: 'center' },
  card: {
    backgroundColor: brand.white,
    borderWidth: 1,
    borderColor: brand.border,
    borderRadius: 16,
    padding: 24,
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  logo: { alignSelf: 'center', width: 220, height: 64 },
});
