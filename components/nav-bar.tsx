import { createClient } from "@/lib/supabase/server";

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
      <p className="text-sm sm:text-xl font-black">fin [enter logo here]</p>
      <div className="flex flex-row items-center space-x-4">
        <p className="text-sm sm:text-base">
          Welcome,{" "}
          <span className="font-bold">{user?.user_metadata.display_name}</span>.
        </p>
      </div>
    </div>
  );
}
