import { getAqiInfo } from "../";

describe("getAqiInfo", () => {
  it(`finds the Good level correctly`, () => {
    const aqi = 20;
    const aqiLevel = getAqiInfo(aqi);
    expect(aqiLevel.label).toEqual("Good");
  });

  it(`finds the Unhealthy level correctly on the boundary`, () => {
    const aqi = 200;
    const aqiLevel = getAqiInfo(aqi);
    expect(aqiLevel.label).toEqual("Unhealthy");
  });

  it(`finds the Hazerdous level correctly`, () => {
    const aqi = 600;
    const aqiLevel = getAqiInfo(aqi);
    expect(aqiLevel.label).toEqual("Hazardous");
  });
});
