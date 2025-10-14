import { supabase } from "@/lib/supabase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function subscribeToMessages(conversationId: string, callback: (message: any) => void) {
  const channel = supabase
      .channel(`chat-room-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              callback({type: 'insert', data:payload.new})
              break;
            case 'UPDATE':
              callback({type: 'update', data:payload.new})
              break
            case 'DELETE':
              callback({type: 'delete', data:payload.old})
              break
            default:
              console.warn('Unhandled event type:');
          }
        }
      )
      .subscribe();

    // ✅ Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
}
