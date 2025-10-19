import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabase } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function waitForProfile(email: string, retries = 8, delay = 600) {
  for (let i = 0; i < retries; i++) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (profile) return profile; // ✅ Found

    // ⏳ Wait and retry
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new Error("Profile creation timed out");
}
