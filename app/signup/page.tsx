import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/server";
import { encodedRedirect, Message } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Message;
}) {
  const handleSignUp = async (formData: FormData) => {
    "use server";
    const supabase = createClient();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: name,
        },
      },
    });

    if (error) {
      return encodedRedirect("error", "/signup", error.message);
    }
    return redirect("/verify");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="w-[450px] p-8">
        <CardTitle className="text-left">Create Your Fin Account</CardTitle>
        <p className="text-sm mt-2">
          Already have an account?{" "}
          <Link className="text-blue-600 font-medium underline" href="/login">
            Login
          </Link>
        </p>
        <form className="mt-8 flex flex-col space-y-8">
          <div>
            <Label htmlFor="name">Display Name</Label>
            <Input name="name" type="text" placeholder="Paris" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <Button
            className="w-full mt-4"
            type="submit"
            formAction={handleSignUp}
          >
            Create Account
          </Button>
        </form>
        {"error" in searchParams ? (
          <p className="mt-2 text-sm text-rose-500 text-center">
            {searchParams.error}
          </p>
        ) : null}
      </Card>
    </div>
  );
}
