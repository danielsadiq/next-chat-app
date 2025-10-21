import { UserProvider } from "@/context/UserContext";
import { getUser } from "@/lib/api-users";
import { createServerSupabaseClient } from "@/lib/supabaseServer";


export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }, 
  } = await supabase.auth.getUser();

  const userInfo = await getUser(user?.id ?? "null") 

  return (
    <UserProvider user={userInfo} >
      <div className="max-w-lg md:max-w-xl mx-auto py-6 flex flex-col h-screen">
        {children}
      </div>
    </UserProvider>
  );
}