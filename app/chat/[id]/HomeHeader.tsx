"use client";

import { useUser } from "@/context/UserContext";
import Image from "next/image";

export default function HomeHeader() {
  const { user } = useUser();
  console.log(user);
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
            {user?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}
      </div>
      <h1 className="text-3xl font-bold">{user?.display_name}</h1>
      <div className="rounded-full w-[3rem] h-[3rem] border-1 border-black"></div>
    </div>
  );
}
