import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";

import { registerForPushNotificationsAsync } from "../utils/notificationUtils";
import { useUserData } from "./useUserData";

export const useNotifications = () => {
  const { readUserData, editUserData } = useUserData();
  const [notification, setNotification] = useState<
    Notifications.Notification | boolean
  >(false);
  const notificationListener = useRef<Notifications.Subscription | undefined>();
  const responseListener = useRef<Notifications.Subscription | undefined>();

  useEffect(() => {
    readUserData()
      .then(({ expoPushToken }) => {
        if (expoPushToken) {
          return;
        }
        return registerForPushNotificationsAsync();
      })
      .then((token) => {
        if (!token) {
          return;
        }
        return editUserData({ expoPushToken: token.data });
      })
      .catch((err) => {
        console.log("error writing token to user data", err);
      });
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!,
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, [readUserData, editUserData]);

  return [notification];
};

export function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification);
      },
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}
