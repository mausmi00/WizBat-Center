"use client";

import { Pointer } from "lucide-react";
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

declare global {
  var socket: any;
}

const SheetDisplay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(null);
  const [newMessageSent, setNewMessageSent] = useState(false);

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

  const onSocketClose = () => {
    setIsConnected(false);
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
      socket.current?.addEventListener("close", onSocketClose);
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
      })
      .catch(() => toast.error("Something went wrong!"));
  }, [newMessageSent]);

  const onClick = () => {
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
      <Sheet>
        <SheetTrigger>
          <AiOutlineQq size={25} className="cursor-pointer" onClick={onClick} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Robin</SheetTitle>
            <SheetDescription>
              Because every Batman needs a Robin.
            </SheetDescription>
          </SheetHeader>
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <MessageBody initialMessages={messages} />
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
