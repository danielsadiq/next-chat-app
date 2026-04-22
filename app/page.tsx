import ChatHeader from "@/components/ChatHeader";
import InitUser from "@/lib/store/initUser";
import { createClient } from "@/lib/supabase/server";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  return (
    <>
      <InitUser user={data.session?.user} />
      <div className="h-screen w-[90%] max-w-3xl mx-auto md:py-10">
        <div className="h-full w-full border rounded-md flex flex-col">
          <ChatHeader user={data.session?.user} />
          <div className="flex-1 flex flex-col p-5 h-full overflow-y-auto">
            <div className="flex-1"></div>
            <ChatMessages/>
          </div>
          <ChatInput/>
        </div>
      </div>
    </>
  );
}
