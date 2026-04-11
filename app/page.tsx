import { Button } from "@/components/ui/button"
export default function Home() {
  return (
    <div className="h-screen w-[90%] max-w-3xl mx-auto md:py-10">
      <div className="h-full w-full border rounded-md">
        <div className="h-20">
          <div className="p-5 border-b flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Daily Chat</h1>
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 bg-green-500 animate-pulse rounded-full"></div>
                <h1 className="text-sm text-gray-400">2 online</h1>
              </div>
            </div>
            <Button>Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
