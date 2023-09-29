import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, useColorScheme } from "react-native";
import { useCallback, useContext, useMemo, useState } from "react";
import { RulerPicker } from "react-native-ruler-picker";

import { StyledButton, Text, View } from "../../components";
import { NotifierSetupContext } from "../../context/NotifierSetupContext";
import { getAqiInfo } from "../../utils";
import { router } from "expo-router";

export default function ThresholdScreen() {
  const { notifierSetup, setThreshold } = useContext(NotifierSetupContext);
  const theme = useColorScheme() === "dark" ? "light" : "dark";
  const [isMoving, setIsMoving] = useState(false);
  const [touched, setTouched] = useState(false);

  const onValueChange = (threshold: string) => {
    if (!touched) setTouched(true);
    setIsMoving(true);
    const number = parseInt(threshold);
    setThreshold(number);
  };

  const onValueChangeEnd = (threshold: string) => {
    setIsMoving(false);
  };

  const aqiInfo = useMemo(
    () => getAqiInfo(notifierSetup.threshold),
    [notifierSetup.threshold],
  );

  const onNext = useCallback(() => {
    if (!notifierSetup.stationId) {
      router.replace("/(createNotifier)/selectStation");
    }
    if (!notifierSetup.threshold) {
      return;
    }
    router.push("/(createNotifier)/confirm");
  }, [notifierSetup.threshold]);

  return (
    <View style={{ ...styles.container, backgroundColor: aqiInfo?.color }}>
      <StatusBar style={Platform.OS === "ios" ? theme : "auto"} />
      <View
        style={{
          position: "fixed",
          top: 30,
          backgroundColor: "transparent",
          marginHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>{aqiInfo?.label || ""}</Text>
        <Text>{aqiInfo?.description || ""}</Text>
      </View>

      <RulerPicker
        min={51}
        max={301}
        step={1}
        fractionDigits={0}
        initialValue={notifierSetup.threshold}
        onValueChange={onValueChange}
        onValueChangeEnd={onValueChangeEnd}
        unit="aqi"
      />
      <View
        style={{
          position: "fixed",
          bottom: 30,
          backgroundColor: "transparent",
          height: 100,
        }}
      >
        {!isMoving && touched && notifierSetup.threshold && (
          <StyledButton title="Next" onPress={onNext} />
        )}
      </View>
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
    fontFamily: "Inter",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
