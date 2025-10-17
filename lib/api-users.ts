import { generateImage } from "./create-user";
import { supabase } from "./supabase";
import { UserMetadata } from "@supabase/supabase-js";


export async function createUser(userData: UserMetadata) {
  const {email, username} = userData
  const { data: profile, error } = await supabase
    .from("profiles")
    .insert([
      {
        display_name: username,
        about: "Hey there! I'm on chatapp",
        email,
      },
    ])
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }
  await generateImage(profile.id)
}

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
    .maybeSingle(); // 👈 use maybeSingle instead of single

  if (error && error.code !== "PGRST116") {
    console.error(error);
    throw new Error("Failed to fetch user profile");
  }

  return profile; // returns null if no match, instead of throwing
}