import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { createClient } from "@/lib/supabase/server";
import { DollarSignIcon, DoorOpenIcon, PackageIcon } from "lucide-react";
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
    <div className="w-full flex flex-row justify-between items-center">
      <div className="flex flex-row items-center space-x-4">
        <Link className="text-sm sm:text-xl font-black" href="/">
          fin [enter logo here]
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/expenses" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <div className="flex flex-row items-center space-x-1">
                    <DollarSignIcon size={16} />
                    <p>Expenses</p>
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/categories" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <div className="flex flex-row items-center space-x-1">
                    <PackageIcon size={16} />
                    <p>Categories</p>
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex flex-row items-center space-x-4">
        <p className="text-sm sm:text-base">
          Welcome,{" "}
          <span className="font-bold">{user?.user_metadata.display_name}</span>.
        </p>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/logout" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <div className="flex flex-row items-center space-x-1">
                    <DoorOpenIcon size={16} />
                    <p>Logout</p>
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
