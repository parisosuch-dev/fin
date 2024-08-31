import { Card, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function ExpensePage() {
  const handleSubmit = async () => {
    "use server";

    // submit expense
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full">
      <div className="w-full sm:w-1/4">
        <Card className="w-full p-4 sm:px-16 sm:py-8">
          <CardTitle className="text-center">Add Expense</CardTitle>
          <form className="mt-8 flex flex-col space-y-2">
            <div>
              <Input name="amount" type="number" placeholder="$" required />
            </div>
            <div>
              <Input
                name="name"
                type="text"
                placeholder="transaction name"
                required
              />
            </div>
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
