import { useCallback, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./messageInput";
import { HiPaperAirplane, HiEllipsisHorizontal } from "react-icons/hi2";
import { Conversation } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { UserProfile, useUser } from "@clerk/nextjs";
import getAiResponse from "@/app/api/[storeId]/robin/components/getAiResponse";

interface FormProps {
  storeId: string;
}

const Form: React.FC<FormProps> = ({ storeId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSocketMessage = async (
    body: string,
    to: string | null | undefined
  ) => {
    if (globalThis.socket === null) {
      toast.error("connection not established");
    }

    globalThis.socket?.current?.send(
      JSON.stringify({
        action: "sendMessage",
        message: body,
        to,
      })
    );
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios
      .post(`/api/${storeId}/robin`, {
        ...data,
      })
      .then(() => {
        onSocketMessage(data.message, globalThis.user?.firstName);
      })
      .catch(() => {
        toast.error("Something went wrong. Please refresh.");
      })
  };

  // const agentResponseGenerated = (message: string) => {
  //   console.log("called");
  //   console.log("chain before: ", global.CHAIN)
  //   const response = getAiResponse(global.CHAIN, message);
  //   axios
  //     .post(`/api/${storeId}/robin`, {
  //       ...response,
  //     })
  //     .then(() => {
  //       router.refresh();
  //     })
  //     .catch(() => {
  //       toast.error("Error occured while generating response.");
  //     });
  // };

  const defaultMessage = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-2 w-full"
    >
      <MessageInput
        id="message"
        register={register}
        errors={errors}
        required
        disabled={isLoading}
        placeholder="Ask anything..."
      />
      <button
        type="submit"
        className="
    rounded-full
    p-2
    bg-[#66FCF1]
    cursor-pointer
    hover:bg-[#45A29E]
    transition"
      >
        <HiPaperAirplane size={18} className="text-[#1F2833]" />
      </button>
    </form>
  );

  return (
    <>
      <div>{defaultMessage}</div>
    </>
  );
};

export default Form;
