import Realm, { BSON } from "realm";

export class NotifierSchema extends Realm.Object<NotifierSchema> {
  _id!: Realm.BSON.ObjectId;
  owner_id!: string;
  stationId!: string;
  threshold!: number;
  isNotified!: boolean;
  notifsAreOn!: boolean;

  static schema: Realm.ObjectSchema = {
    name: "Notifier",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new BSON.ObjectId() },
      owner_id: "string",
      stationId: "string",
      threshold: "int",
      isNotified: { type: "bool", default: false },
      notifsAreOn: { type: "bool", default: true },
    },
  };
}
