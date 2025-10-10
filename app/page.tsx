import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <div className="font-sans items-center min-h-screen py-20 gap-16 sm:p-20">
      <main className="flex flex-col items-center gap-6 justify-center">
        <h1 className="font-bold text-2xl text-center">Welcome to ChatApp</h1>
        <LoginForm className="max-w-md w-full" />
      </main>
    </div>
  );
}
