import { Card, CardTitle } from "./ui/card";
import { Button, buttonVariants } from "./ui/button";
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
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function CreateCategory() {
  const supabase = createClient();

  const handleSubmit = async (formData: FormData) => {
    "use server";

    const bucket = formData.get("bucket") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const result = await createCategory(supabase, bucket, name, description);

    // based on the result if success, go to categories page
    redirect("/categories");

    // TODO: handle error on category creation and display that error to user
  };

  // get buckets
  const buckets = await getBuckets(supabase);

  return (
    <Card className="w-full sm:w-1/4 p-4 sm:px-16 sm:py-8 text-center">
      <CardTitle>Create a Category</CardTitle>
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
        <Input name="name" type="text" placeholder="category name" required />
        <Input
          name="description"
          type="text"
          placeholder="description"
          required
        />
        <div className="flex flex-row space-x-1 mt-4">
          <Link
            className="w-1/2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            href="/categories"
          >
            Cancel
          </Link>
          <Button className="w-1/2" type="submit" formAction={handleSubmit}>
            Create
          </Button>
        </div>
      </form>
    </Card>
  );
}
