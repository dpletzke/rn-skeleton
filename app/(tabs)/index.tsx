import { StyleSheet } from "react-native";

import { StyledButton, Text, View } from "../../components";
import { useDb } from "../../hooks";

export default function TabOneScreen() {
  const { user } = useDb();
  const logout = () => {
    user?.logOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <StyledButton onPress={logout} title="Logout" />
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
