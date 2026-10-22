import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from '@/components/app-text';
import { brand, fonts } from '@/constants/brand';

type Props = TextInputProps & {
  label?: string;
  height?: number;
};

export function TextField({ label, height = 44, style, ...rest }: Props) {
  return (
    <View style={styles.wrapper}>
      {label ? (
        <AppText weight="medium" size={12} color={brand.text}>
          {label}
        </AppText>
      ) : null}
      <TextInput
        placeholderTextColor={brand.gray}
        autoCapitalize="none"
        {...rest}
        style={[styles.input, { height }, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  input: {
    borderWidth: 1,
    borderColor: brand.border,
    borderRadius: 8,
    backgroundColor: brand.white,
    paddingHorizontal: 12,
    paddingVertical: 0,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: brand.black,
  },
});
