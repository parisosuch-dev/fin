import MonthExpenseChart from "@/components/charts/month-expense";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const date = new Date();

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full">
      <div className="w-1/4">
        <MonthExpenseChart month={date.getMonth()} year={date.getFullYear()} />
      </div>
    </div>
  );
}
