import MonthExpenseChart from "@/components/charts/month-expense";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const date = new Date();

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full">
      <div className="flex flex-1 flex-col justify-center w-full sm:w-1/4">
        <MonthExpenseChart month={date.getMonth()} year={date.getFullYear()} />
        <div className="mt-4 space-y-2">
          <Link className="w-full" href="/expense">
            <Button className="w-full">Add Expense</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
