import clsx from "clsx";
import Avatar from "./Avatar";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { Message } from "@prisma/client";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { UserResource } from "@clerk/types";

declare global {
  var user: UserResource | null | undefined;
}

interface MessageBoxProps {
  //   data: [FullMessageType;]
  initialMessages: Message[] | null;
}
const messageBox: React.FC<MessageBoxProps> = ({ initialMessages }) => {
  const { user } = useUser();
  globalThis.user = user;
  // console.log("user: ", user)
  // console.log("user image: ", user?.imageUrl);
  //   const session = useSession();
  // const isOwn = session?.data?.user?.email === data?.sender?.email;
  //   const params = useParams();
  //   const storeId = params?.storeId;

  const container = clsx("flex gap-3 p-4");

  const avatar = "mt-4";

  const body = clsx("flex flex-col gap-4 items-end");

  const messages = clsx("text-sm w-fit overflow-hidden text-white");

  //   const storeOwner = await prismadb.store.findUnique({
  //     where: {
  //       id: storeId,
  //     },
  //   });

  //   const convoMessages = await prismadb.conversation.findMany({
  //     where: {
  //       userId: storeOwner?.userId,
  //     },
  //     include: {
  //       messages: true,
  //     },
  //   });

  return (
    <div className={container}>
      <div className={body}>
        <div className="flex items-center gap-1" />
        <div className={messages}>
          {/* <div>{data.body}</div> */}
          <div className="flex gap-3">
            <Avatar url={"/images/robin.jpg"} />
            <p>
              I'm Robin, your Shopify assistant. Ask any questions about your
              shop that you need help with, and I'll try my best to assist you
              with it.
            </p>
          </div>

          {initialMessages?.map((message: Message) => (
            <>
              <div className="pt-4">
                {/* <MessageBox
              isLast={i === messages.length - 1}
              key={message.id}
              data={message}
            /> */}

                <div className="flex gap-3">
                  <Avatar url={user?.imageUrl} />
                  {message?.body}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default messageBox;
