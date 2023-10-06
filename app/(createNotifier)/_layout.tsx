import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Stack } from "expo-router";

import { NotifierSetupProvider } from "../../context/NotifierSetupContext";
import { StationsProvider } from "../../context/StationsContext";

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
      <StationsProvider>
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
      </StationsProvider>
    </NotifierSetupProvider>
  );
}
