import React, { createContext, useState } from "react";
import { StationLookup, StationResponse, StationRecord } from "../types";
import { mergeData } from "../utils";

type StationsType = { [key: string]: StationRecord };

export type StationsContextType = {
  stations: StationsType;
  setStationLookups: (lookups: StationLookup[]) => void;
  deleteStation: (uid: string) => void;
  setStationResponses: (reses: StationResponse[]) => void;
};

export const StationsContext = createContext<StationsContextType>({
  stations: {},
  setStationLookups: () => {},
  deleteStation: () => {},
  setStationResponses: () => {},
  // setStationData: () => {},
});

export const StationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stations, setStations] = useState<StationsType>({});

  const setStationLookups = (lookups: StationLookup[]) => {
    const newLookups = lookups.reduce((acc, { uid, station }) => {
      acc[`${uid}`] = { stationId: `${uid}`, name: station.name };
      return acc;
    }, {} as StationsType);
    setStations((prev) => mergeData(prev, newLookups));
  };

  const setStationResponses = (reses: StationResponse[]) => {
    const newReses = reses.reduce((acc, res) => {
      const { idx, city, ...rest } = res.data;
      acc[`${idx}`] = { stationId: `${idx}`, name: city.name };
      return acc;
    }, {} as StationsType);
    setStations((prev) => mergeData(prev, newReses));
  };

  const deleteStation = (stationId: string) => {
    setStations((prev) => {
      const newState = { ...prev };
      delete newState[stationId];
      return newState;
    });
  };

  return (
    <StationsContext.Provider
      value={{
        stations,
        setStationLookups,
        setStationResponses,
        deleteStation,
      }}
    >
      {children}
    </StationsContext.Provider>
  );
};
