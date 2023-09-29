import { aqiLevels } from "../content/";

export const getAqiInfo = (aqi: number) => {
  const aqiInfo = aqiLevels.find((level) => aqi <= level.value);
  return aqiInfo;
};
