import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { useThemeColor } from "../../hooks";

type DrawerButtonProps = {
  direction: "top" | "right" | "bottom" | "left";
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function DrawerButton({ direction, onPress, style }: DrawerButtonProps) {
  const infoColor = useThemeColor("info");
  const styles = (
    {
      top: {
        icon: "angle-down",
        marginTop: -15,
        marginRight: -15,
        marginLeft: -15,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      },
      right: {
        icon: "angle-left",
        marginTop: -15,
        marginRight: -15,
        marginBottom: -15,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      },
      bottom: {
        icon: "angle-up",
        marginLeft: -15,
        marginRight: -15,
        marginBottom: -15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      left: {
        icon: "angle-right",
        marginTop: -15,
        marginLeft: -15,
        marginBottom: -15,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
      },
    } as const
  )[direction];
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: infoColor,
          height: 150,
          padding: 10,
          ...styles,
        }}
      >
        <FontAwesome size={30} name={styles.icon} color={"white"} />
      </View>
    </Pressable>
  );
}
