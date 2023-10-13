import { NotifierSchema, StationSchema } from "../../schemas";
import { Text, View } from "../Themed";
export default function NotifierTextContent({
  notifier,
  thisStation,
}: {
  notifier: NotifierSchema;
  thisStation: StationSchema;
}) {
  if (!thisStation.aqi) {
    return <Text>Station Offline</Text>;
  }
  if (thisStation.aqi < notifier.threshold) {
    return (
      <View style={{ width: "100%" }}>
        <Text>
          You are <Text style={{ fontWeight: "800" }}>Breathing Easy!</Text>
        </Text>

        <Text style={{ fontWeight: "200" }}>Go outside and Enjoy it!</Text>
      </View>
    );
  }
  return (
    <View style={{ width: "100%" }}>
      <Text>
        Pollutants are <Text style={{ fontWeight: "800" }}>High!</Text>
      </Text>

      <Text style={{ fontWeight: "200" }}>
        Wait for the air to clear before doing strenuous activity.
      </Text>
    </View>
  );
}
