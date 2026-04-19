import { Suspense } from "react"
import ListMessages from "./ListMessages"
import { createClient } from "@/lib/supabase/server"

async function ChatMessages() {
  const supabase = await createClient();
  const {data} = await supabase.from("messages").select("*,users()");
  console.log(data)
  return (
    <Suspense fallback={"loading..."}>
      <ListMessages/>
    </Suspense>
  )
}

export default ChatMessages
