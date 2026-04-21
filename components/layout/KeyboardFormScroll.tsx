import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  /** Extra bottom padding when keyboard is visible (scroll room above keyboard). */
  keyboardOpenBottomPadding?: number;
};

/**
 * Production-style keyboard handling for auth/forms.
 *
 * **Vertical centering (keyboard closed):** `ScrollView`’s `contentContainerStyle` uses
 * `minHeight: safeFrame.height` so the scroll content is at least as tall as the visible
 * safe area. With `justifyContent: 'center'`, a shorter form sits in the middle.
 * Without that minHeight, Android often keeps content at the top (flexGrow alone is not enough).
 */
export function KeyboardFormScroll({
  children,
  keyboardOpenBottomPadding = 32,
}: Props) {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const show = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height),
    );
    const hide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const keyboardOpen = keyboardHeight > 0;
  /** Match visible safe-area height so `justifyContent: 'center'` has a full column to work with. */
  const minFillHeight = Math.max(frame.height, 1);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 8 : 0}>
      <ScrollView
        className="flex-1"
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        showsVerticalScrollIndicator={keyboardOpen}
        bounces={keyboardOpen}
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
        contentContainerStyle={{
          flexGrow: 1,
          minHeight: keyboardOpen ? undefined : minFillHeight,
          justifyContent: keyboardOpen ? 'flex-start' : 'center',
          paddingHorizontal: 28,
          paddingTop: keyboardOpen ? 12 : 0,
          paddingBottom: keyboardOpen ? keyboardOpenBottomPadding + keyboardHeight : 40,
        }}>
        {/* Plain View: TouchableWithoutFeedback here often eats taps on Android so nested buttons (e.g. Sign in) never fire. */}
        <View className="w-full">{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
