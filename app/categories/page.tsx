"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "@/lib/supabase/category";

import { createClient } from "@/lib/supabase/client";
import { Category } from "@/lib/supabase/models";
import { CirclePlusIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    getCategories(supabase).then((res) => {
      if (res.length === 0) {
        router.push("/categories/add");
      }
      setCategories(res);
    });
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center w-full mt-16">
      <div className="w-full sm:w-1/4">
        <h1 className="text-4xl font-bold">Categories</h1>
        <p className="font-light">Organize your expenses into a category.</p>
      </div>
      <div className="w-full sm:w-1/4 mt-8 mb-2 flex flex-row justify-end">
        <Link href="/categories/add">
          <Button variant="secondary" className="group">
            <CirclePlusIcon
              color="gray"
              className="group-hover:scale-90 transform duration-300"
            />
          </Button>
        </Link>
      </div>
      <div className="w-full sm:w-1/4 space-y-2">
        {categories.length === 0 ? (
          <div className="space-y-2">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <Skeleton className="h-[125px] w-full rounded-xl" />
          </div>
        ) : (
          categories.map((category) => (
            <Card className="w-full p-4 space-y-2" key={category.name}>
              <div className="flex flex-row justify-between">
                <CardTitle>{category.name}</CardTitle>
                <div className="">
                  <Link
                    href={`/categories/delete?category=${category.name}`}
                    className="group"
                  >
                    <Trash2Icon
                      color="gray"
                      size={18}
                      className="group-hover:scale-90 transform duration-300"
                    />
                  </Link>
                </div>
              </div>
              <Badge variant="outline">{category.bucket}</Badge>
              <p className="text-sm font-light">{category.description}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
