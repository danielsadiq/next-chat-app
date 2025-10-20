"use client";

import { subscribeToMessages } from "@/lib/services";
import { MessageType } from "@/types";
import { useEffect, useState } from "react";
import Message from "./Message";

export default function MessageList({
  userId,
  messages: intialMessages,
  convoId,
}: {
  messages: MessageType[];
  userId: string;
  convoId: string;
}) {
  const [messages, setMessages] = useState<MessageType[]>(intialMessages);

  useEffect(() => {
    // ✅ Realtime subscription
    const unsubscribe = subscribeToMessages(
      convoId,
      ({ type, data }) => {
        setMessages((prev) => {
          switch (type) {
            case "insert":
              return [...prev, data];
            case "update":
              const filteredMsgs = prev.filter(msg => !(msg.id === data.id && data.is_deleted === true));
              return filteredMsgs.map(msg => msg.id === data.id ? {...msg, ...data} : msg)
            case "delete":
              return prev.filter(msg => msg.id !== data.id)
            default:
              return prev
          }
        });
      }

      // setMessages((prev) => [...prev, newMessage])
    );

    return unsubscribe;
  }, [convoId]);
  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50">
      {messages.map((msg) => {
        const isMine = msg.sender_id === userId;
        return (
          <Message key={msg.id} msg={msg} isMine={isMine}/> 
        );
      })}
    </div>
  );
}
