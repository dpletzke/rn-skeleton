import { useUser } from "@realm/react";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";

import {
  NotifierItem,
  StyledButton,
  Text,
  ThemedCard,
  View,
} from "../components";
import { useNotifications, useNotifiers, useStations } from "../hooks";
import { requestStation } from "../utils";

export default function HomeScreen() {
  const { upsertStationsFromResponses, stations } = useStations();
  const { notifiers } = useNotifiers();
  const [expoPushToken] = useNotifications();

  useEffect(() => {
    const missingStations = notifiers
      .map((n) => n.stationId)
      .filter((stationId) => {
        return !stations.find((s) => s.stationId === stationId);
      });

    if (missingStations.length <= 0) {
      return;
    }
    console.log("requesting missing data", missingStations);

    const missingStationRequests = missingStations.map((stationId) => {
      return requestStation(stationId);
    });

    Promise.all(missingStationRequests)
      .then((res) => {
        upsertStationsFromResponses(res);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  }, [notifiers, stations, upsertStationsFromResponses]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Stations</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {notifiers.length <= 0 ? (
        <Text>No Notifiers</Text>
      ) : (
        notifiers.map((notifier, index) => {
          return (
            <NotifierItem
              key={`${notifier._id}-${index}`}
              notifier={notifier}
            />
          );
        })
      )}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <StyledButton
        title="Create New Alert"
        onPress={() => {
          router.push("/(createNotifier)/selectStation");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
