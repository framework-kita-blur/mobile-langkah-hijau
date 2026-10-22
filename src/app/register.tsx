import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { AuthScreen } from '@/components/auth-screen';
import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { useAuth } from '@/providers/auth-provider';

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!fullName.trim() || !email.trim() || !password) {
      Alert.alert('Data belum lengkap', 'Lengkapi semua isian terlebih dahulu.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Kata sandi tidak sama', 'Konfirmasi kata sandi harus sama dengan kata sandi.');
      return;
    }
    setLoading(true);
    // PLACEHOLDER: signUp belum membuat akun. Lihat src/services/auth-service.ts.
    await signUp(fullName.trim(), email.trim(), password);
    setLoading(false);
    router.replace('/home');
  };

  return (
    <AuthScreen title="Daftarkan Dirimu Sekarang!">
      <View style={styles.fields}>
        <TextField
          label="Nama Lengkap"
          placeholder="Masukkan Nama Lengkap"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />
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
        <TextField
          label="Konfirmasi Kata Sandi"
          placeholder="Masukkan Ulang Kata Sandi"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.actions}>
        <Button label="Daftar" loading={loading} onPress={onSubmit} />
        <Button label="Masuk" variant="soft" onPress={() => router.replace('/login')} />
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  fields: { gap: 12 },
  actions: { gap: 12 },
});
