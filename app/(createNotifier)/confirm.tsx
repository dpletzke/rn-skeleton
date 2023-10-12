import { router } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

import { Button, StatusBar, Text, View } from "../../components";
import { NotifierSetupContext } from "../../context/NotifierSetupContext";
import { StationsContext } from "../../context/StationsContext";
import { useNotifiers, useStations } from "../../hooks";
import { useRealm } from "../../schemas";

export default function ConfirmScreen() {
  const { createNotifier } = useNotifiers();
  const { prepareUpsertStation } = useStations();
  const { notifierSetup } = useContext(NotifierSetupContext);
  const { stations } = useContext(StationsContext);
  const realm = useRealm();
  const onConfirm = () => {
    const { stationId, threshold } = notifierSetup;
    if (!stationId || !threshold) return;
    createNotifier({ stationId, threshold });
    realm.subscriptions
      .waitForSynchronization()
      .then(() => {
        const { name, aqi, lastUpdated } = stations[stationId];
        return realm.write(() =>
          prepareUpsertStation({
            stationId,
            aqi,
            lastUpdated,
            name,
            shortName: name.split(",")[0],
          }),
        );
      })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log("Realm subscription error: ", error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Creating new Notifier</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {notifierSetup.stationId && (
        <Pressable
          onPress={() => router.push("/(createNotifier)/selectStation")}
        >
          <Text>
            Station: {stations[notifierSetup.stationId].name.split(",")[0]}
          </Text>
        </Pressable>
      )}
      {notifierSetup.threshold && (
        <Pressable
          onPress={() => router.push("/(createNotifier)/selectThreshold")}
        >
          <Text>Threshold: {notifierSetup.threshold}</Text>
        </Pressable>
      )}
      <Button style={{ marginTop: 50, padding: 10 }} onPress={onConfirm}>
        <Text style={{ fontSize: 30 }}>Confirm</Text>
      </Button>
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
