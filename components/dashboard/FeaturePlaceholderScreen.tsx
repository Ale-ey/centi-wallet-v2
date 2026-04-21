import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SafeScreen } from '@/components/layout';

type Props = {
  title: string;
  hint?: string;
};

export function FeaturePlaceholderScreen({ title, hint }: Props) {
  return (
    <SafeScreen>
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}>
          <MaterialIcons name="arrow-back" size={22} color="#FFFFFF" />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  backBtn: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  hint: {
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.45)',
  },
});
