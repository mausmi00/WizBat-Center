import Navbar from "@/components/navbar";
import ContentSeparator from "@/components/ui/sidebar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div className="flex flex-row left-0 top-0">
        <div className="flex flex-row">
          <ContentSeparator />
        </div>
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
