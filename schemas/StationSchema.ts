import Realm, { BSON } from "realm";

export class StationSchema extends Realm.Object<StationSchema> {
  _id!: Realm.BSON.ObjectId;
  stationId!: string;
  name!: string;
  aqi!: number | null;
  lastUpdated!: string;

  static schema: Realm.ObjectSchema = {
    name: "Station",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new BSON.ObjectId() },
      stationId: "string",
      name: "string",
      aqi: "int",
      lastUpdated: "string",
    },
  };
}
