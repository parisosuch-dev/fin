import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  const handleSignIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      console.log("Success");
      return redirect("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="w-[450px] p-8">
        <CardTitle className="text-left">Login to Fin</CardTitle>
        <p className="text-sm mt-2">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-600 font-medium underline" href="/signup">
            Sign up
          </Link>
        </p>
        <form className="mt-8 flex flex-col space-y-8">
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
            formAction={handleSignIn}
          >
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}
