import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../../components";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { sendOwnNotification } from "../../utils/notificationUtils";

export default function NotificationScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Tab</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Pressable
        onPress={() =>
          sendOwnNotification({ content: { title: "Test", body: "Test Body" } })
        }
        style={({ pressed }) => [
          styles.button,
          {
            borderColor: pressed
              ? Colors[colorScheme ?? "light"].tint
              : Colors[colorScheme ?? "light"].text,
          },
        ]}
      >
        <Text>Send Notification</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
});
