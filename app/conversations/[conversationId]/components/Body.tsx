"use client";
import MessageBox from "@/app/conversations/[conversationId]/components/MessageBox";
import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { FC, useRef, useState } from "react";

interface IBodyProps {
  initialMessages: FullMessageType[];
}

const Body: FC<IBodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId, isOpen } = useConversation();
  return (
    <div className={"flex-1 overflow-y-auto"}>
      {messages.map((message, index) => {
        return (
          <MessageBox
            key={message.id}
            data={message}
            isLast={index === messages.length - 1}
          />
        );
      })}
      <div ref={bottomRef} className={"pt-24"}></div>
    </div>
  );
};
export default Body;
