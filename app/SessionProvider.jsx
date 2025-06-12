'use client'
import { createContext, useState } from "react"

const SessionContext = createContext()

function SessionProvider({ children }) {
  const [user, setUser] = useState(null)
  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  )
}

export { SessionProvider, SessionContext }