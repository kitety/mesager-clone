import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (
  conversation: FullConversationType | { users: User[] },
) => {
  const session = useSession();
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;
    return conversation.users.find((user) => user.email !== currentUserEmail);
  }, [conversation.users, session?.data?.user?.email]);
  return otherUser as User;
};
export default useOtherUser;
