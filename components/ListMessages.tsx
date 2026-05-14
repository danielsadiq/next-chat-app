"use client";

import { IMessage, useMessageStore } from "@/lib/store/messages";
import Message from "./Message";
import { DeleteAlert, EditAlert } from "./MessageAction";
import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { toast } from "sonner";
import LoadMoreMessages from "./LoadMoreMessages";

function ListMessages() {
  const {
    messages,
    addMessage,
    optimisticUpdateMessage,
    optimisticDeleteMessage,
  } = useMessageStore((state) => state);
  const scrollRef = useRef<HTMLDivElement>(null); // Create the Ref
  const [userScrolled, setUserScrolled] = useState(false);
  const [notification, setNotification] = useState(0);
  const isScrolledUpRef = useRef(false);
  const supabase = createClient();
  useEffect(() => {
    const channel = supabase
      .channel("table-db-changes") // Give your channel a unique name
      .on(
        "postgres_changes",
        {
          event: "*", // Options: 'INSERT', 'UPDATE', 'DELETE', or '*' for all
          schema: "public",
          table: "messages", // The table name you enabled Realtime for
        },
        async (payload) => {
          const { eventType, new: newRecord, old: oldRecord } = payload;
          switch (eventType) {
            case "INSERT":
              if (isScrolledUpRef.current) {
                setNotification((current) => current + 1);
              }
              const currentOptimisticIds =
                useMessageStore.getState().optimisticIds;
              if (!currentOptimisticIds.includes(newRecord.id)) {
                const { error, data } = await supabase
                  .from("users")
                  .select("*")
                  .eq("id", newRecord.send_by)
                  .single();
                if (error) {
                  toast.error(error.message);
                } else {
                  console.log("here 1");
                  const newMessage = { ...newRecord, users: data };
                  addMessage(newMessage as IMessage);
                }
              }
              break; // <--- ADD THIS BREAK
            case "UPDATE":
              optimisticUpdateMessage(newRecord.id, newRecord.text);
              break;
            case "DELETE":
              optimisticDeleteMessage(oldRecord.id);
              break;
          }
        },
      )

      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Ready to receive updates!");
        }
      });
    return () => {
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SCROLL TO BOTTOM EFFECT
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer && !userScrolled) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages, userScrolled]);

  const handleOnScroll = () => {
    const container = scrollRef.current;
    if (container) {
      const isBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 20;
      const scrolledUp = !isBottom;
      setUserScrolled(scrolledUp);
      isScrolledUpRef.current = scrolledUp;
      if (isBottom) {
        setNotification(0); // Reset count if they scroll down manually
      }
    }
  };
  const scrollToBottom = useCallback(() => {
    setNotification(0);
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth", // Adds that nice sliding animation
    });
  }, []);
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      <div
        className="flex-1 overflow-y-auto px-5 flex flex-col gap-5"
        ref={scrollRef}
        onScroll={handleOnScroll}
      >
        <div className="flex-1">
          <LoadMoreMessages/>
        </div>
        <div className="space-y-7">
        {messages.map((value, index) => {
          return <Message key={index} message={value} />;
        })}
        </div>
      </div>
      {userScrolled && (
        <div className="absolute bottom-10 w-full flex left-0 right-0 justify-center">
          {notification>0 ? (
            <div
              className="px-4 py-2 bg-indigo-500 rounded-full cursor-pointer hover:scale-110 transition-all text-white shadow-lg flex items-center gap-2"
              onClick={scrollToBottom}
            >
              <ArrowDown size={18} />
              <span className="font-bold text-sm">{notification} New messages</span>
            </div>
          ) : (
            <div
              className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center mx-auto border cursor-pointer hover:scale-110 transition-all"
              onClick={scrollToBottom}
            >
              <ArrowDown className="text-white" />
            </div>
          )}
        </div>
      )}
      <DeleteAlert />
      <EditAlert />
    </div>
  );
}

export default ListMessages;
