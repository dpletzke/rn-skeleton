import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Divider } from "@rneui/base";
import { Pressable } from "react-native";

import Colors from "../../constants/Colors";
import { useThemeColor } from "../../hooks";
import { NotifierSchema, StationSchema } from "../../schemas";
import { getAqiInfo, getTextColor } from "../../utils";
import { Text, View } from "../Themed";
import NotifierTextContent from "./NotifierTextContent";

type Props = {
  notifier: NotifierSchema;
  thisStation: StationSchema;
  changeOpenState: () => void;
};

export default function ClosedNotifierItem({
  thisStation,
  notifier,
  changeOpenState,
}: Props) {
  const thisAqiInfo = thisStation.aqi ? getAqiInfo(thisStation.aqi) : undefined;
  const tierBackground = thisAqiInfo
    ? Colors.tiers[thisAqiInfo?.label]
    : undefined;
  const tierText = tierBackground ? getTextColor(tierBackground) : undefined;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        flexGrow: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: tierBackground,
          padding: 10,
          marginTop: -15,
          marginLeft: -15,
          marginBottom: -15,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          flex: 1,
        }}
      >
        <Text style={{ color: tierText }}>{thisAqiInfo?.label}</Text>
        <Text style={{ fontSize: 30, color: tierText }}>{thisStation.aqi}</Text>
        <Text style={{ color: tierText }}>AQI</Text>
      </View>
      <View
        style={{
          marginLeft: 10,
          flex: 3,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_900Black",
            fontWeight: "800",
            fontSize: 20,
          }}
        >
          {thisStation.shortName}
        </Text>
        <Divider />
        <NotifierTextContent notifier={notifier} thisStation={thisStation} />
      </View>
    </View>
  );
}
