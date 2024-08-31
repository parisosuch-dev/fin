import { createClient } from "./server";
import { Bucket } from "./models";

const supabase = createClient();

export async function getBuckets(): Promise<Bucket[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User session does not exist.");
  }

  const { data: buckets, error } = await supabase.from("Bucket").select();

  if (error) {
    console.error("Error fetching buckets:", error.message);
    return [];
  }

  return buckets as Bucket[];
}
