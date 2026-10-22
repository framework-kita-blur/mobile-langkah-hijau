import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { BackHeader } from '@/components/back-header';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { TextField } from '@/components/text-field';
import { brand } from '@/constants/brand';
import { useAuth } from '@/providers/auth-provider';
import { changePassword } from '@/services/auth-service';

export default function ProfileScreen() {
  const { user } = useAuth();
  // PLACEHOLDER: perubahan profil belum disimpan. TODO: update ke Supabase.
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [editing, setEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const onSavePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert('Data belum lengkap', 'Isi kata sandi lama dan kata sandi baru.');
      return;
    }
    setSaving(true);
    await changePassword(oldPassword, newPassword);
    setSaving(false);
    setOldPassword('');
    setNewPassword('');
    Alert.alert('Berhasil', 'Perubahan kata sandi disimpan (placeholder).');
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Profil" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.avatar}>
          <Ionicons name="person-outline" size={36} color={brand.gray} />
        </View>

        <Card style={styles.card}>
          <TextField height={40} value={name} onChangeText={setName} editable={editing} autoCapitalize="words" />
          <TextField
            height={40}
            value={email}
            onChangeText={setEmail}
            editable={editing}
            keyboardType="email-address"
          />
          <TextField height={40} value={user.npm} editable={false} />
          <TextField height={40} value={user.faculty} editable={false} />
          <View style={styles.editRow}>
            <Button
              label={editing ? 'Selesai' : 'Ubah'}
              variant="soft"
              height={40}
              onPress={() => setEditing((value) => !value)}
              style={styles.editButton}
            />
          </View>
        </Card>

        <Card style={styles.card}>
          <AppText weight="semibold" size={14} color={brand.primaryDark}>
            Ubah kata sandi
          </AppText>
          <TextField
            height={40}
            placeholder="Kata Sandi Lama"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
          />
          <TextField
            height={40}
            placeholder="Kata Sandi Baru"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <Button label="Simpan Perubahan" height={40} loading={saving} onPress={onSavePassword} />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: brand.cream },
  content: { padding: 16, gap: 16 },
  avatar: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: brand.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: { padding: 16, gap: 12 },
  editRow: { alignItems: 'flex-end' },
  editButton: { paddingHorizontal: 24 },
});
