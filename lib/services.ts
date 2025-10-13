/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabase";

type RealtimeEvent = "INSERT" | "UPDATE" | "DELETE";
export function subscribeToMessages(
  conversationId: string,
  {
    onInsert,
    onUpdate,
    onDelete,
  }: {
    onInsert?: (message: any) => void;
    onUpdate?: (message: any) => void;
    onDelete?: (message: any) => void;
  }
) {
  const channel = supabase
    .channel(`chat-room-${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        const eventType = payload.eventType as RealtimeEvent;
        switch (eventType) {
          case "INSERT":
            onInsert?.(payload.new);
            break;
          case "UPDATE":
            onUpdate?.(payload.new);
            break;
          case "DELETE":
            onDelete?.(payload.old);
            break;
        }
      }
    )
    .subscribe();

  // ✅ Cleanup subscription on unmount
  return () => {
    supabase.removeChannel(channel);
  };
}
