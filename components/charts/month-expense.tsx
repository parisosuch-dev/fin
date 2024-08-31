import { DollarSign } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";

import { redirect } from "next/navigation";
import Link from "next/link";

export default function MonthExpenseChart({
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

  const data: any[] = [];

  // TODO: get expenses for month and display in pie chart

  return (
    <Card className="w-full p-4 sm:p-16">
      <CardTitle className="text-center">{monthName} Expenses</CardTitle>
      <div className="flex flex-col items-center mt-2 space-y-4">
        <p className="text-center bg-gray-100 rounded-full px-2 w-fit text-xs sm:text-sm">
          {firstOfMonth.toDateString()} - {lastOfMonth.toDateString()}
        </p>
        <div className="min-h-[400px] flex flex-col">
          {data.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 rounded-lg p-4 space-y-4">
              <DollarSign size={64} color="gray" />
              <p className="text-center">
                You have no expenses recorded this month.
              </p>
            </div>
          ) : null}
        </div>
        <Link className="w-full" href="/expense">
          <Button className="w-full">Add Expense</Button>
        </Link>
      </div>
    </Card>
  );
}
