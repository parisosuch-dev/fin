import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";

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

  return (
    <Card className="w-full p-16">
      <CardTitle className="text-center">{monthName} Expenses</CardTitle>
      <div className="flex flex-col items-center mt-2 space-y-4">
        <p className="text-center bg-gray-100 rounded-full px-2 w-fit text-sm">
          {firstOfMonth.toDateString()} - {lastOfMonth.toDateString()}
        </p>
        <div>{/* Chart here */}</div>
        <Button className="w-full">Add Expense</Button>
      </div>
    </Card>
  );
}
