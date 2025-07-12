'use client'
import { supabase } from "@utils/supabase"
import { createContext, useEffect, useState } from "react"

const SessionContext = createContext()

function SessionProvider({ children }) {
  const [user, setUser] = useState('loading')

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
    
  }

  useEffect(() => {
    getUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user)
      } else {
        setUser(null)
      }
      // console.log("Auth state changed:", _event, session);
      
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <SessionContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </SessionContext.Provider>
  )
}

export { SessionProvider, SessionContext }