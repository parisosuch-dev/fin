import { SupabaseClient } from "@supabase/supabase-js";
import { Transaction } from "./models";

export async function addTransaction(
  supabase: SupabaseClient,
  amount: number,
  date: Date,
  category_id: number,
  name: string,
  comment?: string
): Promise<Transaction> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User session does not exist.");
  }

  const { data: transaction, error } = await supabase
    .from("Transaction")
    .insert([
      {
        user_id: user.id,
        name: name,
        amount: amount,
        date: date,
        category_id: category_id,
        comment: comment,
      },
    ])
    .select();

  if (error) {
    throw new Error(`Error creating transaction: ${error.message}`);
  }
  if (!transaction) {
    throw new Error("Unkown error happened when creating transaction.");
  }

  return transaction[0] as Transaction;
}

export async function getTransactionBetweenDates(
  supabase: SupabaseClient,
  start_date: Date,
  end_date: Date
): Promise<Transaction[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User session does not exist.");
  }

  const { data: transactions, error } = await supabase
    .from("Transaction")
    .select()
    .eq("user_id", user.id)
    .gte("date", start_date.toISOString())
    .lte("date", end_date.toISOString());

  if (error) {
    throw new Error(`Error getting transaction: ${error.message}`);
  }

  return transactions as Transaction[];
}

export async function getTransaction(
  supabase: SupabaseClient,
  transaction_id: number
): Promise<Transaction> {
  const { data: transaction, error } = await supabase
    .from("Transaction")
    .select()
    .eq("id", transaction_id);

  if (error) {
    throw new Error(error.message);
  }

  return transaction[0] as Transaction;
}
