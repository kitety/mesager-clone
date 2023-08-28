import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismaClient from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { userId, isGroup, members, name } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members?.length < 2 || !name)) {
      return new NextResponse("Invalid Data", { status: 400 });
    }
    if (isGroup) {
      const newConversation = await prismaClient.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => {
                return {
                  id: member.value,
                };
              }),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(newConversation);
    }
    const existConversations = await prismaClient.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });
    // existConversations is an array of conversations
    const singleConversation = existConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }
    // create nre conversation
    const newConversation = await prismaClient.conversation.create({
      data: {
        isGroup: false,
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });
    return NextResponse.json(newConversation);
  } catch (e) {
    console.log("Internal Error", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
