import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { centiColors } from '@/theme';

export type CentiButtonVariant = 'primary' | 'secondary';

export type CentiButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  title: string;
  variant?: CentiButtonVariant;
  style?: StyleProp<ViewStyle>;
};

const primaryShadow =
  Platform.OS === 'ios'
    ? {
        shadowColor: centiColors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.22,
        shadowRadius: 16,
      }
    : { elevation: 6 };

export function CentiButton({ title, variant = 'primary', disabled, style, ...rest }: CentiButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={[
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        isPrimary && primaryShadow,
        disabled && styles.disabled,
        style,
      ]}
      {...(Platform.OS === 'android'
        ? {
            android_ripple: {
              color: isPrimary ? 'rgba(0,0,0,0.1)' : 'rgba(253,163,18,0.25)',
              foreground: true,
            },
          }
        : {})}
      {...rest}>
      <Text style={[styles.label, isPrimary ? styles.labelOnPrimary : styles.labelOnSecondary]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 999,
    paddingHorizontal: 28,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: centiColors.primary,
  },
  /** Outline on dark backgrounds — clear gold ring, no fill */
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: centiColors.primary,
  },
  disabled: {
    opacity: 0.45,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.35,
  },
  labelOnPrimary: {
    color: centiColors.black,
  },
  labelOnSecondary: {
    color: centiColors.primary,
  },
});
