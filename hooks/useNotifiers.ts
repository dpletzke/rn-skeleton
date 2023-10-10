import { useUser } from "@realm/react";
import { useCallback } from "react";
import { BSON } from "realm";

import { useQuery, useRealm } from "../schemas";
import { NotifierSchema } from "../schemas/NotifierSchema";

export const useNotifiers = () => {
  const realm = useRealm();
  const user = useUser();
  const ownNotifiersResults = useQuery<NotifierSchema>(
    NotifierSchema,
    (collection) => collection.filtered("owner_id == $0", user.id),
    [user],
  );

  const createNotifier = useCallback(
    (newNotifier: { stationId: string; threshold: number }) => {
      console.log("createNotifier", newNotifier);
      realm.write(() => {
        return new NotifierSchema(realm, {
          ...newNotifier,
          owner_id: user?.id,
        });
      });
    },
    [realm, user],
  );

  const getNotifierById = useCallback(
    (id: BSON.ObjectId) => {
      return ownNotifiersResults.find((notifier) => notifier._id === id);
    },
    [ownNotifiersResults],
  );

  const editNotifier = useCallback(
    (notifier: NotifierSchema, edits: { threshold?: number }) => {
      console.log("editNotifier", notifier, edits);
      realm.write(() => {
        if (notifier.owner_id !== user?.id) {
          throw new Error("Cannot edit notifiers owned by other users");
        }
        Object.assign(notifier, edits);
      });
    },
    [realm],
  );

  const deleteNotifier = useCallback(
    (notifier: NotifierSchema) => {
      realm.write(() => {
        realm.delete(notifier);
      });
    },
    [realm],
  );

  return {
    notifiers: ownNotifiersResults,
    getNotifierById,
    createNotifier,
    editNotifier,
    deleteNotifier,
  };
};
