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

export async function deleteCategory(
  supabase: SupabaseClient,
  category_id: number
): Promise<number> {
  const response = await supabase
    .from("Category")
    .delete()
    .eq("id", category_id);

  console.log(response);

  if (response.error) {
    throw new Error(response.error.message);
  }

  if (!response.count) {
    // TODO: fix whatever this is. why would the count be null, shouldn't it error?
    return 0;
  }

  return response.count;
}

export async function editCategory(
  supabase: SupabaseClient,
  category: Category
): Promise<Category> {
  console.log(category);

  const { error } = await supabase
    .from("Category")
    .update({ description: category.description, bucket: category.bucket })
    .eq("id", category.id);

  if (error) {
    throw new Error(error.message);
  }

  return category;
}
