import { useUser } from "@realm/react";
import * as Notifications from "expo-notifications";

export const useCustomUserData = () => {
  const user = useUser();
  const writeCustomUserData = async (
    expoPushToken: Notifications.ExpoPushToken,
  ) => {
    // console.log(user.)
    const customUserDataCollection = user
      .mongoClient("mongodb-atlas")
      .db("breathe-easy-sync-dev")
      .collection("custom-user-data");
    const filter = {
      userId: user.id, // Query for the user object of the logged in user
    };
    const updateDoc = {
      $set: {
        // Set User ID if it's not already set
        userId: user.id,
        expoPushToken,
      },
    };
    const options = { upsert: true };
    await customUserDataCollection.updateOne(filter, updateDoc, options);
    // Refresh custom user data once it's been updated on the server
    const customUserData = await user.refreshCustomData();
    console.log("customUserData", customUserData);
    return customUserData;
  };

  return { writeCustomUserData };
};
