import { Suspense } from "react";
import Header from "./components/Header";
import MessageBar from "./components/MessageBar";
import Spinner from "@/components/Spinner";
import Body from "./components/Body";

type PageProps = {
  params: Promise<{ conversationId: string}>;
  searchParams: Promise<{ name?: string; image?: string }>;
  // searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params, searchParams }: PageProps) {
  const { conversationId } = await params;
  const { name, image } = await searchParams;
  const displayName = name ?? "Unknown";
  const displayImage = image ?? "";

  return (
    <div className="max-w-lg md:max-w-xl mx-auto flex flex-col h-full">
      <Header name={displayName} image={displayImage} />
      <div className="flex flex-grow items-center justify-center">
        <Suspense
          fallback={
            <Spinner/>
          }
        >
          <Body convoId={conversationId} />
        </Suspense>
      </div>
      <MessageBar convoId={conversationId} />
    </div>
  );
}
