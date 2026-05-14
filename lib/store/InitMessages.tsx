"use client";

import { useEffect, useRef } from "react";
import { IMessage, useMessageStore } from "./messages";
import { LIMIT_MESSAGE } from "../constant";

function InitMessages({ messages }: { messages: IMessage[] }) {
  const initState = useRef(false);
  const hasMore = messages.length >= LIMIT_MESSAGE;
  const store = useMessageStore.getState();
  useEffect(() => {
    if (!initState.current) {
      store.setMessages(messages);
      store.setHasMore(hasMore);
      initState.current = true;
    }
  });

  return <></>;
}

export default InitMessages;
