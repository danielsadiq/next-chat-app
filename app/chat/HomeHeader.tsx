import { getUser } from "@/lib/api-users";
import { PencilLineIcon } from "lucide-react";
import Image from "next/image";

export default async function HomeHeader({userId}: {userId:string}) {
  const user = await getUser(userId);
  return (
    <div className="flex justify-between">
      <div className="rounded-full w-12 h-12 border-1 border-black relative">
        {user?.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt="User avatar"
            fill
            sizes="48px"
            className="object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
            {user?.display_name?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}
      </div>
      <h1 className="text-3xl font-bold">{user?.display_name}</h1>
      <div className="rounded-full w-12 h-12 border-1 border-black flex items-center justify-center cursor-pointer">
        <PencilLineIcon size={30} />
      </div>
      
    </div>
  );
}
