import { SupabaseClient } from "@supabase/supabase-js";
import { Category } from "./models";

export async function getCategories(
  supabase: SupabaseClient
): Promise<Category[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

export async function createCategory(
  supabase: SupabaseClient,
  bucket: string,
  name: string,
  description: string
): Promise<Category> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User session does not exist.");
  }

  const { data: category, error } = await supabase
    .from("Category")
    .insert([
      {
        user_id: user.id,
        name: name,
        description: description,
        bucket: bucket,
      },
    ])
    .select();

  if (error) {
    throw new Error(`Error creating category: ${error.message}`);
  }
  if (!category) {
    throw new Error("Unkown error happened when creating category.");
  }

  return category[0] as Category;
}
