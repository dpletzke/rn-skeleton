import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useContext, useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import { StationsContext } from "../context/StationsContext";
import { useDb, useThemeColor } from "../hooks";
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

type Props = {
  notifier: NotifierSchema;
};

const shortenName = (name: string) => {
  const splitName = name.split(",");
  return `${splitName[0]} ${splitName[splitName.length - 1]}`;
};

export default function NotifierItem(props: Props) {
  const { notifier } = props;
  const { stations } = useContext(StationsContext);
  const { deleteNotifier } = useDb();

  const dangerColor = useThemeColor("danger");

  return (
    <View style={styles.container}>
      <View style={styles.notifier}>
        <Text style={{ fontFamily: "Inter" }}>
          {stations[notifier.stationId]?.name}
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
