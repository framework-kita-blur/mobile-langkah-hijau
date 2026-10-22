import { ActivityIndicator, Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from '@/components/app-text';
import { brand } from '@/constants/brand';

type Variant = 'primary' | 'soft' | 'outline' | 'danger' | 'dangerSoft';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  /** `pill` untuk tombol onboarding, `md` untuk formulir dan kartu. */
  rounded?: 'pill' | 'md';
  height?: number;
  fontSize?: number;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const palette: Record<Variant, { bg: string; fg: string; border: string }> = {
  primary: { bg: brand.primary, fg: brand.white, border: brand.primary },
  soft: { bg: brand.softGreen, fg: brand.primary, border: brand.softGreen },
  outline: { bg: brand.white, fg: brand.primary, border: brand.primary },
  danger: { bg: brand.danger, fg: brand.white, border: brand.danger },
  dangerSoft: { bg: brand.dangerSoft, fg: brand.danger, border: brand.danger },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  rounded = 'md',
  height = 44,
  fontSize = 14,
  loading = false,
  disabled = false,
  style,
}: Props) {
  const colors = palette[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          height,
          borderRadius: rounded === 'pill' ? height / 2 : 8,
          backgroundColor: colors.bg,
          borderColor: colors.border,
          opacity: isDisabled ? 0.6 : pressed ? 0.85 : 1,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={colors.fg} />
      ) : (
        <AppText weight="semibold" size={fontSize} color={colors.fg}>
          {label}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
  },
});
