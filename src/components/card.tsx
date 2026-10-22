import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { brand } from '@/constants/brand';

type Variant = 'plain' | 'outlined' | 'tinted';

type Props = ViewProps & {
  /** `plain`: putih berbingkai abu. `outlined`: putih berbingkai hijau. `tinted`: hijau muda berbingkai hijau. */
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
};

const variants: Record<Variant, ViewStyle> = {
  plain: { backgroundColor: brand.white, borderColor: brand.border },
  outlined: { backgroundColor: brand.white, borderColor: brand.primary },
  tinted: { backgroundColor: brand.softGreen, borderColor: brand.primary },
};

export function Card({ variant = 'plain', style, ...rest }: Props) {
  return <View {...rest} style={[styles.base, variants[variant], style]} />;
}

const styles = StyleSheet.create({
  base: { borderWidth: 1, borderRadius: 12 },
});
