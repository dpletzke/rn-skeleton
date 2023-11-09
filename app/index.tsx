import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";

import { NotifierItem, StyledButton, Text, View } from "../components";
import {
  useNotifications,
  useNotifiers,
  useStations,
  useThemeColor,
} from "../hooks";
import { requestStation } from "../utils";

export default function HomeScreen() {
  const { upsertStationsFromResponses, stations } = useStations();
  const { notifiers } = useNotifiers();
  const [expoPushToken] = useNotifications();
  const infoColor = useThemeColor("info");

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
      <Pressable
        onPress={() => {
          router.push("/(createNotifier)/selectStation");
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderRadius: 40,
            borderColor: infoColor,
          }}
        >
          <FontAwesome name="plus" size={20} color={infoColor} />
        </View>
      </Pressable>
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
