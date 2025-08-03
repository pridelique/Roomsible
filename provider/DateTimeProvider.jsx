"use client";

import { getCurrentDay, getCurrentPeriod } from "@utils/currentDayPeriod";
import { createContext, useEffect, useRef, useState } from "react";

const mapDay = {
  0: "monday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "monday",
};

const DateTimeContext = createContext();

function DateTimeProvider({ children }) {
  const [day, setDay] = useState(null);
  const [period, setPeriod] = useState(null);
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
    if (!day || !period) return;    
    sessionStorage.setItem("day_period", JSON.stringify({ day, period }));
  }, [day, period]);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("day_period"));
    console.log(data);
    if (data?.day && data?.period) {
      setDay(data.day);
      setPeriod(data.period);
      return;
    }

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