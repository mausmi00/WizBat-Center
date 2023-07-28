import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "@/components/theme-toggle";
import SheetDisplay from "@/app/(dashboard)/[storeId]/(routes)/robin/components/sheetDisplay";
import { FcShop } from "react-icons/fc";
import { Select } from "./ui/select";
import { ProductSelect } from "./product-select";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex ml-4">
          <FcShop className="mr-2" size={25} />
          <h1 className="mr-20 font-bold">AmazonClone</h1>
        </div>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-2">
          {/* <AiOutlineQq size={25} onClick={openSideSheet}/> */}
          <StoreSwitcher items={stores} />
          <SheetDisplay />
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
