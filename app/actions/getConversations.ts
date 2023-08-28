import getCurrentUser from "@/app/actions/getCurrentUser";
import prismaClient from "@/app/libs/prismadb";

const getConversations = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return [];
  }
  try {
    const conversations = await prismaClient.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return conversations;
  } catch (e) {
    return [];
  }
};
export default getConversations;
