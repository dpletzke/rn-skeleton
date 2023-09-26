import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useLocation } from "../../hooks/useLocation";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useEffect, useState } from "react";

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const [location] = useLocation({
    onPermissionDenied: () => {
      console.log("Permission denied");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const [mapRegion, setmapRegion] = useState<Region | null>(null);

  useEffect(() => {
    if (location) {
      setmapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map Tab</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {mapRegion ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={mapRegion}
        />
      ) : (
        <ActivityIndicator size="large"></ActivityIndicator>
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
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
