import clsx from "clsx";
import Avatar from "./Avatar";
import { Message } from "@prisma/client";

interface MessageBoxProps {
  initialMessages: Message[] | null;
}
const messageBox: React.FC<MessageBoxProps> = ({ initialMessages }) => {
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
            {/* <p className="text-black">
              I'm Robin, your Shopify assistant. Ask any questions about your
              shop that you need help with, and I'll try my best to assist you
              with it.
            </p> */}
            <p className="text-black">
              Hi, I&apos;m Robin, your assistant! Tell me what dish you&apos;re
              craving, and I&apos;ll add the ingredients to your cart. Need
              suggestions? Just ask - no bat signal required! :)
            </p>
          </div>

          {initialMessages?.map((message: Message) => (
            <>
              <div className="pt-4 text-black">
                <div className="flex gap-3">
                  {message.isAi ? (
                    <Avatar url={"/images/robin.jpg"} />
                  ) : (
                    /* automatically add the ingredients to the cart and inform the customer */
                    <Avatar url={"/images/placeholder.jpg"} />
                  )}

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
