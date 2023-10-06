import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { AppProvider, UserProvider } from "@realm/react";
import { useColorScheme } from "react-native";

import { appId, baseUrl } from "../atlasConfig.json";
import { RealmSetupWrapper } from "../components/RealmSetupWrapper";
import { useNotifications } from "../hooks";
import { Login } from "./Login";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={Login}>
        <RealmSetupWrapper>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            {children}
          </ThemeProvider>
        </RealmSetupWrapper>
      </UserProvider>
    </AppProvider>
  );
}
