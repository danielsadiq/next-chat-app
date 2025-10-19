import { getUser } from "./api-users";

export async function getCurrentUser(id:string){
  const user = await getUser(id);
  return user
}