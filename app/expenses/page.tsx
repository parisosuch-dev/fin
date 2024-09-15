"use client";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "@/lib/supabase/category";
import { createClient } from "@/lib/supabase/client";
import { getTransactionBetweenDates } from "@/lib/supabase/expense";
import { Transaction } from "@/lib/supabase/models";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, PencilIcon, Trash2Icon, TrashIcon } from "lucide-react";
import Link from "next/link";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<{ [key: number]: string }>({});

  const supabase = createClient();

  const date = new Date();
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  useEffect(() => {
    getCategories(supabase).then((res) => {
      var categoryMap: any = {};
      for (let category of res) {
        categoryMap[category.id] = category.name;
      }
      setCategories(categoryMap);
    });
    getTransactionBetweenDates(supabase, firstOfMonth, lastOfMonth).then(
      (res) => {
        setExpenses(res.reverse());
      }
    );
  }, []);

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
            <Dialog key={expense.id}>
              <DialogTrigger asChild>
                <Card className="w-full p-4 space-y-1 hover:cursor-pointer">
                  <div className="flex flex-row space-x-2">
                    <p className="text-xs">{expense.date}</p>
                    <p className="text-xs">
                      {expense.category_id
                        ? categories[expense.category_id]
                        : "No Category"}
                    </p>
                  </div>
                  <div className="flex flex-row w-full justify-between">
                    <div className="flex flex-row items-center">
                      <p className="text-lg font-medium">{expense.name}</p>
                    </div>
                    <p>${expense.amount.toFixed(2)}</p>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="pt-8 px-2 sm:px-4 rounded-lg max-w-[400px]">
                <DialogHeader>
                  <DialogTitle className="w-full flex flex-row items-center space-x-4">
                    <p className="">{expense.name}</p>
                    <Badge variant="secondary">
                      {expense.category_id
                        ? categories[expense.category_id]
                        : "No category"}
                    </Badge>
                    <div className="flex flex-row space-x-2">
                      <Link href={`/expenses/edit?id=${expense.id}`}>
                        <PencilIcon
                          size={24}
                          color="gray"
                          className="bg-gray-100 rounded-lg p-1 hover:scale-90 hover:cursor-pointer transform duration-300"
                        />
                      </Link>
                      <Link href={`/expenses/delete?id=${expense.id}`}>
                        <Trash2Icon
                          size={24}
                          color="gray"
                          className="bg-gray-100 rounded-lg p-1 hover:scale-90 hover:cursor-pointer transform duration-300"
                        />
                      </Link>
                    </div>
                  </DialogTitle>
                  <DialogDescription className="space-y-2">
                    <div className="flex flex-row items-center space-x-2">
                      <CalendarIcon size={16} />
                      <p>{new Date(expense.date).toDateString()}</p>
                    </div>
                    <p className="text-left">
                      {expense.comment
                        ? expense.comment
                        : "No comment provided"}
                    </p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))
        )}
      </div>
    </div>
  );
}
