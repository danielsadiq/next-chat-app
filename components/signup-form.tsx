"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/passwordInput";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import { AuthError } from "@supabase/supabase-js";
import { generateImage } from "@/lib/create-user";

export default function SignupForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  // form states
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // error states
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");
    setEmailError("");
    setPasswordError("");
    setUsernameError("");

    // Basic validation
    if (username.trim().length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
      setLoading(false);
      return;
    }

    if (password.trim().length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      // 👇 Create user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: username } },
      });
      console.log(data.user?.user_metadata)
      if (data.user){
        await generateImage(data.user.id)
      }


      if (error) {
        console.log(error)
        throw error;
      }

      // Redirect after signup
      router.push("/chat");
      router.refresh();
    } catch (err) {
      const error = err as AuthError;

      if (error.message.includes("User already registered")) {
        setEmailError(
          "An account with this email already exists. Please log in instead."
        );
      } else if (error.message.toLowerCase().includes("email")) {
        setEmailError("Please enter a valid email address.");
      } else {
        setFormError(error.message || "Unable to sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) setFormError(error.message);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Sign up to start chatting instantly
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="_danielsadiq"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {usernameError && (
                <p className="text-sm text-red-500">{usernameError}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && (
                <p className="text-sm text-red-500">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
            </div>

            {/* Form-level error */}
            {formError && (
              <div className="text-sm text-red-500 text-center">{formError}</div>
            )}

            <Button
              type="submit"
              className="w-full hover:bg-blue-600 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>

            <Separator className="my-4" />

            {/* OAuth Buttons */}
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => handleOAuthSignIn("google")}
              >
                <Mail className="mr-2 h-4 w-4" /> Continue with Google
              </Button>

              <Button
                variant="outline"
                type="button"
                onClick={() => handleOAuthSignIn("github")}
              >
                <Github className="mr-2 h-4 w-4" /> Continue with GitHub
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary underline-offset-4 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
