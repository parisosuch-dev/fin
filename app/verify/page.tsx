"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { redirect, useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="w-[450px] p-8 flex flex-col items-center justify-center">
        <CardTitle>Verify Your Email</CardTitle>
        <p className="mt-2 font-light">
          A confirmation email has been sent to your email.
        </p>
        <p className="mt-8">You will not be able to login until you verify.</p>
        <Button className="w-full mt-2" onClick={() => router.push("/login")}>
          Back to Login
        </Button>
      </Card>
    </div>
  );
}
