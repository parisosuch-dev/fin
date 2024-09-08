import CreateCategory from "@/components/create-category";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/lib/supabase/category";

import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function CategoriesPage() {
  const supabase = createClient();

  const categories = await getCategories(supabase);

  if (categories.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center w-full mt-16 p-4 sm:p-8">
        <CreateCategory />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center w-full mt-16">
      <div className="w-full sm:w-1/4">
        <h1 className="text-4xl font-bold">Categories</h1>
      </div>
      <div className="w-full sm:w-1/4 mt-8 mb-2 flex flex-row justify-end">
        <Button variant="secondary">
          <Link href="/categories/add">
            <CirclePlusIcon color="gray" />
          </Link>
        </Button>
      </div>
      <div className="w-full sm:w-1/4 space-y-2">
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
