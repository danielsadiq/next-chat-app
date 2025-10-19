import { UserProvider } from "@/context/UserContext";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="h-screen">
        {children}
      </div>
    </UserProvider>
  );
}