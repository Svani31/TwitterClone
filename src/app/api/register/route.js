import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    const userRespons = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    if (!userRespons) null;

    return NextResponse.json(userRespons);
  } catch (error) {
    throw error;
  }
}