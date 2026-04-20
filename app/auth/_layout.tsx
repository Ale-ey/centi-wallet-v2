import { Stack } from 'expo-router';

/**
 * Layout for all routes under `/auth/*` (login, signup, …).
 * Shared options for this section only; root options stay in `app/_layout.tsx`.
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
  );
}
