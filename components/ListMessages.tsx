"use client";

import { IMessage, useMessageStore } from "@/lib/store/messages";
import Message from "./Message";
import { DeleteAlert, EditAlert } from "./MessageAction";
import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { toast } from "sonner";

function ListMessages() {
  const {
    messages,
    addMessage,
    optimisticUpdateMessage,
    optimisticDeleteMessage,
  } = useMessageStore((state) => state);
  const scrollRef = useRef<HTMLDivElement>(null); // Create the Ref
  const [userScrolled, setUserScrolled] = useState(false);
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
                  const newMessage = { ...newRecord, users: data };
                  addMessage(newMessage as IMessage);
                }
              }
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
  }, [messages]);

  useEffect(() => {
    // Whenever messages change, scroll the anchor into view
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Trigger this every time the messages array updates

  const handleOnScroll = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const isScroll =
        scrollContainer.scrollTop <
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
      console.log(isScroll);
      setUserScrolled(isScroll);
    }
  };
  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth", // Adds that nice sliding animation
    });
  }, []);
  return (
    <div className="flex flex-col overflow-hidden">
      <div
        className="space-y-7 overflow-y-auto"
        ref={scrollRef}
        onScroll={handleOnScroll}
      >
        {messages.map((value, index) => {
          return <Message key={index} message={value} />;
        })}
        <div />
      </div>
      {userScrolled && (
        <div className="absolute bottom-20 right-1/2">
          <div
            className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center mx-auto border cursor-pointer hover:scale-110 transition-all"
            onClick={scrollToBottom}
          >
            <ArrowDown />
          </div>
        </div>
      )}
      <DeleteAlert />
      <EditAlert />
    </div>
  );
}

export default ListMessages;
