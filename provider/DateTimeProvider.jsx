"use client";

import { getCurrentDay, getCurrentPeriod } from "@utils/currentDayPeriod";
import { createContext, useEffect, useState } from "react";

const mapDay = {
  0: "วันจันทร์",
  1: "วันจันทร์",
  2: "วันอังคาร",
  3: "วันพุธ",
  4: "วันพฤหัสบดี",
  5: "วันศุกร์",
  6: "วันจันทร์",
};

const DateTimeContext = createContext();

function DateTimeProvider({ children }) {
  const [day, setDay] = useState(mapDay[0]);
  const [period, setPeriod] = useState(1);

  useEffect(() => {
    const currentDay = getCurrentDay();
    const currentPeriod = getCurrentPeriod();
    
    if (currentDay === 0 || currentDay === 6) {
      setDay(mapDay[1]);
      setPeriod(1);
    } else {
      setDay(mapDay[currentDay]);
      if (currentPeriod === "before-school") {
        setPeriod(1);
      } else if (currentPeriod === "after-school") {
        setPeriod(1);
        setDay(mapDay[(currentDay+1) % 7]);
      } else {
        setPeriod(currentPeriod);
      }
    }
  }, []);

  return (
    <DateTimeContext.Provider value={{ day, setDay, period, setPeriod }}>
      {children}
    </DateTimeContext.Provider>
  );
}

export { DateTimeProvider, DateTimeContext };
