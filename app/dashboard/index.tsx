import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, type Href } from 'expo-router';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SafeScreen } from '@/components/layout';
import { centiColors } from '@/theme';

type ActivityItem = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  isCredit: boolean;
};

const MOCK_BALANCE_CHF = 1234;

const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: '1',
    title: 'Sent to Sarah M.',
    subtitle: 'Today · Instant',
    amount: '- CHF 120.00',
    isCredit: false,
  },
  {
    id: '2',
    title: 'Received from Alex K.',
    subtitle: 'Yesterday · Bank transfer',
    amount: '+ CHF 350.00',
    isCredit: true,
  },
  {
    id: '3',
    title: 'Coffee Shop',
    subtitle: 'Mar 18 · Card',
    amount: '- CHF 8.50',
    isCredit: false,
  },
  {
    id: '4',
    title: 'Wallet top-up',
    subtitle: 'Mar 17 · Transfer',
    amount: '+ CHF 500.00',
    isCredit: true,
  },
];

function formatChfAmount(amount: number) {
  const [intRaw, dec] = amount.toFixed(2).split('.');
  const intPart = intRaw.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return `${intPart}.${dec}`;
}

function ActionTile({
  icon,
  label,
  onPress,
}: {
  icon: ComponentProps<typeof MaterialIcons>['name'];
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.actionTile, pressed && styles.actionTilePressed]}>
      <View style={styles.actionIconCircle}>
        <MaterialIcons name={icon} size={24} color={centiColors.primary} />
      </View>
      <Text style={styles.actionTileLabel}>{label}</Text>
    </Pressable>
  );
}

export default function DashboardHomeScreen() {
  const [balanceHidden, setBalanceHidden] = useState(false);

  /** Minimal padding under the last line so scroll ends near content, not in empty space. */
  const insets = useSafeAreaInsets();
  const scrollBottomPad = 16 + Math.min(insets.bottom, 8);

  return (
    <SafeScreen>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: scrollBottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        alwaysBounceVertical={false}
        {...Platform.select({
          android: { overScrollMode: 'never' as const },
        })}>
        <View style={styles.heroWrap}>
          <View style={styles.heroContent}>
            <Text style={styles.centiBalanceLabel}>CENTI BALANCE</Text>

            <Text style={styles.availableLabel}>Available</Text>

            <View style={styles.balanceRow}>
              <View style={styles.balanceLine}>
                <Text style={styles.currencyCode}>CHF</Text>
                <Text
                  style={[
                    styles.balanceAmount,
                    balanceHidden && styles.balanceAmountMasked,
                    Platform.OS === 'ios' && !balanceHidden && ({ fontVariant: ['tabular-nums'] } as const),
                  ]}>
                  {balanceHidden ? '*****' : formatChfAmount(MOCK_BALANCE_CHF)}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={balanceHidden ? 'Show balance' : 'Hide balance'}
                hitSlop={10}
                onPress={() => setBalanceHidden((v) => !v)}
                style={({ pressed }) => [styles.balanceEyeBtn, pressed && { opacity: 0.7 }]}>
                <MaterialIcons
                  name={balanceHidden ? 'visibility-off' : 'visibility'}
                  size={22}
                  color={centiColors.primary}
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Standalone section — not part of balance header or recent activity */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.quickActionsKicker}>More</Text>
          <View style={styles.actionTilesRow}>
            <ActionTile
              icon="swap-vert"
              label="Remittances"
              onPress={() => router.push('/dashboard/remittances' as Href)}
            />
            <ActionTile
              icon="currency-exchange"
              label="Exchange"
              onPress={() => router.push('/dashboard/exchange' as Href)}
            />
            <ActionTile
              icon="shopping-bag"
              label="Shopping"
              onPress={() => router.push('/dashboard/shopping' as Href)}
            />
            <ActionTile
              icon="history"
              label="History"
              onPress={() => router.push('/dashboard/history' as Href)}
            />
          </View>
        </View>

        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <View>
              <Text style={styles.activitySectionKicker}>TRANSACTIONS</Text>
              <Text style={styles.sectionTitle}>Recent activity</Text>
            </View>
            <Pressable hitSlop={8} style={({ pressed }) => pressed && styles.seeAllPressed}>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>

          <View style={styles.activityList}>
            {MOCK_ACTIVITY.map((row, i) => (
              <View
                key={row.id}
                style={[styles.activityRow, i === MOCK_ACTIVITY.length - 1 && styles.activityRowLast]}>
                <View
                  style={[
                    styles.activityIcon,
                    { backgroundColor: row.isCredit ? 'rgba(253,163,18,0.1)' : 'rgba(255,255,255,0.06)' },
                  ]}>
                  <MaterialIcons
                    name={row.isCredit ? 'south-west' : 'north-east'}
                    size={19}
                    color={row.isCredit ? centiColors.primary : 'rgba(255,255,255,0.55)'}
                  />
                </View>
                <View style={styles.activityMid}>
                  <Text style={styles.activityTitle}>{row.title}</Text>
                  <Text style={styles.activitySub}>{row.subtitle}</Text>
                </View>
                <Text
                  style={[
                    styles.activityAmount,
                    { color: row.isCredit ? centiColors.primary : '#FFFFFF' },
                  ]}>
                  {row.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.disclaimer}>
          Sample data for preview. Connect your backend for live balances and activity.
        </Text>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
  },
  /** Full-bleed black strip for the top section (matches app background). */
  heroWrap: {
    marginLeft: -22,
    marginRight: -22,
    marginBottom: 0,
    backgroundColor: centiColors.black,
    overflow: 'hidden',
  },
  heroContent: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 16,
  },
  centiBalanceLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.38)',
    marginBottom: 20,
  },
  availableLabel: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.4,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
    gap: 12,
  },
  balanceLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    minWidth: 0,
  },
  balanceEyeBtn: {
    padding: 8,
    marginRight: -4,
  },
  currencyCode: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.92)',
    marginRight: 10,
    letterSpacing: 1,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.8,
  },
  balanceAmountMasked: {
    letterSpacing: 4,
    fontSize: 32,
  },
  quickActionsSection: {
    marginTop: 8,
    marginBottom: 28,
    paddingTop: 20,
    paddingBottom: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  quickActionsKicker: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    color: 'rgba(255,255,255,0.32)',
    marginBottom: 14,
  },
  actionTilesRow: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
  },
  actionTile: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 2,
    minWidth: 0,
  },
  actionTilePressed: {
    opacity: 0.92,
  },
  actionIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: centiColors.primary,
  },
  actionTileLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.15,
    lineHeight: 13,
  },
  activitySection: {
    marginTop: 0,
    marginBottom: 8,
  },
  activitySectionKicker: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    color: 'rgba(255,255,255,0.32)',
    marginBottom: 6,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: centiColors.primary,
    marginTop: 4,
  },
  seeAllPressed: {
    opacity: 0.75,
  },
  activityList: {
    paddingTop: 4,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  activityRowLast: {
    borderBottomWidth: 0,
  },
  activityIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  activityMid: {
    flex: 1,
    minWidth: 0,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 3,
    letterSpacing: 0.1,
  },
  activitySub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 0.2,
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  disclaimer: {
    marginTop: 12,
    marginBottom: 0,
    fontSize: 11,
    lineHeight: 16,
    color: 'rgba(255,255,255,0.28)',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
