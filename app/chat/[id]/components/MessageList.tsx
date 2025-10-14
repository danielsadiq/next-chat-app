"use client";

import { subscribeToMessages } from "@/lib/services";
import { MessageType, UserType } from "@/types";
import { useEffect, useState } from "react";

export default function MessageList({
  user,
  messages: intialMessages,
  convoId,
}: {
  messages: MessageType[];
  user: UserType;
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
              return prev.map(msg => msg.id === data.id ? {...msg, ...data} : msg)
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
        const isMine = msg.sender_id === user?.id;

        return (
          <div
            key={msg.id}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${
                isMine
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-white text-gray-900 rounded-bl-none"
              }`}
            >
              {/* Sender name for group chats */}
              {!isMine && (
                <p className="text-xs text-gray-500 mb-1">
                  {msg.sender?.display_name || "Unknown"}
                </p>
              )}
              <p className="break-words">{msg.content}</p>

              {/* Timestamp */}
              <p
                className={`text-[10px] mt-1 ${
                  isMine ? "text-green-100" : "text-gray-400"
                } text-right`}
              >
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
