import CreateCategory from "@/components/create-category";

export default async function AddCategoryPage() {
  return (
    <div className="flex flex-1 flex-col items-center w-full mt-16 p-4 sm:p-8">
      <CreateCategory />
    </div>
  );
}
