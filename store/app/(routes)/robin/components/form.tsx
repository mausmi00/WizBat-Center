import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./messageInput";
import { HiPaperAirplane } from "react-icons/hi2";
import axios from "axios";
import toast from "react-hot-toast";
import { ChainValues } from "langchain/dist/schema";
import { Product } from "@/types";
import useCart from "@/hooks/useCart";

declare global {
  var agentResponse: ChainValues | null | undefined;
  var ingredientsInStore: Product[] | null | undefined;
  var ingredientsNotInStore: string[] | null | undefined;
}

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cart = useCart();

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
    message: string,
    to: string | null | undefined
  ) => {
    if (globalThis.socket === null) {
      toast.error("connection not established");
    }

    globalThis.socket?.current?.send(
      JSON.stringify({
        action: "sendMessage",
        message: message,
        to,
      })
    );
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios
      .post(`/api/robin`, {
        ...data,
      })
      .then((response) => {
        console.log("within: ", response);
        globalThis.ingredientsInStore = response.data[2];
        globalThis.ingredientsNotInStore = response.data[3];
        // cart.removeAll();
        // console.log("data sent: ", data)
        cartAdd(data.message);
        onSocketMessage(data.message, "user");
        // onSocketMessage(response[1], globalThis.user?.firstName);
        // agentResponseGenerated(data.message);
        // onSocketMessage(globalThis.agentResponse, "Robin");
      })
      .catch(() => {
        toast.error("Something went wrong. Please refresh.");
      });
  };

  const cartAdd = (dishName: string) => {
    const added: boolean = cart.addDish(dishName);
    if (added === true) {
      if (
        globalThis.ingredientsInStore !== null &&
        globalThis.ingredientsInStore !== undefined
      ) {
        for (let ingre of globalThis.ingredientsInStore) {
          cart.addItem(ingre);
          console.log("added found: ", ingre.name);
          // }
        }
      }

      if (
        globalThis.ingredientsNotInStore !== null &&
        globalThis.ingredientsNotInStore !== undefined
      ) {
        // push the dishe's name
        const updatedDishName = `%${dishName}`;
        // globalThis.ingredientsNotInStore.push(dishName);
        cart.addItem(updatedDishName);
        for (let ingre of globalThis.ingredientsNotInStore) {
          const noIngre = `Item out of stock: ${ingre}`;
          cart.addItem(noIngre);
        }
      }
    }
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
      <div>{defaultMessage}</div>
    </>
  );
};

export default Form;
