import { Text, View } from 'react-native';

import { SafeScreen } from '@/components/layout';

/** URL: `/dashboard` — home for post-login screens; add tabs or nested routes later. */
export default function DashboardHomeScreen() {
  return (
    <SafeScreen>
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-white text-xl font-semibold">Dashboard</Text>
        <Text className="text-white/60 text-sm mt-2 text-center">
          Add your main app screens under app/dashboard/
        </Text>
      </View>
    </SafeScreen>
  );
}
