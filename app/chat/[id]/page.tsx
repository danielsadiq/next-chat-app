import { Suspense } from "react";
import Header from "./components/Header";
import MessageBar from "./components/MessageBar";
import Spinner from "@/components/Spinner";
import Body from "./components/Body";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="max-w-lg md:max-w-xl mx-auto flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <Suspense
          fallback={
            <Spinner/>
          }
        >
          <Body convoId={id} />
        </Suspense>
      </div>
      <MessageBar convoId={id} />
    </div>
  );
}
