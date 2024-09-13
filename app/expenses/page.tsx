"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { getTransactionBetweenDates } from "@/lib/supabase/expense";
import { Transaction } from "@/lib/supabase/models";
import { useEffect, useState } from "react";
import { DollarSignIcon } from "lucide-react";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Transaction[]>([]);

  const supabase = createClient();

  const date = new Date();
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  useEffect(() => {
    getTransactionBetweenDates(supabase, firstOfMonth, lastOfMonth).then(
      (res) => {
        setExpenses(res.reverse());
      }
    );
  }, []);

  const EditPopUp = ({ expense }: { expense: Transaction }) => {};

  const DeletePopUp = ({ expense }: { expense: Transaction }) => {};

  return (
    <div className="flex flex-1 flex-col items-center w-full mt-16">
      <div className="w-full sm:w-1/4">
        <h1 className="text-4xl font-bold">Expenses</h1>
        <p className="font-light">
          Your {date.toLocaleString("default", { month: "long" })} expenses.
        </p>
      </div>
      <div className="w-full sm:w-1/4 mt-8 space-y-2">
        {expenses.length === 0 ? (
          <div className="space-y-2">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <Skeleton className="h-[125px] w-full rounded-xl" />
          </div>
        ) : (
          expenses.map((expense) => (
            <Card className="w-full p-4 space-y-1" key={expense.name}>
              <div className="flex flex-row space-x-2">
                <p className="text-xs">{expense.date}</p>
                <p className="text-xs">
                  {expense.category_id ? expense.category_id : "No Category"}
                </p>
              </div>
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row items-center">
                  <p className="text-lg font-medium">{expense.name}</p>
                </div>
                <p>${expense.amount.toFixed(2)}</p>
              </div>
              <p className="text-sm font-light">
                {expense.comment ? expense.comment : "No comment."}
              </p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
