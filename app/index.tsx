import { Image } from "expo-image";
import { router } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeScreen } from "@/components/layout";
import { centiLogoYellow } from "@/constants/brand-assets";
import { centiColors } from "@/theme";

/** Minimum time the in-app splash stays visible before auth. */
const SPLASH_HOLD_MS = 2200;

/**
 * URL: `/` — logo centered, “CENTI” in brand yellow below, then `/auth/login`.
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
          <Image
            source={centiLogoYellow}
            style={styles.logo}
            contentFit="contain"
            accessibilityLabel="CENTI logo"
          />
          <Text style={styles.title}>CENTI</Text>
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
});
