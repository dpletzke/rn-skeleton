import { ActivityIndicator, View, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useNotifications } from "../hooks";
import { AppProvider, UserProvider } from "@realm/react";
import { RealmProvider } from "../schemas";
import { appId, baseUrl } from "../atlasConfig.json";
import { Login } from "./Login";

const LoadingIndicator = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [expoPushToken] = useNotifications();

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
                subs.add(realm.objects("Notifier"));
              },
              rerunOnOpen: true,
            },
          }}
        >
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            {children}
          </ThemeProvider>
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
