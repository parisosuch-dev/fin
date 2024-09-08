import MonthExpenseChart from "@/components/charts/month-expense";

export default async function Home() {
  const date = new Date();

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full">
      <div className="w-full sm:w-1/4">
        <MonthExpenseChart month={date.getMonth()} year={date.getFullYear()} />
      </div>
    </div>
  );
}
