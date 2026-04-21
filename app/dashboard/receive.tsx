import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { SafeScreen } from '@/components/layout';
import { centiColors } from '@/theme';

/** `/dashboard/receive` */
export default function ReceiveScreen() {
  return (
    <SafeScreen>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heroIcon}>
          <MaterialIcons name="payments" size={40} color={centiColors.primary} />
        </View>
        <Text style={styles.title}>Receive money</Text>
        <Text style={styles.subtitle}>
          Share your QR or account details so others can pay you.
        </Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Receive & QR share will be wired to your backend.</Text>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 120 },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: 'rgba(253,163,18,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.45)',
    marginBottom: 24,
  },
  placeholder: {
    backgroundColor: centiColors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  placeholderText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },
});
