import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SafeScreen } from '@/components/layout';
import { centiColors } from '@/theme';

/** `/dashboard/profile` */
export default function ProfileScreen() {
  return (
    <SafeScreen>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={48} color={centiColors.primary} />
        </View>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Account settings and verification will live here.</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Sign out"
          style={({ pressed }) => [styles.signOut, pressed && styles.pressed]}
          onPress={() => router.replace('/auth/login')}>
          <MaterialIcons name="logout" size={20} color="#FF6B6B" />
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 120 },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(253,163,18,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(253,163,18,0.35)',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.45)',
    marginBottom: 32,
    textAlign: 'center',
  },
  signOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(255,107,107,0.1)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,107,107,0.25)',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  pressed: {
    opacity: 0.88,
  },
});
