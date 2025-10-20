import { getMessages } from "@/lib/data-services";
import MessageList from "./MessageList";
import { createServerSupabaseClient } from "@/lib/supabaseServer";

export default async function Body({ convoId }: { convoId: string }) {
  const messages = await getMessages(convoId);
  const supabase = createServerSupabaseClient();
    const { data: { user }} = await supabase.auth.getUser();
  return (
    <MessageList userId={user?.id ?? ""} messages={messages} convoId={convoId} />
  );
}


