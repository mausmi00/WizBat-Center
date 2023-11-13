import clsx from "clsx";
import Avatar from "./Avatar";
import { Message } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { UserResource } from "@clerk/types";
import React from "react";

declare global {
  var user: UserResource | null | undefined;
}

interface MessageBoxProps {
  initialMessages: Message[] | null;
}
const MessageBox: React.FC<MessageBoxProps> = ({ initialMessages }) => {
  const { user } = useUser();
  globalThis.user = user;

  const container = clsx("flex gap-3 p-4");

  const avatar = "mt-4";

  const body = clsx("flex flex-col gap-4 items-end");

  const messages = clsx("text-sm w-fit overflow-hidden text-white");

  return (
    <div className={container}>
      <div className={body}>
        <div className="flex items-center gap-1" />
        <div className={messages}>
          {/* <div>{data.body}</div> */}
          <div className="flex gap-3">
            <Avatar url={"/images/robin.jpg"} />
            <p>
              I&apos;m Robin, your Shopify assistant. Ask any questions about
              your shop that you need help with, and I&apos;ll try my best to
              assist you with it.
            </p>
          </div>

          {initialMessages?.map((message: Message, index: number) => (
            <React.Fragment key={index}>
              <div className="pt-4">
                <div className="flex gap-3">
                  {message.isAi ? (
                    <Avatar url={"/images/robin.jpg"} />
                  ) : (
                    <Avatar url={user?.imageUrl} />
                  )}

                  {message?.body}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
