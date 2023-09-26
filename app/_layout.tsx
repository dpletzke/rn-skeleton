import { useEffect } from "react";
import { ActivityIndicator, View, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useNotifications } from "../hooks";
import { AppProvider, UserProvider } from "@realm/react";
import { RealmProvider } from "../schemas";
import { appId, baseUrl } from "../atlasConfig.json";
import Login from "../components/Login";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    console.log("RootLayout loaded");
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const [expoPushToken] = useNotifications();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const LoadingIndicator = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={Login}>
        <RealmProvider
          fallback={LoadingIndicator}
          sync={{
            flexible: true,
            onError: (session, error) => {
              console.log(error);
            },
            initialSubscriptions: {
              update: (subs, realm) => {
                subs.add(realm.objects("Task"));
              },
              rerunOnOpen: true,
            },
          }}
        >
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            </Stack>
          </ThemeProvider>
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
