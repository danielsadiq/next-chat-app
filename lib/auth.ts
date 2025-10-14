import { getUser } from "./api-users";

export async function getCurrentUser(){
  const user = await getUser("daniel@example.com");
  return user
}