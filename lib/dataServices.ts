import { supabase } from "./supabase";

export const getUsers = async function () {
  const { data: profiles, error } = await supabase.from("profiles").select("*");
  if (error) {
    console.error(error);
    throw new Error("Users could not be fetched");
  }
  return profiles;
};

export async function getUser(id:string){
  const {data:profile, error} = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Users could not be fetched");
  }
  return profile;
}
