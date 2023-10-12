import { useUser } from "@realm/react";
import { ActivityIndicator } from "react-native";
import { WaitForSync } from "realm";

import { RealmProvider } from "../schemas";
import { NotifierSchema } from "../schemas/NotifierSchema";
import { StationSchema } from "../schemas/StationSchema";
import { View } from "./Themed";

const LoadingIndicator = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export function RealmSetupWrapper({ children }: { children: React.ReactNode }) {
  const user = useUser();
  return (
    <RealmProvider
      fallback={LoadingIndicator}
      sync={{
        flexible: true,
        onError: (session, error) => {
          console.log("Realm Error: ", error);
        },
        initialSubscriptions: {
          update: (subs, realm) => {
            const usersOwnNotifiers = realm
              .objects(NotifierSchema)
              .filtered("owner_id = $0", user.id);
            const relevantStations = realm.objects(StationSchema).filtered(
              "stationId IN $0",
              usersOwnNotifiers.map((n) => n.stationId),
            );

            const stations = realm.objects(StationSchema);

            try {
              subs.add(usersOwnNotifiers, {
                name: "usersOwnNotifiers",
                behavior: WaitForSync.FirstTime,
              });
              subs.add(relevantStations, {
                name: "relevantStations",
                behavior: WaitForSync.FirstTime,
              });
              // subs.add(stations, {
              //   name: "stations",
              //   behavior: WaitForSync.FirstTime,
              // });
            } catch (error) {
              console.log("Realm add subscription error: ", error);
            }
          },
          rerunOnOpen: true,
        },
      }}
    >
      {children}
    </RealmProvider>
  );
}
