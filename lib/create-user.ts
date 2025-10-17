"use server"

import identicon from "github-identicon";
import { supabase } from "./supabase";

export async function generateImage(userId: string) {
  // 1️⃣ Generate identicon as Buffer
  const buffer = identicon(userId); // returns Buffer in Node environment
  console.log(typeof buffer, Buffer.isBuffer(buffer));


  // 2️⃣ Upload to Supabase Storage
  const filePath = `${userId}.png`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, buffer, {
      cacheControl: "3600",
      contentType: "image/png",
      upsert: true,
    });

  if (uploadError) {
    console.error("❌ Upload error:", uploadError);
    return null;
  }

  // 3️⃣ Get the public URL
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  const publicUrl = data.publicUrl;

  // 4️⃣ Update profiles table with avatar URL
  const { error: dbError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", userId);

  if (dbError) {
    console.error("❌ Database error:", dbError);
  }

  return publicUrl;
}