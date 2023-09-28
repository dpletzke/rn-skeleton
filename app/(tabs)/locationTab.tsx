import { ActivityIndicator, StyleSheet } from "react-native";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components";
import { useLocation } from "../../hooks/useLocation";
import { useEffect } from "react";

export default function LocationScreen() {
  const [location] = useLocation({
    onPermissionDenied: () => {
      console.log("Permission denied");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Tab</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {location ? (
        <Text>{JSON.stringify(location, null, 2)}</Text>
      ) : (
        <ActivityIndicator size="large" />
      )}
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
