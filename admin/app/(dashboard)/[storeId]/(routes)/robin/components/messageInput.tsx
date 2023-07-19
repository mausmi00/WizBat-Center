"use client";

import { Message } from "postcss";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { HiPaperAirplane, HiEllipsisHorizontal } from "react-icons/hi2";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  type,
  required,
  register,
  errors,
  disabled
}) => {
  return (
    <div
      className="
  relative w-full flex"
    >
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        disabled={disabled}
        className="
        font-light
        py-2
        px-4
        opacity-100
        w-full
        rounded
        focus:outline-none
        "
      />
    </div>
  );
};

export default MessageInput;
