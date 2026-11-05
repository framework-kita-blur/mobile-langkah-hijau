import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { AuthScreen } from '@/components/auth-screen';
import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { brand } from '@/constants/brand';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Data belum lengkap', 'Isi email dan kata sandi terlebih dahulu.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Kata sandi terlalu pendek', 'Kata sandi minimal 8 karakter.');
      return;
    }

    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (error) {
      Alert.alert('Gagal masuk', error instanceof ApiError ? error.message : 'Terjadi kesalahan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen title="Selamat Datang Kembali!">
      <View style={styles.fields}>
        <TextField
          label="Email"
          placeholder="Masukkan Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
        />
        <TextField
          label="Kata Sandi"
          placeholder="Masukkan Kata Sandi"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Button label="Masuk" loading={loading} onPress={onSubmit} />
      <View style={styles.footer}>
        <AppText size={12} color={brand.gray}>
          Belum punya akun?{' '}
        </AppText>
        <Pressable accessibilityRole="link" onPress={() => router.replace('/register')}>
          <AppText weight="semibold" size={12} color={brand.primary}>
            Daftar sekarang
          </AppText>
        </Pressable>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  fields: { gap: 12 },
  footer: { flexDirection: 'row', justifyContent: 'center' },
});
