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

export default async function CreateCategory() {
  const handleSubmit = async () => {
    "use server";
    // TODO: create category
  };

  // get buckets
  const buckets = await getBuckets();

  return (
    <Card className="w-full sm:w-1/4 p-4 sm:px-16 sm:py-8 text-center">
      <CardTitle>Add Your First Category</CardTitle>
      <form className="mt-8 flex flex-col space-y-2">
        <Select>
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
          Sign In
        </Button>
      </form>
    </Card>
  );
}
