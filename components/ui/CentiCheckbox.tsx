import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, View } from 'react-native';

import { centiColors } from '@/theme';

export type CentiCheckboxProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  accessibilityLabel?: string;
};

const TICK = 'rgba(255,255,255,0.95)';

/**
 * Rounded box: unchecked = gold border only; checked = gold fill + light white tick.
 */
export function CentiCheckbox({ checked, onCheckedChange, accessibilityLabel }: CentiCheckboxProps) {
  return (
    <View style={styles.wrap} collapsable={false}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        accessibilityLabel={accessibilityLabel ?? 'Toggle'}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={() => onCheckedChange(!checked)}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
        <View style={[styles.box, checked ? styles.boxChecked : styles.boxUnchecked]}>
          {checked ? <MaterialIcons name="check" size={17} color={TICK} /> : null}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.88,
  },
  box: {
    width: 26,
    height: 26,
    borderRadius: 7,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxUnchecked: {
    borderColor: centiColors.primary,
    backgroundColor: 'transparent',
  },
  boxChecked: {
    borderColor: centiColors.primary,
    backgroundColor: centiColors.primary,
  },
});
