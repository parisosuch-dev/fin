import MonthExpenseChart from "@/components/charts/month-expense";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // get user categories and if none exists, force them to add one before even adding expenses
  // TODO: get user categories
  const categories: any[] = [];

  if (categories.length === 0) {
    redirect("/categories");
  }

  const date = new Date();

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full">
      <div className="w-full sm:w-1/4">
        <MonthExpenseChart month={date.getMonth()} year={date.getFullYear()} />
      </div>
    </div>
  );
}
