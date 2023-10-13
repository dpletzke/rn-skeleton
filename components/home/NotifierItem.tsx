import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Divider } from "@rneui/base";
import { Card, Image } from "@rneui/themed";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import { StationsContext } from "../../context/StationsContext";
import { useNotifiers, useStations, useThemeColor } from "../../hooks";
import { NotifierSchema, StationSchema } from "../../schemas";
import { getAqiInfo, getTextColor } from "../../utils";
import { Text, ThemedCard, View } from "./../Themed";
import ClosedNotifierItem from "./ClosedNotifierItem";
import NotifierTextContent from "./NotifierTextContent";
import { ThemedCardWithDrawer } from "./ThemedCardWithDrawer";

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

export function NotifierItem({ notifier }: { notifier: NotifierSchema }) {
  const { deleteNotifier } = useNotifiers();
  const { stations } = useStations();
  const dangerColor = useThemeColor("danger");
  const infoColor = useThemeColor("info");
  const thisStation = stations.find((s) => s.stationId === notifier.stationId);
  const [open, setOpen] = useState(false);

  if (!thisStation) return <></>;

  const thisAqiInfo = thisStation.aqi ? getAqiInfo(thisStation.aqi) : undefined;

  const changeOpenState = () => setOpen((prev) => !prev);

  return (
    <ThemedCardWithDrawer
      containerStyle={{ borderRadius: 10, width: "90%", height: 100 }}
      drawerClosedLocation="right"
      openChildren={<Text>Open</Text>}
      closedChildren={
        <ClosedNotifierItem
          notifier={notifier}
          changeOpenState={changeOpenState}
          thisStation={thisStation}
        />
      }
    />
  );
}
