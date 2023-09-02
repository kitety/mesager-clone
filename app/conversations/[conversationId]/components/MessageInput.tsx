"use client";

import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IMessageInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  type?: string;
  placeholder?: string;
}

const MessageInput: FC<IMessageInputProps> = ({
  id,
  register,
  errors,
  required,
  placeholder,
  type,
}) => {
  return (
    <div className={"relative w-full"}>
      <input
        type={type}
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className={
          "text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
        }
      />
    </div>
  );
};
export default MessageInput;
