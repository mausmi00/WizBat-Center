import { useEffect } from 'react';
import { useRouter } from 'next/router';
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { userId } = await auth();

      if (!userId) {
        router.push("/sign-in");
        return;
      }

      const store = await prismadb.store.findFirst({
        where: {
          userId,
        },
      });

      if (store) {
        router.push(`/${store.id}`);
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
}