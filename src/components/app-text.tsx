import { Text, type TextProps } from 'react-native';

import { brand, fonts, type FontWeight } from '@/constants/brand';

type Props = TextProps & {
  weight?: FontWeight;
  size?: number;
  color?: string;
};

/** Teks dasar berfont Poppins. Jangan pakai `fontWeight`; bobot dipilih lewat prop `weight`. */
export function AppText({ weight = 'regular', size = 14, color = brand.text, style, ...rest }: Props) {
  return <Text {...rest} style={[{ fontFamily: fonts[weight], fontSize: size, color }, style]} />;
}
