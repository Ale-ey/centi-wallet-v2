import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';

import { KeyboardFormScroll, SafeScreen } from '@/components/layout';
import { CentiButton, CentiTextField } from '@/components/ui';
import { centiLogoYellow } from '@/constants/brand-assets';
import { centiColors } from '@/theme';

function looksLikeEmail(value: string) {
  const v = value.trim();
  if (v.length < 5) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/** URL: `/auth/forgot-password` — email capture; wire submit to your reset API. */
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const canSubmit = looksLikeEmail(email);

  function onSendResetLink() {
    if (!canSubmit) return;
    /* TODO: POST /auth/forgot-password { email } */
    Alert.alert(
      'Check your email',
      `If an account exists for ${email.trim()}, we sent password reset instructions.`,
    );
  }

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
          <Text style={styles.title}>Forgot password</Text>
          <Text style={styles.subtitle}>
            Enter the email for your account. We will send you a link to reset your password.
          </Text>
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

          <View style={styles.buttonBlock}>
            <CentiButton
              title="Reset password"
              variant="primary"
              disabled={!canSubmit}
              onPress={onSendResetLink}
            />
            <View style={styles.gap} />
            <CentiButton title="Back to sign in" variant="secondary" onPress={() => router.back()} />
          </View>
        </View>
      </KeyboardFormScroll>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 28,
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
  title: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.42)',
    textAlign: 'center',
    maxWidth: 320,
  },
  divider: {
    marginTop: 24,
    width: 48,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(253,163,18,0.35)',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    paddingTop: 4,
  },
  buttonBlock: {
    marginTop: 20,
    width: '100%',
  },
  gap: {
    height: 14,
  },
});
