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
import { redirect } from "next/navigation";

export default async function CreateCategory() {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const bucket = formData.get("bucket") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const result = await createCategory(bucket, name, description);

    // based on the result if success, go to categories page
    redirect("/categories");

    // TODO: handle error on category creation and display that error to user
  };

  // get buckets
  const buckets = await getBuckets();

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
        <Button className="w-full mt-4" type="submit" formAction={handleSubmit}>
          Create
        </Button>
      </form>
    </Card>
  );
}
