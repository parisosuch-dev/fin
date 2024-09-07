import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect } from "next/navigation";
import { getCategories } from "@/lib/supabase/category";
import { Category } from "@/lib/supabase/models";
import { addTransaction } from "@/lib/supabase/expense";

export default async function ExpensePage() {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const amount = parseFloat(formData.get("amount") as string);
    const date = new Date(formData.get("date") as string);
    const category_id = parseInt(formData.get("category") as string);
    const name = formData.get("name") as string;
    const comment = formData.get("comment") as string | undefined;

    const transaction = await addTransaction(
      amount,
      date,
      category_id,
      name,
      comment
    );

    if (transaction) {
      redirect("/");
    }
  };

  const categories = await getCategories();

  if (categories.length === 0) {
    redirect("/categories");
  }

  type BucketCategoriesMap = {
    [key: string]: Category[];
  };

  const categoriesByBucket: BucketCategoriesMap = {};

  // filter each category into a bucket so we can group them
  for (let category of categories) {
    if (!(category.bucket in categoriesByBucket)) {
      categoriesByBucket[category.bucket] = [];
    }
    categoriesByBucket[category.bucket].push(category);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full">
      <div className="w-full sm:w-1/4">
        <Card className="w-full p-4 sm:px-16 sm:py-8">
          <CardTitle className="text-center">Add Expense</CardTitle>
          <form className="mt-8 flex flex-col space-y-2">
            <div className="flex flex-row space-x-1">
              <Input name="amount" type="float" placeholder="$" required />
              <DatePicker name="date" value={new Date()} />
            </div>
            <Select name="category">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoriesByBucket).map(([bucket, items]) => (
                  <SelectGroup key={bucket}>
                    <SelectLabel>{bucket}</SelectLabel>
                    {items.map((item) => (
                      <SelectItem value={item.id.toString()} key={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
            <Input
              name="name"
              type="text"
              placeholder="transaction name"
              required
            />
            <Textarea name="comment" placeholder="comment" />
            <Button
              className="w-full mt-4"
              type="submit"
              formAction={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
