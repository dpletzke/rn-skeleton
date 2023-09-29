import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { useContext, useEffect } from "react";
import { Alert, Platform, Pressable, StyleSheet } from "react-native";

import { Text, View } from "../components";
import { useDb } from "../hooks";
import { StationsContext } from "../context/StationsContext";
import { requestStation } from "../utils";

export default function HomeScreen() {
  const { stations, setStationLookups, setStationResponses } =
    useContext(StationsContext);
  const { realm, user, ownNotifiersResults, deleteNotifier } = useDb();

  useEffect(() => {
    const notifiersForStationsWithoutData = ownNotifiersResults.filter(
      (notifier) => !stations[notifier.stationId],
    );

    Promise.all(
      notifiersForStationsWithoutData.map((notifier) => {
        return requestStation(notifier.stationId);
      }),
    )
      .then((res) => {
        setStationResponses(res);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  }, [ownNotifiersResults]);

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <Text style={styles.title}>Home</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {ownNotifiersResults.length <= 0 ? (
        <Text>No Notifiers</Text>
      ) : (
        ownNotifiersResults.map((notifier, index) => {
          return (
            <View key={`${index}` + notifier._id}>
              <Text>
                {stations[notifier.stationId]?.name} - {notifier.threshold}
              </Text>
              <Pressable onPress={() => deleteNotifier(notifier)}>
                <Text>Delete</Text>
              </Pressable>
            </View>
          );
        })
      )}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Link href="/(createNotifier)/selectStation" asChild>
        <Pressable>
          <Text>Create Notifier</Text>
        </Pressable>
      </Link>
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
