import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { KeyboardFormScroll, SafeScreen } from '@/components/layout';
import { CentiButton, CentiTextField } from '@/components/ui';
import { centiLogoYellow } from '@/constants/brand-assets';
import { centiColors } from '@/theme';

/**
 * `/auth/login`
 *
 * Keyboard UX is delegated to `KeyboardFormScroll` (see that file for behavior notes).
 * Form styling uses StyleSheet for reliability with your current NativeWind/babel setup;
 * you can add `className` on these Views if NativeWind resolves on your build.
 */
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeScreen>
      <KeyboardFormScroll keyboardOpenBottomPadding={120}>
        <View style={styles.header}>
          <View style={styles.logoWrap}>
            <Image
              source={centiLogoYellow}
              style={styles.logo}
              contentFit="contain"
              accessibilityLabel="CENTI logo"
            />
          </View>
          <Text style={styles.brand}>CENTI</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.form}>
          <CentiTextField
            label="Email"
            fieldType="email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            autoComplete="email"
            textContentType="emailAddress"
            importantForAutofill="yes"
          />
          <View>
            <CentiTextField
              label="Password"
              fieldType="password"
              containerStyle={styles.passwordFieldWrap}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              autoComplete="password"
              textContentType="password"
              importantForAutofill="yes"
            />
            <View style={styles.forgotRow}>
              <Pressable
                accessibilityRole="link"
                accessibilityLabel="Forgot password"
                hitSlop={8}
                onPress={() => router.push('/auth/forgot-password')}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.buttonBlock}>
            <CentiButton
              title="Sign in"
              variant="primary"
              onPress={() => {
                /* wire to auth → router.replace('/dashboard') */
              }}
            />
            <View style={styles.gap} />
            <CentiButton
              title="Create an account"
              variant="secondary"
              onPress={() => router.push('/auth/signup')}
            />
          </View>
        </View>
      </KeyboardFormScroll>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  logoWrap: {
    marginBottom: 4,
  },
  logo: {
    width: 96,
    height: 96,
  },
  brand: {
    marginTop: 12,
    fontSize: 30,
    fontWeight: '700',
    color: centiColors.primary,
    letterSpacing: Platform.OS === 'ios' ? 8 : 5,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.42)',
    textAlign: 'center',
    letterSpacing: 0.2,
    maxWidth: 280,
  },
  divider: {
    marginTop: 28,
    width: 48,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(253,163,18,0.35)',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    paddingTop: 8,
  },
  passwordFieldWrap: {
    marginBottom: 8,
  },
  forgotRow: {
    alignItems: 'flex-end',
    marginBottom: 18,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '500',
    color: centiColors.primary,
  },
  buttonBlock: {
    marginTop: 8,
    width: '100%',
  },
  gap: {
    height: 14,
  },
});
