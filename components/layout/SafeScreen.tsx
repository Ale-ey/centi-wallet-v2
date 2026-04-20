import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  /** NativeWind classes; default full-bleed Centi background */
  className?: string;
  /**
   * Which edges respect safe area. Default all — correct for notched iPhones and Android
   * cutouts / gesture bars (especially with edge-to-edge).
   */
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
};

/**
 * Full-screen wrapper with safe-area insets on **iOS and Android**.
 * Always use this (or `SafeAreaView` yourself) for top-level screens so content
 * stays clear of status bars, notches, and system navigation areas.
 */
export function SafeScreen({
  children,
  className = 'flex-1 bg-centi-black',
  edges = ['top', 'right', 'bottom', 'left'],
}: Props) {
  return (
    <SafeAreaView className={className} style={{ flex: 1 }} edges={edges}>
      {children}
    </SafeAreaView>
  );
}
