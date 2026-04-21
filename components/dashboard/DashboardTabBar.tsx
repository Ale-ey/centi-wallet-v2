import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { ComponentProps } from 'react';
import { router, usePathname, type Href } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { centiColors } from '@/theme';

/**
 * Tab order: Home → Send → QR (center) → Receive → Profile.
 * Equal-width columns (`flexBasis: 0` + `flexGrow: 1`) so tabs stay evenly spaced.
 */
const TAB_ORDER = ['index', 'send', 'qr', 'receive', 'profile'] as const;
type TabName = (typeof TAB_ORDER)[number];

const PATHS: Record<TabName, string> = {
  index: '/dashboard',
  send: '/dashboard/send',
  qr: '/dashboard/qr',
  receive: '/dashboard/receive',
  profile: '/dashboard/profile',
};

function iconFor(routeName: Exclude<TabName, 'qr'>): ComponentProps<typeof MaterialIcons>['name'] {
  switch (routeName) {
    case 'index':
      return 'home';
    case 'send':
      return 'send';
    case 'receive':
      return 'payments';
    case 'profile':
      return 'person';
    default:
      return 'home';
  }
}

function labelFor(routeName: TabName): string {
  switch (routeName) {
    case 'index':
      return 'Home';
    case 'send':
      return 'Send';
    case 'qr':
      return 'QR';
    case 'receive':
      return 'Receive';
    case 'profile':
      return 'Profile';
    default:
      return '';
  }
}

function tabIsFocused(pathname: string, routeName: TabName): boolean {
  const p = pathname.split('?')[0]?.replace(/\/$/, '') ?? '';
  if (routeName === 'index') {
    return /^\/dashboard(\/index)?$/.test(p);
  }
  return p === PATHS[routeName];
}

export function DashboardTabBar(_props: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const bottomPad = Math.max(insets.bottom, 10);

  const go = (name: TabName) => {
    router.navigate(PATHS[name] as Href);
  };

  return (
    <View style={[styles.outer, { paddingBottom: bottomPad }]}>
      {/* Extra top padding so the raised QR button is not clipped */}
      <View style={styles.row}>
        {TAB_ORDER.map((routeName) => {
          const isFocused = tabIsFocused(pathname, routeName);

          if (routeName === 'qr') {
            return (
              <View key="qr" style={styles.slot}>
                <Pressable
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isFocused }}
                  accessibilityLabel="QR code"
                  onPress={() => go('qr')}
                  style={({ pressed }) => [styles.tabHit, pressed && styles.pressed]}>
                  <View style={[styles.tabInner, styles.tabInnerQr]}>
                    <View style={[styles.qrFab, isFocused && styles.qrFabRing]}>
                      <MaterialIcons name="qr-code-2" size={28} color={centiColors.black} />
                    </View>
                    <Text style={[styles.label, isFocused && styles.labelFocused]} numberOfLines={1}>
                      {labelFor('qr')}
                    </Text>
                  </View>
                </Pressable>
              </View>
            );
          }

          return (
            <View key={routeName} style={styles.slot}>
              <Pressable
                accessibilityRole="tab"
                accessibilityState={{ selected: isFocused }}
                accessibilityLabel={labelFor(routeName)}
                onPress={() => go(routeName)}
                style={({ pressed }) => [styles.tabHit, pressed && styles.pressed]}>
                <View style={styles.tabInner}>
                  <MaterialIcons
                    name={iconFor(routeName)}
                    size={24}
                    color={isFocused ? centiColors.primary : 'rgba(255,255,255,0.38)'}
                  />
                  <Text style={[styles.label, isFocused && styles.labelFocused]} numberOfLines={1}>
                    {labelFor(routeName)}
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: centiColors.black,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.08)',
    overflow: 'visible',
    paddingTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: { elevation: 12 },
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    minHeight: 58,
    overflow: 'visible',
  },
  /** Equal fifths — avoids bunching from `space-between` + uneven flex */
  slot: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabHit: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingBottom: 12,
  },
  /** Icon + label stacked and centered as one unit */
  tabInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    width: '100%',
  },
  /** Slight lift so the QR chip stays prominent without breaking column centering */
  tabInnerQr: {
    marginTop: -10,
  },
  qrFab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: centiColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: centiColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
  },
  qrFabRing: {
    borderWidth: 2,
    borderColor: 'rgba(253,163,18,0.5)',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.38)',
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
    maxWidth: '100%',
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  labelFocused: {
    color: centiColors.primary,
  },
  pressed: {
    opacity: 0.85,
  },
});
