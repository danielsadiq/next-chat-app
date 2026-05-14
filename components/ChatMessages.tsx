import { Suspense } from "react";
import ListMessages from "./ListMessages";
import { createClient } from "@/lib/supabase/server";
import InitMessages from "@/lib/store/InitMessages";
import { LIMIT_MESSAGE } from "@/lib/constant";

async function ChatMessages() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("messages")
    .select("*, users(*)").range(0, LIMIT_MESSAGE)
    .order("created_at", { ascending: false });
  return (
    <Suspense fallback={"loading..."}>
      <ListMessages />
      <InitMessages messages={data?.reverse() || []} />
    </Suspense>
  );
}

export default ChatMessages;
