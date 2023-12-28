import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, image } = body;

    const existedUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(existedUser);
    if (existedUser) {
      throw new Error("User Alredy Exist");
    }
    console.log(existedUser);

    const userRespons = await prisma.user.create({
      data: {
        name,
        email,
        password,
        image,
      },
    });
    if (!userRespons) null;

    return NextResponse.json(userRespons);
  } catch (error) {
    throw error;
  }
}

export async function GET() {
  try {
    const respons = await prisma.user.findMany();
    console.log(respons);
    return NextResponse.json(respons);
  } catch (error) {
    throw error;
  }
}
