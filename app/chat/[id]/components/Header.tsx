"use client";

import { useUser } from "@/context/UserContext";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user } = useUser();
  const router = useRouter();
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      <button
        onClick={() => router.push("/chat")}
        className="rounded-full p-2 hover:bg-gray-100 transition cursor-pointer"
      >
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-3xl font-bold">Daniel</h1>
      <div className="rounded-full w-[3rem] h-[3rem] border-1 border-black relative">
        {user?.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt="User avatar"
            fill
            className="object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xl font-bold">
            {user?.display_name?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}
      </div>
    </div>
  );
}
