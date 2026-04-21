import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { SafeScreen } from '@/components/layout';
import { centiColors } from '@/theme';

/** `/dashboard/qr` — scan or show payment QR */
export default function QrScreen() {
  return (
    <SafeScreen>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Scan & pay</Text>
        <Text style={styles.subtitle}>Point your camera at a code to pay or connect.</Text>
        <View style={styles.frame}>
          <MaterialIcons name="qr-code-2" size={120} color="rgba(253,163,18,0.35)" />
          <Text style={styles.frameHint}>Camera preview will go here</Text>
        </View>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Integrate expo-camera or your scanner SDK here.</Text>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 120 },
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
  frame: {
    aspectRatio: 1,
    maxHeight: 280,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(253,163,18,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  frameHint: {
    marginTop: 12,
    fontSize: 13,
    color: 'rgba(255,255,255,0.35)',
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
