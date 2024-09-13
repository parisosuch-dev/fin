import Link from "next/link";
import { Card } from "./ui/card";
import { DollarSignIcon, PackageIcon, HomeIcon } from "lucide-react";

export default function MobileMenu() {
  return (
    <Card className="fixed left-0 bottom-0 w-full text-center px-2 pb-8 pt-2 visible sm:hidden">
      <div className="container mx-auto">
        <nav className="flex justify-center space-x-4">
          <div className="flex flex-col items-center space-y-0.5">
            <Link href="/expenses" className="flex flex-col items-center">
              <DollarSignIcon size={24} />
              <p className="text-sm">Expenses</p>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg px-4 bg-black">
            <Link href="/" className="flex flex-col items-center">
              <HomeIcon size={28} className="" color="white" />
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-0.5">
            <Link href="/categories" className="flex flex-col items-center">
              <PackageIcon size={24} />
              <p className="text-sm">Categories</p>
            </Link>
          </div>
        </nav>
      </div>
    </Card>
  );
}
