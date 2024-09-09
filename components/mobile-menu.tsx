import Link from "next/link";
import { Card } from "./ui/card";
import { DollarSignIcon, PackageIcon, HomeIcon } from "lucide-react";

export default function MobileMenu() {
  return (
    <Card className="fixed bottom-2 left-1/2 transform -translate-x-1/2 w-auto max-w-4xl text-center p-2">
      <div className="container mx-auto">
        <nav className="flex justify-center space-x-4">
          <div className="flex flex-col items-center space-y-0.5">
            <Link href="/expenses" className="flex flex-col items-center">
              <DollarSignIcon size={21} />
              <p className="text-xs">Expenses</p>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg px-2 bg-black">
            <Link href="/" className="flex flex-col items-center">
              <HomeIcon size={24} className="" color="white" />
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-0.5">
            <Link href="/categories" className="flex flex-col items-center">
              <PackageIcon size={21} />
              <p className="text-xs">Categories</p>
            </Link>
          </div>
        </nav>
      </div>
    </Card>
  );
}
