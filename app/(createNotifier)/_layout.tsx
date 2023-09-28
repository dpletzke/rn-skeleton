import { Stack } from "expo-router";

export default function createNotifierLayout() {
  const screenProps = {
    options: {
      headerShown: false,
      // animationEnabled: false,
    },
  };

  return (
    <Stack>
      <Stack.Screen name="selectStation" {...screenProps} />
      <Stack.Screen name="selectThreshold" {...screenProps} />
      <Stack.Screen name="confirm" {...screenProps} />
    </Stack>
  );
}
