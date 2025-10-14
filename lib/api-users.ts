import identicon from "github-identicon";
import { supabase } from "./supabase";

export const getUsers = async function () {
  const { data: profiles, error } = await supabase.from("profiles").select("*");
  if (error) {
    console.error(error);
    throw new Error("Users could not be fetched");
  }
  return profiles;
};

export async function getUser(email: string) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Users could not be fetched");
  }
  return profile;
}

export async function createUser() {
  const { data: profile, error } = await supabase
    .from("profiles")
    .insert([
      {
        display_name: "James",
        about: "Hey there! I'm on chatapp",
        email: "james@email.com",
      },
    ])
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }
  // 1. Generate avatar
  const buffer = identicon(profile.id);

  // 2. Upload to supabase storage
  const filePath = `${profile.id}.png`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, buffer, {
      cacheControl: "3600",
      contentType: "image/png",
      upsert: false,
    });
  if (uploadError) {
    console.log(uploadError);
  }

  // 🌐 3. Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);
  console.log(publicUrl);

  // 🧾 4. Save to profiles table
  const { error: dbError } = await supabase
    .from("profiles")
    .update({
      avatar_url: publicUrl,
    })
    .eq("id", profile.id);

  if (dbError) {
    console.error(dbError);
  }
  return profile;
}