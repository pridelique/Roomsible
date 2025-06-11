'use client'

import { getDay } from "@node_modules/date-fns/getDay";
import { createContext, useContext, useState } from "react";

const mapDay = {
  0: "วันจันทร์",
  1: "วันจันทร์",
  2: "วันอังคาร",
  3: "วันพุธ",
  4: "วันพฤหัสบดี",
  5: "วันศุกร์",
  6: "วันจันทร์",
}

const DateTimeContext = createContext()

function DateTimeProvider({ children }) {

  const [day, setDay] = useState(mapDay[getDay(new Date())] || 0);
  const [period, setPeriod] = useState(1);
  return (
    <DateTimeContext.Provider value={{day, setDay, period, setPeriod}}>
      {children}
    </DateTimeContext.Provider>
  )
}

export { DateTimeProvider, DateTimeContext }