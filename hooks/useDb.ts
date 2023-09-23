import { useCallback } from "react";
import { useRealm, useQuery } from "../schemas";
import { Task } from "../schemas/TaskSchema";
import { useUser } from "@realm/react";
import { BSON } from "realm";

export const useDb = () => {
  const realm = useRealm();
  const user = useUser();
  const ownTasks = useQuery<Task>(
    "Task",
    (collection) => collection.filtered("owner_id == $0", user.id),
    [user]
  );

  const createTask = useCallback(
    ({ text }: { text: string }) => {
      realm.write(() => {
        return new Task(realm, {
          owner_id: user?.id,
          isCompleted: false,
          text,
        });
      });
    },
    [realm, user]
  );

  const getTaskById = useCallback(
    (id: BSON.ObjectId) => {
      return ownTasks.find((task) => task._id === id);
    },
    [ownTasks]
  );

  const editTask = useCallback(
    (task: Task, edits: Partial<Omit<Task, "_id" | "owner_id">>) => {
      realm.write(() => {
        if (task.owner_id !== user?.id) {
          throw new Error("Cannot edit Tasks owned by other users");
        }
        Object.assign(task, edits);
      });
    },
    [realm]
  );

  const deleteTask = useCallback(
    (Task: Task) => {
      realm.write(() => {
        realm.delete(Task);
      });
    },
    [realm]
  );

  return {
    realm,
    user,
    ownTasks,
    getTaskById,
    createTask,
    editTask,
    deleteTask,
  };
};
