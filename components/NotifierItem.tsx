import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import { StationsContext } from "../context/StationsContext";
import { useNotifiers, useStations, useThemeColor } from "../hooks";
import { NotifierSchema } from "../schemas/NotifierSchema";
import { getAqiInfo } from "../utils";
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
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    height: 70,
  },
  notifierText: {
    fontFamily: "Inter_900Black",
    fontSize: 15,
    maxWidth: Dimensions.get("window").width * 0.5,
  },
  deleteButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
  },
});

export default function NotifierItem({
  notifier,
}: {
  notifier: NotifierSchema;
}) {
  const { deleteNotifier } = useNotifiers();
  const { stations } = useStations();
  const dangerColor = useThemeColor("danger");
  const thisStation = stations.find((s) => s.stationId === notifier.stationId);
  const [open, setOpen] = useState(false);

  if (!thisStation) return <></>;

  const thisAqiInfo = thisStation.aqi ? getAqiInfo(thisStation.aqi) : undefined;

  return (
    <View style={{ borderWidth: 1, marginBottom: 10 }}>
      <View style={styles.container}>
        <View
          style={{ ...styles.notifier, backgroundColor: thisAqiInfo?.color }}
        >
          <View
            style={{
              padding: 10,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "black",
            }}
          >
            <Text style={{ ...styles.notifierText }}>
              {thisStation?.shortName || thisStation.name}
            </Text>
          </View>
          {/* <Text style={{ paddingRight: 10 }}>
          {`${thisStation.aqi} aqi` || "Station Offline"}
        </Text> */}
          <Pressable onPress={() => setOpen(!open)}>
            <FontAwesome
              size={30}
              name={open ? "angle-up" : "angle-down"}
              color={"black"}
              style={{ paddingRight: 20 }}
            />
          </Pressable>
        </View>
        <Pressable onPress={() => deleteNotifier(notifier)}>
          <View
            style={{ ...styles.deleteButton, backgroundColor: dangerColor }}
          >
            <FontAwesome size={30} name="close" color={"white"} />
          </View>
        </Pressable>
      </View>
      {open && (
        <View style={{ paddingLeft: 20 }}>
          <Text>{thisAqiInfo?.label}</Text>
          <Text>{`${thisStation.aqi} aqi` || "Station Offline"}</Text>
        </View>
      )}
    </View>
  );
}
