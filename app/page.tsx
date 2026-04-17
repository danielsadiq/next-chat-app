import ChatHeader from "@/components/ChatHeader";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient()
  const {data} = await supabase.auth.getSession();
  console.log(data.session?.user)
  return (
    <div className="h-screen w-[90%] max-w-3xl mx-auto md:py-10">
      <div className="h-full w-full border rounded-md">
        <ChatHeader user = {data.session?.user}/>
      </div>
    </div>
  );
}
