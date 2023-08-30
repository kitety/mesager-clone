"use client";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { FC, useMemo } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

interface IHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: FC<IHeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);

  return (
    <div
      className={
        "bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm"
      }
    >
      <div className={"flex gap-3 items-center"}>
        <Link
          href={"/conversations"}
          className={
            "lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          }
        >
          <HiChevronLeft size={30} />
        </Link>
        <Avatar user={otherUser} />
        <div className={"flex flex-col"}>
          <div>{conversation.name || otherUser?.name}</div>
          <div className={"text-sm font-light text-neutral-500"}>
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={30}
        onClick={() => {}}
        className={"text-sky-500 hover:text-sky-600 transition cursor-pointer"}
      />
    </div>
  );
};
export default Header;
