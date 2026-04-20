import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { centiColors } from '@/theme';

export type CentiTextFieldType = 'text' | 'password' | 'email';

export type CentiTextFieldProps = Omit<TextInputProps, 'secureTextEntry'> & {
  label: string;
  fieldType?: CentiTextFieldType;
  /** When `fieldType` is `password`, show eye toggle (default: true). Set `false` to hide it. */
  showPasswordToggle?: boolean;
  /** Style for the outer field wrapper (e.g. margin when adding a row below). */
  containerStyle?: StyleProp<ViewStyle>;
  className?: string;
  containerClassName?: string;
};

export function CentiTextField({
  label,
  fieldType = 'text',
  showPasswordToggle,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  style,
  className: _className,
  containerClassName: _containerClassName,
  containerStyle,
  ...rest
}: CentiTextFieldProps) {
  const isPassword = fieldType === 'password';
  const isEmail = fieldType === 'email';
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleOn = isPassword && showPasswordToggle !== false;

  const commonInputProps = {
    placeholderTextColor: 'rgba(255,255,255,0.28)' as const,
    underlineColorAndroid: 'transparent' as const,
    cursorColor: centiColors.primary,
    selectionColor:
      Platform.OS === 'android' ? (`${centiColors.primary}99` as const) : centiColors.primary,
    keyboardType: isEmail ? ('email-address' as const) : keyboardType,
    autoCapitalize: isEmail ? ('none' as const) : autoCapitalize,
    autoCorrect: isEmail ? false : autoCorrect,
    ...rest,
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      {toggleOn ? (
        <View style={styles.inputRow}>
          <TextInput
            {...commonInputProps}
            style={[styles.inputInner, style]}
            secureTextEntry={!passwordVisible}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
            hitSlop={12}
            style={styles.eyeBtn}
            onPress={() => setPasswordVisible((v) => !v)}>
            <MaterialIcons
              name={passwordVisible ? 'visibility-off' : 'visibility'}
              size={22}
              color={centiColors.primary}
            />
          </Pressable>
        </View>
      ) : (
        <TextInput
          {...commonInputProps}
          style={[styles.input, style]}
          secureTextEntry={isPassword}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 22,
    width: '100%',
  },
  label: {
    color: 'rgba(255,255,255,0.42)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  input: {
    minHeight: 52,
    backgroundColor: centiColors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    backgroundColor: centiColors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    overflow: 'hidden',
  },
  inputInner: {
    flex: 1,
    minHeight: 52,
    paddingLeft: 18,
    paddingRight: 8,
    paddingVertical: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  eyeBtn: {
    paddingRight: 14,
    paddingLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 52,
  },
});
