import React, { createContext, useState } from "react";

type NotifierSetupType = {
  stationId: string | null;
  threshold: number;
};

export type NotifierSetupContextType = {
  notifierSetup: NotifierSetupType;
  setStationId: (stationId: string | null) => void;
  setThreshold: (threshold: number) => void;
  resetNotifierSetup: () => void;
};

export const NotifierSetupContext = createContext<NotifierSetupContextType>({
  notifierSetup: {
    stationId: null,
    threshold: 101,
  },
  setStationId: () => {},
  setThreshold: () => {},
  resetNotifierSetup: () => {},
});

type Props = { children: React.ReactNode };
export const NotifierSetupProvider = ({ children }: Props) => {
  const [notifierSetup, setNotifierSetup] = useState<NotifierSetupType>({
    stationId: null,
    threshold: 101,
  });

  const setStationId = (stationId: string | null) => {
    setNotifierSetup((prev) => ({ ...prev, stationId }));
  };

  const setThreshold = (threshold: number) => {
    setNotifierSetup((prev) => ({ ...prev, threshold }));
  };

  const resetNotifierSetup = () => {
    setNotifierSetup({
      stationId: null,
      threshold: 101,
    });
  };

  return (
    <NotifierSetupContext.Provider
      value={{ notifierSetup, setStationId, setThreshold, resetNotifierSetup }}
    >
      {children}
    </NotifierSetupContext.Provider>
  );
};
