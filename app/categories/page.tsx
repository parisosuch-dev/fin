import CreateCategory from "@/components/create-category";
import { getCategories } from "@/lib/supabase/category";

export default async function CategoriesPage() {
  const categories = await getCategories();

  if (categories.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center w-full mt-16 p-4 sm:p-8">
        <CreateCategory />
      </div>
    );
  }

  return <div className="flex flex-1 flex-col items-center w-full mt-16"></div>;
}
