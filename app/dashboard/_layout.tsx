import { Stack } from 'expo-router';

/**
 * Layout for signed-in app area: `/dashboard`, `/dashboard/...`.
 * Later you can add guards (only allow if logged in) in root or here.
 */
export default function DashboardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
  );
}
