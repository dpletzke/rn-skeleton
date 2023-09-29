import { Stack } from "expo-router";
import { NotifierSetupProvider } from "../../context/NotifierSetupContext";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export default function createNotifierLayout() {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: true,
    headerBackTitle: "Back",
    headerTitleStyle: {
      fontFamily: "Inter",
      fontWeight: "800",
    },
  };

  return (
    <NotifierSetupProvider>
      <Stack>
        <Stack.Screen
          name="selectStation"
          options={{ title: "Station", ...screenOptions }}
        />
        <Stack.Screen
          name="selectThreshold"
          options={{ title: "Threshold", ...screenOptions }}
        />
        <Stack.Screen
          name="confirm"
          options={{ title: "Confirm", ...screenOptions }}
        />
      </Stack>
    </NotifierSetupProvider>
  );
}
