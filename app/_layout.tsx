/**
 * Root layout — runs once for the whole app. It does NOT draw a “page”; it wraps every route.
 *
 * - `Stack`: the navigator; files under `app/` become URLs (e.g. `/`, `/auth/login`, `/dashboard`).
 * - `ThemeProvider`: React Navigation colors (headers/tabs if you add them later).
 * - `SafeAreaProvider`: required for safe-area on **iOS and Android** (notches, island, gesture nav).
 * - `global.css`: NativeWind / Tailwind must load here so `className` works everywhere.
 * - `SplashScreen.preventAutoHideAsync()`: keeps the native splash visible until a screen calls `hideAsync()`.
 */
import '../global.css';
import 'react-native-reanimated';

import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { centiColors } from '@/theme';

SplashScreen.preventAutoHideAsync();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: centiColors.black,
    card: centiColors.black,
    primary: centiColors.primary,
    text: '#FFFFFF',
    border: centiColors.surface,
  },
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider value={navigationTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: centiColors.black },
            animation: 'fade',
          }}
        />
        <StatusBar style="light" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
