import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Divider } from "@rneui/base";
import { Card, Image } from "@rneui/themed";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
} from "react-native";
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

  const cardProps = {
    containerStyle: [
      { overflow: "hidden" as const, padding: 0 },
      containerStyle,
    ],
    wrapperStyle: [wrapperStyle],
  };

  const slideAnim = useRef(new Animated.Value(0)).current;

  const onClick = () => {
    Animated.spring(slideAnim, {
      toValue: isOpen ? 0 : -Dimensions.get("screen").width + 45,
      useNativeDriver: false,
      bounciness: 0,
    }).start();
    setOpen(!isOpen);
  };
  return (
    <ThemedCard {...cardProps}>
      <Animated.View
        style={{
          display: "flex",
          flexDirection: isColumn ? "column" : "row",
          height: "100%",
          width: "250%",
          transform: [
            {
              translateX: slideAnim,
            },
          ],
        }}
      >
        {closedChildren}
        <DrawerButton onPress={onClick} direction={currentLocation} />
        {openChildren}
      </Animated.View>
    </ThemedCard>
  );
}
