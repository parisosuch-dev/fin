import { Category } from "./models";
import { createClient } from "./server";

const supabase = createClient();

export async function getCategories(): Promise<Category[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user?.id);

  if (!user) {
    throw new Error("User session does not exist.");
  }

  const { data: categories, error } = await supabase
    .from("Category")
    .select()
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }

  return categories as Category[];
}
