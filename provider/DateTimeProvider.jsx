"use client";

import { getCurrentDay, getCurrentPeriod } from "@utils/currentDayPeriod";
import { createContext, useEffect, useRef, useState } from "react";

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
  const [currentDay, setCurrentDay] = useState(getCurrentDay('eng') || 'monday');
  const [currentPeriod, setCurrentPeriod] = useState(getCurrentPeriod() || 1);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentDay(getCurrentDay('eng'));
      setCurrentPeriod(getCurrentPeriod());
      
    }, 10 * 1000)

    return () => {
      clearInterval(intervalRef.current);
    }
  }, [])

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

  // const intervalRef = useRef(null);

  // useEffect(() => {
  //   if (intervalRef.current) {
  //     return;
  //   }

  //   const jobs = async () => {
  //     const res = await fetch("/api/jobs/check-expired-bookings",{
  //       method: "GET",
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //   }
  //   jobs();
    // intervalRef.current = setInterval(() => jobs(), 1000 * 60); // Update every minute

  //   return () => clearInterval(intervalRef.current);
  // }, [])

  return (
    <DateTimeContext.Provider value={{ day, setDay, period, setPeriod, currentDay, currentPeriod }}>
      {children}
    </DateTimeContext.Provider>
  );
}

export { DateTimeProvider, DateTimeContext };
