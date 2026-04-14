import ChatHeader from "@/components/ChatHeader";

export default function Home() {
  return (
    <div className="h-screen w-[90%] max-w-3xl mx-auto md:py-10">
      <div className="h-full w-full border rounded-md">
        <ChatHeader/>
      </div>
    </div>
  );
}
