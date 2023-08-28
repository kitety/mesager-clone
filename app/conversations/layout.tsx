import SideBar from "@/app/components/sideBar/SideBar";
import { ReactNode } from "react";
import ConversationList from "@/app/conversations/components/ConversationList";
import getConversations from "@/app/actions/getConversations";

export default async function ConversationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const conversations = await getConversations();
  console.log({ conversations });
  return (
    // @ts-ignore
    <SideBar>
      <ConversationList initialItems={conversations} />
      <div className={"h-full"}>{children}</div>
    </SideBar>
  );
}
