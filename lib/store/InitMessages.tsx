"use client"

import { useRef } from "react"
import { IMessage, useMessageStore } from "./messages"

function InitMessages({messages}: {messages: IMessage[]}) {
  const initState = useRef(false);
  if (!initState.current){
    useMessageStore.getState().setMessages(messages);
    initState.current = true;
  }

  return (
    <></>
  )
}

export default InitMessages
