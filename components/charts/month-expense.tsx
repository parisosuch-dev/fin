import { DollarSign } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import Link from "next/link";
import { getTransactionBetweenDates } from "@/lib/supabase/expense";
import { DonutChart } from "./donut-chart";
import { getCategories } from "@/lib/supabase/category";

export default async function MonthExpenseChart({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  // date stuff
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);
  const monthName = firstOfMonth.toLocaleString("default", { month: "long" });

  const transactions = await getTransactionBetweenDates(
    firstOfMonth,
    lastOfMonth
  );

  // get categories and map category id to a respective name for lookup
  const categories = await getCategories();
  const categoryMap: { [key: number]: string } = {};
  for (let category of categories) {
    categoryMap[category.id] = category.name;
  }

  const aggregateData: { [key: string]: number } = {};

  transactions.forEach((transaction) => {
    // get the category name using the map
    let categoryName = categoryMap[transaction.category_id];
    if (aggregateData[categoryName]) {
      aggregateData[categoryName] += transaction.amount;
    } else {
      aggregateData[categoryName] = transaction.amount;
    }
  });

  // convert to a suitable array

  const data = Object.keys(aggregateData).map((name) => ({
    name,
    amount: aggregateData[name],
  }));

  console.log(data);

  return (
    <Card className="w-full p-4 sm:px-16 sm:py-8">
      <CardTitle className="text-center">{monthName} Expenses</CardTitle>
      <div className="flex flex-col items-center mt-2 space-y-4">
        <p className="text-center bg-gray-100 rounded-full px-2 w-fit text-xs sm:text-sm">
          {firstOfMonth.toDateString()} - {lastOfMonth.toDateString()}
        </p>
        <div className="min-h-[300px] flex flex-col">
          {transactions.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 rounded-lg p-4 space-y-4">
              <DollarSign size={64} color="gray" />
              <p className="text-center">
                You have no expenses recorded this month.
              </p>
            </div>
          ) : (
            <div className="w-full flex-1 flex flex-col items-center justify-center">
              <DonutChart
                data={data}
                category="name"
                value="amount"
                showLabel
                className="mx-auto"
              />
              <p className="mt-2 text-sm font-light">
                Total spent for current month
              </p>
            </div>
          )}
        </div>
        <Link className="w-full" href="/expense">
          <Button className="w-full">Add Expense</Button>
        </Link>
      </div>
    </Card>
  );
}
