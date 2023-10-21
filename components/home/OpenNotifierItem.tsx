import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Divider, Switch } from "@rneui/base";
import { useState } from "react";
import { Dimensions, Pressable } from "react-native";

import Colors from "../../constants/Colors";
import { useNotifiers, useThemeColor } from "../../hooks";
import { NotifierSchema, StationSchema } from "../../schemas";
import { getAqiInfo, getTextColor } from "../../utils";
import { Text, View } from "../Themed";
import NotifierTextContent from "./NotifierTextContent";

type Props = {
  notifier: NotifierSchema;
  thisStation: StationSchema;
};

export default function OpenNotifierItem({ thisStation, notifier }: Props) {
  const dangerColor = useThemeColor("danger");
  const textColor = useThemeColor("text");
  const { editNotifier } = useNotifiers();
  const { notifsAreOn } = notifier;

  const setNotifsAreOn = (value: boolean) => {
    editNotifier(notifier, { notifsAreOn: value });
  };
  return (
    <View
      style={{
        width: Dimensions.get("screen").width - 45,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: 30,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Pressable onPress={() => alert("press")}>
          <View
            style={{
              borderWidth: 2,
              borderRadius: 15,
              borderColor: textColor,
              height: 30,
              paddingHorizontal: 10,
              columnGap: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <FontAwesome name="pencil" size={20} color={textColor} />
            <Text>Edit Threshold</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => alert("press")}>
          <View
            style={{
              borderRadius: 15,
              height: 30,
              paddingHorizontal: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: dangerColor,
            }}
          >
            <Text lightColor="white">Delete</Text>
          </View>
        </Pressable>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text>Notifications: </Text>
        <Switch
          value={notifsAreOn}
          onValueChange={(value) => setNotifsAreOn(value)}
        />
      </View>
    </View>
  );
}
