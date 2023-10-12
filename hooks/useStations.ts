import { useUser } from "@realm/react";
import { useCallback } from "react";
import { BSON } from "realm";

import { useQuery, useRealm } from "../schemas";
import { StationSchema } from "../schemas/StationSchema";
import { StationLookup, StationResponse } from "../types";

type StationType = {
  stationId: string;
  name: string;
  shortName: string | null;
  aqi: number | null;
  lastUpdated: string;
};

export const useStations = () => {
  const realm = useRealm();
  const user = useUser();
  const stations = useQuery<StationSchema>(StationSchema);

  const createStation = useCallback(
    (newStation: StationType) => {
      realm.write(() => {
        return new StationSchema(realm, newStation);
      });
    },
    [realm, user],
  );

  const getStationById = useCallback(
    (id: BSON.ObjectId) => {
      return stations.find((station) => station._id === id);
    },
    [stations],
  );

  const getStationByStationId = useCallback(
    (stationId: string) => {
      return stations.find((station) => station.stationId === stationId);
    },
    [stations],
  );

  const editStation = useCallback(
    (
      station: StationSchema,
      edits: Partial<Pick<StationType, "aqi" | "lastUpdated" | "shortName">>,
    ) => {
      realm.write(() => {
        Object.assign(station, edits);
      });
    },
    [realm],
  );

  const prepareUpsertStation = useCallback(
    ({ stationId, aqi, lastUpdated, name, shortName }: StationType) => {
      const foundStation = getStationByStationId(stationId);
      if (foundStation) {
        Object.assign(foundStation, { aqi, lastUpdated, shortName });
        return;
      }
      return new StationSchema(realm, {
        stationId,
        name,
        shortName,
        aqi,
        lastUpdated,
      });
    },
    [realm],
  );

  const upsertStationsFromLookups = (lookups: StationLookup[]) => {
    realm.write(() => {
      lookups.forEach((lookup) => {
        const { uid, aqi, station } = lookup;
        prepareUpsertStation({
          stationId: `${uid}`,
          name: station.name,
          shortName: station.name.split(",")[0],
          aqi: aqi === "-" ? null : parseInt(aqi),
          lastUpdated: station.time,
        });
      });
    });
  };

  const upsertStationsFromResponses = (reses: StationResponse[]) => {
    realm.write(() => {
      reses.forEach(({ data }) => {
        const { idx, city, aqi, time } = data;
        prepareUpsertStation({
          stationId: `${idx}`,
          name: city.name,
          shortName: city.name.split(",")[0],
          aqi: aqi === "-" ? null : parseInt(aqi),
          lastUpdated: time.iso,
        });
      });
    });
  };

  const deleteStation = useCallback(
    (station: StationSchema) => {
      realm.write(() => {
        realm.delete(station);
      });
    },
    [realm],
  );

  return {
    stations,
    createStation,
    getStationById,
    getStationByStationId,
    editStation,
    prepareUpsertStation,
    upsertStationsFromLookups,
    upsertStationsFromResponses,
    deleteStation,
  };
};
