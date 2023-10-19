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
import OpenNotifierItem from "./OpenNotifierItem";
import { ThemedCardWithDrawer } from "./ThemedCardWithDrawer";

export function NotifierItem({ notifier }: { notifier: NotifierSchema }) {
  const { stations } = useStations();
  const thisStation = stations.find((s) => s.stationId === notifier.stationId);

  if (!thisStation) return <></>;

  return (
    <ThemedCardWithDrawer
      containerStyle={{ borderRadius: 10, width: "90%", height: 150 }}
      drawerClosedLocation="right"
      openChildren={
        <OpenNotifierItem notifier={notifier} thisStation={thisStation} />
      }
      closedChildren={
        <ClosedNotifierItem notifier={notifier} thisStation={thisStation} />
      }
    />
  );
}
