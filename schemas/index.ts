import { createRealmContext } from "@realm/react";
import Realm from "realm";

import { NotifierSchema } from "./NotifierSchema";
import { StationSchema } from "./StationSchema";

const realmConfig: Realm.Configuration = {
  schema: [NotifierSchema, StationSchema],
};

export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig);
