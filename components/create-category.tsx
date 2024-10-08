"use client";

import { Card, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getBuckets } from "@/lib/supabase/bucket";
import { createCategory } from "@/lib/supabase/category";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bucket } from "@/lib/supabase/models";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function CreateCategory() {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [disableButton, setDisableButton] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const params = useSearchParams();

  const handleSubmit = (formData: FormData) => {
    setDisableButton(true);

    const bucket = formData.get("bucket") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    createCategory(supabase, bucket, name, description)
      .then((res) => {
        console.log(params.get("reference"));
        // got to expense page if reference is expense
        if (params.get("reference") === "expense") {
          router.push("/expense");
        } else {
          router.push("/categories");
        }
      })
      .catch((e) => {
        setDisableButton(false);
        // TODO: handle error on category creation and display that error to user
      });
  };

  const maxLengthCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength);
    }
  };

  useEffect(() => {
    // get buckets
    getBuckets(supabase).then((res) => {
      setBuckets(res);
    });
  }, []);

  return (
    <Card className="w-full sm:w-1/4 p-4 sm:px-16 sm:py-8 text-center">
      <CardTitle>
        {params.get("reference")
          ? "Create Your First Category"
          : "Create a Category"}
      </CardTitle>
      <p className="mt-2 text-sm font-light">
        Categories help organize expenses into a group.
      </p>
      <form className="mt-8 flex flex-col space-y-2">
        <Select name="bucket" required>
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
        <Input
          name="name"
          type="text"
          placeholder="category name"
          required
          maxLength={48}
          onInput={maxLengthCheck}
        />
        <Input
          name="description"
          type="text"
          placeholder="description"
          maxLength={56}
          onInput={maxLengthCheck}
          required
        />
        <div className="flex flex-row space-x-1 mt-4">
          <Link
            className="w-1/2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            href="/categories"
          >
            Cancel
          </Link>
          <Button
            className="w-1/2"
            type="submit"
            formAction={handleSubmit}
            disabled={disableButton}
          >
            Create
          </Button>
        </div>
      </form>
    </Card>
  );
}
