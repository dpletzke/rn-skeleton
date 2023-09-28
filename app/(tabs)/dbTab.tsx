import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../../components";
import { useDb } from "../../hooks/useDb";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function DbScreen() {
  const { user } = useDb();
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DB Tab</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>User Email: {user.profile.email}</Text>
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
