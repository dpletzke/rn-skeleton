import { useUser } from "@realm/react";
import { Document } from "realm/dist/bundle";
interface UserData {
  user_id: string;
  expoPushToken: string;
  isBlocked: boolean;
}

export const useUserData = () => {
  const user = useUser();
  const userDataCollection = user
    .mongoClient("mongodb-atlas")
    .db("breathe-easy-sync-dev")
    .collection<Document<UserData>>("custom-user-data");

  const readUserData = async () => {
    const data = await user.refreshCustomData();
    return data;
  };

  const initUserData = async (expoPushToken = "") => {
    const userData = await readUserData();
    if (userData && userData.user_id) return userData;
    const data = {
      user_id: user.id,
      expoPushToken,
      isBlocked: false,
    };
    const response = await userDataCollection.insertOne(data);
    await user.refreshCustomData();
    return response;
  };

  const editUserData = async (
    newUserData: Partial<Omit<UserData, "user_id">>,
  ) => {
    const filter = {
      user_id: user.id,
    };
    const updateDoc = {
      $set: newUserData,
    };
    const response = await userDataCollection.updateOne(filter, updateDoc);
    await user.refreshCustomData();
    return response;
  };

  return { initUserData, readUserData, editUserData };
};
