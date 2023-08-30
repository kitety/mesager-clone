import prismaClient from "@/app/libs/prismadb";

const getMessages = async (conversationId: string) => {
  try {
    const messages = await prismaClient.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return messages;
  } catch (error) {
    return [];
  }
};
export default getMessages;
