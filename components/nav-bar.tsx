import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Nav() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return (
    <div className="w-full flex flex-row justify-between">
      <Link className="text-sm sm:text-xl font-black" href="/">
        fin [enter logo here]
      </Link>
      <div className="flex flex-row items-center space-x-4">
        <p className="text-sm sm:text-base">
          Welcome,{" "}
          <span className="font-bold">{user?.user_metadata.display_name}</span>.
        </p>
      </div>
    </div>
  );
}
