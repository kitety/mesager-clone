import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismaClient from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword, "hashedPassword");
    const user = await prismaClient.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (e) {
    console.log(e, "Register Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
