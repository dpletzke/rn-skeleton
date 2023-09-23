import Realm, { BSON } from "realm";

export class Task extends Realm.Object<Task> {
  _id!: Realm.BSON.ObjectId;
  owner_id!: string;
  isCompleted!: boolean;
  text!: string;

  static schema: Realm.ObjectSchema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new BSON.ObjectId() },
      owner_id: "string",
      isCompleted: "bool",
      text: "string",
    },
  };
}
