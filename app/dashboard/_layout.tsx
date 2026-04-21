import { Tabs } from 'expo-router';

import { DashboardTabBar } from '@/components/dashboard/DashboardTabBar';

/**
 * Wallet area: Home → Send → QR (center) → Receive → Profile.
 */
export default function DashboardLayout() {
  return (
    <Tabs
      tabBar={(props) => <DashboardTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="send" options={{ title: 'Send' }} />
      <Tabs.Screen name="qr" options={{ title: 'Scan' }} />
      <Tabs.Screen name="receive" options={{ title: 'Receive' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="remittances" options={{ href: null }} />
      <Tabs.Screen name="exchange" options={{ href: null }} />
      <Tabs.Screen name="shopping" options={{ href: null }} />
      <Tabs.Screen name="history" options={{ href: null }} />
    </Tabs>
  );
}
