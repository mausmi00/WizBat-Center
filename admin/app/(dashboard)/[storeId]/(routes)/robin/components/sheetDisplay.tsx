"use client";

import { Pointer, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineQq, AiOutlineSend } from "react-icons/ai";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MessageBody from "./messageBody";
import MessageInput from "./messageInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";
import prismadb from "@/lib/prismadb";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Conversation, Message } from "@prisma/client";
import Form from "./form";
import { auth, useUser } from "@clerk/nextjs";
import clsx from "clsx";

declare global {
  var socket: any;
}

const SheetDisplay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(null);
  const [newMessageSent, setNewMessageSent] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  //server connection
  const [isConnected, setIsConnected] = useState(false);
  const URL = = process.env.API_GATEWAY;
  const router = useRouter();

  const params = useParams();
  const storeId = params?.storeId;
  globalThis.socket = useRef<WebSocket | null>(null);

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
  //   const [show, setShow] = useState(false);

  //   const onClick = () => {
  //     setShow(!show);
  //     console.log("show", show);
  //   };
  let convoId = null;

  const onClose = () => {
    setIsLoading(true);
    axios
      .delete(`/api/${storeId}/robin`)
      .then((data) => {
        console.log("data: ", data);
        setMessages(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setOpen(false);
    socket?.current?.close();
    setIsConnected(false);
    // delete conversation messages
  };

  const onConnect = useCallback(() => {
    console.log("name: ", globalThis.user?.firstName);
    socket.current = new WebSocket(URL);
    socket.current.onopen = function () {
      console.log("inside");
      socket.current?.send(
        JSON.stringify({
          action: "setName",
          name: globalThis.globalThis.user?.firstName,
        })
      );
      socket.current?.addEventListener("close", onClose);
      socket.current?.addEventListener("message", (event: { data: string }) => {
        // onSocketMessage(event.data);
        setNewMessageSent(true);
        console.log("response: ", JSON.parse(event.data).message);
      });
    };
  }, []);

  useEffect(() => {
    axios
      .get(`/api/${storeId}/robin`)
      .then((data) => {
        console.log(data);
        setMessages(data.data);
        convoId = data.data[1];
        setNewMessageSent(false);
        bottomRef?.current?.scrollIntoView();
      })
      .catch(() => toast.error("Something went wrong!"));
  }, [newMessageSent]);

  const onClick = () => {
    setOpen(true);
    axios
      .get(`/api/${storeId}/robin`)
      .then((data) => {
        onConnect();
        console.log(data);
        setMessages(data.data);
        convoId = data.data[1];
        console.log("messages: ", messages);
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <>
      <Sheet open={open}>
        <SheetTrigger>
          {isLoading ? (
            <AiOutlineQq size={25} className={clsx(`cursor-wait`)} />
          ) : (
            <AiOutlineQq
              size={25}
              className={clsx(`cursor-pointer`)}
              onClick={onClick}
            />
          )}
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Robin</SheetTitle>
            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-4 w-4" onClick={onClose} />
              <span className="sr-only">Close</span>
            </SheetClose>
            <SheetDescription>
              Because every Batman needs a Robin.
            </SheetDescription>
          </SheetHeader>
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <MessageBody initialMessages={messages} />
              <div className="pt-15" ref={bottomRef} />
            </div>
            <div
              className="
 h-16
 pb-20
  items-center
  gap-2
  lg:gap-4
  w-full"
            >
              <Form storeId={storeId} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SheetDisplay;
