import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';

import { KeyboardFormScroll, SafeScreen } from '@/components/layout';
import { CentiButton, CentiCheckbox, CentiTextField } from '@/components/ui';
import { centiLogoYellow } from '@/constants/brand-assets';
import { centiColors } from '@/theme';

/** URL: `/auth/signup` */
export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showMismatch, setShowMismatch] = useState(false);

  const canSubmit =
    acceptedTerms &&
    username.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0;

  function onCreateAccount() {
    if (password !== confirmPassword) {
      setShowMismatch(true);
      return;
    }
    setShowMismatch(false);
    if (!acceptedTerms) return;
    /* TODO: call your sign-up API — for now any valid form goes to the wallet */
    router.replace('/dashboard');
  }

  function openTerms() {
    Alert.alert('Terms & conditions', 'Full legal text will be linked here (e.g. in-app page or web URL).');
  }

  return (
    <SafeScreen>
      <KeyboardFormScroll keyboardOpenBottomPadding={160}>
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
          <Text style={styles.subtitle}>Create your account</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.form}>
          <CentiTextField
            label="Username"
            fieldType="text"
            value={username}
            onChangeText={setUsername}
            placeholder="johndoe"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="username"
            textContentType="username"
          />
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
          <CentiTextField
            label="Password"
            fieldType="password"
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              setShowMismatch(false);
            }}
            placeholder="••••••••"
            autoComplete="password-new"
            textContentType="newPassword"
            importantForAutofill="yes"
          />
          <View>
            <CentiTextField
              label="Confirm password"
              fieldType="password"
              containerStyle={styles.confirmField}
              value={confirmPassword}
              onChangeText={(t) => {
                setConfirmPassword(t);
                setShowMismatch(false);
              }}
              placeholder="••••••••"
              autoComplete="password-new"
              textContentType="newPassword"
            />
            {showMismatch ? (
              <Text style={styles.errorText}>Passwords do not match.</Text>
            ) : null}
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.termsSectionLabel}>Terms</Text>
            <View style={styles.termsRow}>
              <CentiCheckbox
                checked={acceptedTerms}
                onCheckedChange={setAcceptedTerms}
                accessibilityLabel="I agree to the terms and conditions"
              />
              <View style={styles.termsTextWrap}>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.termsLink} onPress={openTerms} accessibilityRole="link">
                    Terms and Conditions
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonBlock}>
            <CentiButton
              title="Create account"
              variant="primary"
              disabled={!canSubmit}
              onPress={onCreateAccount}
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
    width: 72,
    height: 72,
  },
  brand: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: '700',
    color: centiColors.primary,
    letterSpacing: Platform.OS === 'ios' ? 6 : 4,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.42)',
    textAlign: 'center',
  },
  divider: {
    marginTop: 22,
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
  confirmField: {
    marginBottom: 8,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    marginBottom: 8,
    marginTop: -4,
  },
  termsSection: {
    marginBottom: 20,
    width: '100%',
    alignSelf: 'stretch',
  },
  termsSectionLabel: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  termsTextWrap: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    paddingTop: 2,
    marginLeft: 12,
  },
  termsText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    color: centiColors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  buttonBlock: {
    width: '100%',
  },
  gap: {
    height: 14,
  },
});
