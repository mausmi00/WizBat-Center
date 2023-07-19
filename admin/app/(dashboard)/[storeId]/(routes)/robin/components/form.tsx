import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./messageInput";
import { HiPaperAirplane, HiEllipsisHorizontal } from "react-icons/hi2";
import { Conversation } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { UserProfile } from "@clerk/nextjs";

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // global.messageIsBeingGenerated = true;
    // setIsLoading(global.messageIsBeingGenerated);
    // setIsLoading(true);
    // global.shouldDisplay = false;
    // setIsLoading(global.shouldDisplay);
    setValue("message", "", { shouldValidate: true });
    axios
      .post(`/api/${storeId}/robin`, {
        ...data,
      })
      .then(() => {
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong. Please refresh.");
      });
  };

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
      <div
        className="
      py-4
      px-4
      bg-[#1F2833]
      border-t
      flex
      items-center
      gap-2
      lg:gap-4
      w-full
      "
      >
        {defaultMessage}
      </div>
    </>
  );
};

export default Form;
