import { Image } from "expo-image";
import { router } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  InteractionManager,
  Platform,
  StyleSheet,
  View,
  type TextStyle,
} from "react-native";
import Animated, { Easing, FadeIn, FadeInDown } from "react-native-reanimated";

import { SafeScreen } from "@/components/layout";
import { centiLogoYellow } from "@/constants/brand-assets";
import { centiColors } from "@/theme";

/** Smooth ease-out — reads polished on splash (logo + title). */
const EASE_SPLASH = Easing.bezier(0.22, 1, 0.36, 1);

/** Stagger between tagline words (floating sequence). */
const WORD_STAGGER_MS = 78;

/** First tagline word delay (after mount), once logo/title pass has started. */
const TAGLINE_BASE_DELAY_MS = 920;

/** Time after mount before navigating — full animation + comfortable read. */
const SPLASH_HOLD_MS = 5200;

const TAGLINE_LINE1 = ["Send", "money", "home,"] as const;
const TAGLINE_LINE2 = ["spend", "what", "stays."] as const;

function FloatingWord({
  children,
  delayMs,
  style,
}: {
  children: string;
  delayMs: number;
  style: TextStyle;
}) {
  return (
    <Animated.Text
      entering={FadeInDown.duration(560)
        .delay(delayMs)
        .easing(EASE_SPLASH)
        .withInitialValues({
          transform: [{ translateY: 18 }],
        })}
      style={style}>
      {children}
    </Animated.Text>
  );
}

/**
 * URL: `/` — logo + CENTI fade in, tagline words float in sequence; then `/auth/login`.
 */
export default function SplashScreen() {
  useEffect(() => {
    void ExpoSplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const task = InteractionManager.runAfterInteractions(() => {
      if (cancelled) return;
      timeoutId = setTimeout(() => {
        if (!cancelled) router.replace("/auth/login");
      }, SPLASH_HOLD_MS);
    });

    return () => {
      cancelled = true;
      task.cancel();
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <SafeScreen>
      <View style={styles.centerFill}>
        <View style={styles.stack}>
          <Animated.View
            entering={FadeIn.duration(920).easing(EASE_SPLASH)}
            style={styles.logoWrap}>
            <Image
              source={centiLogoYellow}
              style={styles.logo}
              contentFit="contain"
              accessibilityLabel="CENTI logo"
            />
          </Animated.View>

          <Animated.Text
            entering={FadeIn.duration(820).delay(380).easing(EASE_SPLASH)}
            style={styles.title}>
            CENTI
          </Animated.Text>

          <View
            style={styles.taglineBlock}
            accessibilityRole="text"
            accessibilityLabel="Send money home, spend what stays.">
            <View style={styles.wordRow}>
              {TAGLINE_LINE1.map((word, i) => (
                <FloatingWord
                  key={`y-${i}-${word}`}
                  delayMs={TAGLINE_BASE_DELAY_MS + i * WORD_STAGGER_MS}
                  style={styles.taglineYellow}>
                  {word}
                </FloatingWord>
              ))}
            </View>
            <View style={styles.wordRow}>
              {TAGLINE_LINE2.map((word, i) => (
                <FloatingWord
                  key={`w-${i}-${word}`}
                  delayMs={
                    TAGLINE_BASE_DELAY_MS +
                    (TAGLINE_LINE1.length + i) * WORD_STAGGER_MS
                  }
                  style={styles.taglineWhite}>
                  {word}
                </FloatingWord>
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  centerFill: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  stack: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 176,
    height: 176,
  },
  title: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: "700",
    color: centiColors.primary,
    letterSpacing: Platform.OS === "android" ? 6 : 8,
    textAlign: "center",
  },
  taglineBlock: {
    marginTop: 36,
    alignItems: "center",
    maxWidth: 320,
  },
  wordRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 4,
    columnGap: 10,
    marginBottom: 8,
  },
  taglineYellow: {
    fontSize: 18,
    fontWeight: "600",
    color: centiColors.primary,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  taglineWhite: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 0.15,
  },
});
