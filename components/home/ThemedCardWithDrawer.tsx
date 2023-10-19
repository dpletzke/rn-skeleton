import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Divider } from "@rneui/base";
import { Card, Image } from "@rneui/themed";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import {
  Text as DefaultText,
  View as DefaultView,
  Platform,
  PressableProps,
  StyleProp,
  ViewStyle,
  useColorScheme,
} from "react-native";

import Colors from "../../constants/Colors";
import { StationsContext } from "../../context/StationsContext";
import { useNotifiers, useStations, useThemeColor } from "../../hooks";
import { NotifierSchema, StationSchema } from "../../schemas";
import { getAqiInfo, getTextColor } from "../../utils";
import { Text, ThemedCard, View } from "./../Themed";
import { DrawerButton } from "./CardDrawerButton";

export function ThemedCardWithDrawer(props: {
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  openChildren: React.ReactNode;
  closedChildren: React.ReactNode;
  drawerClosedLocation: "top" | "right" | "bottom" | "left";
}) {
  const {
    containerStyle,
    wrapperStyle,
    openChildren,
    closedChildren,
    drawerClosedLocation,
  } = props;
  const [isOpen, setOpen] = useState(false);
  const cardProps = {
    containerStyle: [containerStyle],
    wrapperStyle: [wrapperStyle],
  };

  const changeState = () => setOpen((prev) => !prev);

  const isButtonBeforeContent =
    (drawerClosedLocation === "left" && !isOpen) ||
    (drawerClosedLocation === "top" && !isOpen) ||
    (drawerClosedLocation === "right" && isOpen) ||
    (drawerClosedLocation === "bottom" && isOpen);

  const currentLocation = !isOpen
    ? drawerClosedLocation
    : (
        {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right",
        } as const
      )[drawerClosedLocation];

  const isColumn = ["top", "bottom"].includes(drawerClosedLocation);

  return (
    <ThemedCard {...cardProps}>
      <View
        style={{
          display: "flex",
          flexDirection: isColumn ? "column" : "row",
          backgroundColor: "lightgreen",
          height: "100%",
        }}
      >
        {isButtonBeforeContent && (
          <DrawerButton
            onPress={() => changeState()}
            direction={currentLocation}
          />
        )}
        {isOpen ? openChildren : closedChildren}
        {!isButtonBeforeContent && (
          <DrawerButton
            onPress={() => changeState()}
            direction={currentLocation}
          />
        )}
      </View>
    </ThemedCard>
  );
}
