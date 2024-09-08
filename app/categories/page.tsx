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

  const MobileDrawer = () => {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Trash2Icon
            color="gray"
            size={18}
            className="group-hover:scale-90 transform duration-300"
          />
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0"></div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  };

  const DesktopDialog = () => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Trash2Icon
            color="gray"
            size={18}
            className="group-hover:scale-90 transform duration-300"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
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
          </div>
        ) : (
          categories.map((category) => (
            <Card className="w-full p-4 space-y-2" key={category.name}>
              <div className="flex flex-row justify-between">
                <CardTitle>{category.name}</CardTitle>
                {isDesktop ? <DesktopDialog /> : <MobileDrawer />}
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
