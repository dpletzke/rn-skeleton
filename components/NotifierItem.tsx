import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useContext, useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import { StationsContext } from "../context/StationsContext";
import { useNotifiers, useStations, useThemeColor } from "../hooks";
import { NotifierSchema } from "../schemas/NotifierSchema";
import { Text, View } from "./Themed";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  notifier: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  deleteButton: {
    padding: 20,
  },
});

const shortenName = (name: string) => {
  const splitName = name.split(",");
  return `${splitName[0]} ${splitName[splitName.length - 1]}`;
};

export default function NotifierItem({
  notifier,
}: {
  notifier: NotifierSchema;
}) {
  // const { stations } = useContext(StationsContext);
  const { deleteNotifier } = useNotifiers();
  const { stations } = useStations();

  const dangerColor = useThemeColor("danger");

  return (
    <View style={styles.container}>
      <View style={styles.notifier}>
        <Text style={{ fontFamily: "Inter" }}>
          {stations.find((s) => s.stationId === notifier.stationId)
            ?.shortName || ""}
        </Text>
      </View>
      <Pressable onPress={() => deleteNotifier(notifier)}>
        <View style={styles.deleteButton}>
          <FontAwesome size={30} name="close" color={dangerColor} />
        </View>
      </Pressable>
    </View>
  );
}
