import Realm from "realm";
import { createRealmContext } from "@realm/react";
import { Task } from "./TaskSchema";

const realmConfig: Realm.Configuration = {
  schema: [Task],
};

export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig);
