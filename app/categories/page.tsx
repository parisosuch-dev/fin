import CreateCategory from "@/components/create-category";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/lib/supabase/category";
import { redirect } from "next/navigation";

import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getCategories();

  if (categories.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center w-full mt-16 p-4 sm:p-8">
        <CreateCategory />
      </div>
    );
  }

  const handleAdd = async () => {
    "use server";

    console.log("hello");

    redirect("/categories/add");
  };

  return (
    <div className="flex flex-1 flex-col items-center w-full mt-16">
      <div className="w-1/4">
        <h1 className="text-4xl font-bold">Categories</h1>
      </div>
      <div className="w-1/4 mt-8 mb-2 flex flex-row justify-end">
        <Button variant="secondary">
          <Link href="/categories/add">
            <CirclePlusIcon color="gray" />
          </Link>
        </Button>
      </div>
      <div className="w-1/4 space-y-2">
        {categories.map((category) => (
          <Card className="w-full p-4 space-y-2" key={category.name}>
            <div className="flex flex-row items-center space-x-4">
              <CardTitle>{category.name}</CardTitle>
              <Badge variant="outline">{category.bucket}</Badge>
            </div>
            <p className="text-sm font-light">{category.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
