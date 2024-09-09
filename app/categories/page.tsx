"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { getCategories } from "@/lib/supabase/category";
import { createClient } from "@/lib/supabase/client";
import { Category } from "@/lib/supabase/models";
import { CirclePlusIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);

  const supabase = createClient();
  const router = useRouter();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  useEffect(() => {
    getCategories(supabase).then((res) => {
      if (res.length === 0) {
        router.push("/categories/add");
      }
      setCategories(res);
    });
  }, []);

  const deleteCategory = (category: Category) => {
    // TODO: delete category
    setOpen(false);
  };

  const MobileDrawer = ({ category }: { category: Category }) => {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Trash2Icon
            color="gray"
            size={18}
            className="hover:scale-90 hover:cursor-pointer transform duration-300"
          />
        </DrawerTrigger>
        <DrawerContent>
          <div className="w-full">
            <DrawerHeader>
              <DrawerTitle>Delete Category "{category.name}"</DrawerTitle>
              <DrawerDescription>
                This will remove categories from some transactions. You will
                need to go back and change those.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0"></div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button onClick={() => deleteCategory(category)}>
                  Continue
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  };

  const DesktopDialog = ({ category }: { category: Category }) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Trash2Icon
            color="gray"
            size={18}
            className="hover:scale-90 transform duration-300 hover:cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category "{category.name}"</DialogTitle>
            <DialogDescription>
              This will remove categories from some transactions. You will need
              to go back and change those.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex flex-row space-x-2">
            <DialogClose asChild>
              <Button className="w-1/2" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button className="w-1/2" onClick={() => deleteCategory(category)}>
              Continue
            </Button>
          </div>
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
          </div>
        ) : (
          categories.map((category) => (
            <Card className="w-full p-4 space-y-2" key={category.name}>
              <div className="flex flex-row justify-between">
                <CardTitle>{category.name}</CardTitle>
                {isDesktop ? (
                  <DesktopDialog category={category} />
                ) : (
                  <MobileDrawer category={category} />
                )}
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
