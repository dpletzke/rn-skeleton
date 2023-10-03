import { Link } from "expo-router";
import { useContext, useEffect } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";

import { Text, View } from "../components";
import NotifierItem from "../components/NotifierItem";
import { StationsContext } from "../context/StationsContext";
import { useNotifiers, useStations } from "../hooks";
import { requestStation } from "../utils";

export default function HomeScreen() {
  // const { stations, setStationLookups, setStationResponses } =
  //   useContext(StationsContext);

  const {
    stations,
    createStation,
    deleteStation,
    upsertStationsFromResponses,
  } = useStations();
  const { ownNotifiersResults, deleteNotifier } = useNotifiers();

  useEffect(() => {
    const notifiersForStationsWithoutData = ownNotifiersResults.filtered(
      "stationId IN $0",
      ownNotifiersResults.map((n) => n.stationId),
    );
    console.log(
      "notifiersForStationsWithoutData",
      notifiersForStationsWithoutData.map((n) => n.stationId),
    );

    Promise.all(
      notifiersForStationsWithoutData.map((notifier) => {
        return requestStation(notifier.stationId);
      }),
    )
      .then((res) => {
        console.log(
          "res",
          res.map((r) => r.data.city.name),
        );
        upsertStationsFromResponses(res);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  }, [ownNotifiersResults]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stations</Text>
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
