import { useEffect, useState } from "react";

import * as Location from "expo-location";

type Props = {
  onPermissionDenied: () => void;
  onError: (error: Error) => void;
};

export const useLocation = ({ onPermissionDenied, onError }: Props) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status !== "granted") {
          onPermissionDenied();
          return;
        }
      })
      .then(() => Location.getCurrentPositionAsync())
      .then((location) => {
        setLocation(location);
      })
      .catch((error) => {
        onError(error);
      });
  }, []);

  return [location];
};
