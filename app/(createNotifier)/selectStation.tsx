import * as Location from "expo-location";
import { Link, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";

import { Button, Text, View } from "../../components";
import { NotifierSetupContext } from "../../context/NotifierSetupContext";
import { StationsContext } from "../../context/StationsContext";
import { StationRecord } from "../../types";
import { requestStations } from "../../utils";

export default function StationScreen() {
  const { stations, setStationLookups } = useContext(StationsContext);
  const { notifierSetup, setStationId } = useContext(NotifierSetupContext);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(10000);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
      })
      .then(() => Location.getCurrentPositionAsync({}))
      .then((location) => {
        setLocation(location);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, []);

  useEffect(() => {
    if (!location) return;
    console.log("requesting stations");
    requestStations(location, radius)
      .then((res) => {
        console.log("got stations");
        setStationLookups(res.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error);
      });
  }, [location, radius]);

  const onSelectStation = (station: StationRecord) => {
    setStationId(station.stationId);
    if (notifierSetup.stationId) {
      router.push("/(createNotifier)/selectThreshold");
    }
  };
  return (
    <View style={styles.container}>
      {errorMsg && <Text> Error: {JSON.stringify(errorMsg, null, 2)}</Text>}

      {Object.values(stations).length <= 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        Object.values(stations).map((station) => (
          <View
            key={station.stationId}
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              margin: 5,
            }}
          >
            <Button
              style={{ padding: 10, borderRadius: 13 }}
              onPress={() => onSelectStation(station)}
            >
              <Text>{station.name.split(",")[0]}</Text>
            </Button>
          </View>
        ))
      )}
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
