import getCurrentUser from "@/app/actions/getCurrentUser";
import prismaClient from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, conversationId, image } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const newMessage = await prismaClient.message.create({
      data: {
        body: message,
        image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });
    const updatedConversation = await prismaClient.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });
    // pusher
    return NextResponse.json(newMessage);
  } catch (e) {
    console.log(e, "ERROR_MESSAGE");
    return new NextResponse("internal error", { status: 500 });
  }
}
