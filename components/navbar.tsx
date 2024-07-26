import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { StoreSwitcher } from "./store-switcher";
import { MainNav } from "./main-nav";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from "./ModeToggle";

export async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect("sign-in");
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
})

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />

        <MainNav />
        <ModeToggle />

        <div className="ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
