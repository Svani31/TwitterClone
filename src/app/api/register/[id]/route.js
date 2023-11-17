import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb"

export async function GET(req,{params}) {
    try {
      const {id} = params;
      console.log(id)
      const userInfo = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      console.log(userInfo)
      if (!userInfo) null;
      return NextResponse.json(userInfo);
    } catch (error) {
      throw error;
    }
  }
  

