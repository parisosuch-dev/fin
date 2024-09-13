"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { getBuckets } from "@/lib/supabase/bucket";
import {
  deleteCategory,
  editCategory,
  getCategories,
} from "@/lib/supabase/category";
import { createClient } from "@/lib/supabase/client";
import { Bucket, Category } from "@/lib/supabase/models";
import { CirclePlusIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

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

  const handleDelete = (category: Category) => {
    deleteCategory(supabase, category.id)
      .then((res) => {
        getCategories(supabase).then((res) => {
          if (res.length === 0) {
            router.push("/categories/add");
          }
          setCategories(res);
        });
      })
      .catch((e) => {
        // TODO: handle error
      });
  };

  const maxLengthCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength);
    }
  };

  const DeletePopUp = ({ category }: { category: Category }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Trash2Icon
            color="gray"
            size={18}
            className="hover:scale-90 hover:cursor-pointer transform duration-300"
          />
        </DialogTrigger>
        <DialogContent className="flex flex-col pt-8 px-2 sm:px-4 rounded-lg max-w-[400px]">
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle>
              Delete Category &ldquo;{category.name}&ldquo;
            </DialogTitle>
            <DialogDescription className="text-center">
              This may remove categories from some transactions. You will need
              to go back and change those.
            </DialogDescription>
          </DialogHeader>
          <Button variant="destructive" onClick={() => handleDelete(category)}>
            Delete Category
          </Button>
        </DialogContent>
      </Dialog>
    );
  };

  const EditPopUp = ({ category }: { category: Category }) => {
    const [description, setDescription] = useState(category.description);
    const [bucket, setBucket] = useState(category.bucket);

    const [buckets, setBuckets] = useState<Bucket[]>([]);

    useEffect(() => {
      // get buckets
      getBuckets(supabase).then((res) => {
        setBuckets(res);
      });
    }, []);

    const handleEdit = () => {
      category.description = description;
      category.bucket = bucket;

      editCategory(supabase, category)
        .then((res) => {
          // set updated category to new category
          setCategories(
            categories.map((item) =>
              item.id === category.id
                ? { ...item, description: description, bucket: bucket }
                : item
            )
          );
        })
        .catch((e) => {
          // TODO: handle error
          console.error(e);
        });
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <PencilIcon
            color="gray"
            size={18}
            className="hover:scale-90 hover:cursor-pointer transform duration-300"
          />
        </DialogTrigger>
        <DialogContent className="flex flex-col pt-8 px-2 sm:px-4 rounded-lg max-w-[400px]">
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle>
              Edit Category &ldquo;{category.name}&ldquo;
            </DialogTitle>
            <form className="flex flex-col items-start w-full space-y-2">
              <Label>Bucket</Label>
              <Select
                name="bucket"
                defaultValue={bucket}
                onValueChange={(value) => {
                  setBucket(value);
                }}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Bucket" />
                </SelectTrigger>
                <SelectContent>
                  {buckets.map((bucket) => (
                    <SelectItem key={bucket.type} value={bucket.type}>
                      {bucket.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label>Description</Label>
              <Input
                name="description"
                placeholder="description"
                type="text"
                value={description}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setDescription(e.target.value);
                }}
                maxLength={56}
                onInput={maxLengthCheck}
                required
              />
              <Button className="w-full" type="submit" formAction={handleEdit}>
                Confirm
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

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
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <Skeleton className="h-[125px] w-full rounded-xl" />
          </div>
        ) : (
          categories.map((category) => (
            <Card className="w-full p-4 space-y-2" key={category.name}>
              <div className="flex flex-row items-center justify-between">
                <CardTitle>{category.name}</CardTitle>
                <div className="flex flex-row space-x-2">
                  <EditPopUp category={category} />
                  <DeletePopUp category={category} />
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
