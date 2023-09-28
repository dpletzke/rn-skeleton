import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet } from "react-native";

import { StyledButton, Text, View } from "../../components";
import { Link } from "expo-router";

export default function ConfirmScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <Link href="/" asChild>
        <Pressable>
          <Text>Confirm!</Text>
        </Pressable>
      </Link>
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
});
