import identicon from "github-identicon";
import { supabase } from "./supabase";

export async function getImg() {
  const id = "e72f9249-5a00-4a6e-a5ed-4669e1e976ed";
  const buffer = identicon(id);

  // 2. Upload to supabase storage
  const filePath = `${id}.png`;
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
}
