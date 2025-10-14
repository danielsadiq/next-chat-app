"use client";

import AvatarImage from "@/app/components/AvatarImage";
import { useUser } from "@/context/UserContext";
import { ArrowLeft } from "lucide-react";
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
      <AvatarImage imgUrl={user?.avatar_url} />
    </div>
  );
}
