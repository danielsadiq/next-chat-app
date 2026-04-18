"use client"

import { User } from "@supabase/supabase-js"
import { useEffect, useRef } from "react"
import { useUser } from "./user"

function InitUser({user}: {user:User | undefined}) {
  const initState = useRef(false)
  useEffect(()=>{
    if (!initState.current){
      useUser.setState({user})
    }
    initState.current = true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <></>
  )
}

export default InitUser
