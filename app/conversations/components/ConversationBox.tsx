"use client";
import { FullConversationType } from "@/app/types";
import { FC, useCallback, useMemo } from "react";
import useOtherUser from "@/app/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import { format } from "date-fns";

interface ConversationBoxProps {
  data: FullConversationType;
  selected: boolean;
}

const ConversationBox: FC<ConversationBoxProps> = ({ data, selected }) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`/conversation/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage || !userEmail) return false;
    const seenArray = lastMessage.seen || [];
    return seenArray.some((user) => user.email === userEmail);
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Send an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "Started a conversation";
  }, [lastMessage?.body, lastMessage?.image]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3",
        selected ? "bg-neutral-100" : "bg-white",
      )}
    >
      <Avatar user={otherUser} />
      <div className={"min-w-0 flex-1"}>
        <div className={"focus:outline-none"}>
          <div className={"flex justify-between items-center mb-1"}>
            <p className={"text-md font-medium text-gray-900"}>
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createAt && (
              <p className={"text-xs text-gray-400 font-light"}>
                {format(new Date(lastMessage?.createAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              "truncate text-sm",
              hasSeen ? "text-gray-500" : "text-black font-medium",
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ConversationBox;
