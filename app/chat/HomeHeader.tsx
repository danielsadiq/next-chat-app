import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";

export default async function HomeHeader() {
  const user = await getCurrentUser();
  return (
    <div className="flex justify-between">
      <div className="rounded-full w-[3rem] h-[3rem] border-1 border-black relative">
        {user?.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt="User avatar"
            fill
            className="object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
            {user?.display_name?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}
      </div>
      <h1 className="text-3xl font-bold">{user?.display_name}</h1>
      <div className="rounded-full w-[3rem] h-[3rem] border-1 border-black"></div>
    </div>
  );
}
