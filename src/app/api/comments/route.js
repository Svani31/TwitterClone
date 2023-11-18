import { NextResponse } from "next/server"
import prisma from "../../libs/prismadb"

export async function POST(req){
    try{
        const body = await req.json()
        const {userId,comment,postId} = body
        const respons = await prisma.comments.create({
            data:{
                comment,
                userId,
                postId
            }
        })
        console.log(respons)
        return NextResponse.json(respons)
    }catch(error){
        throw error
    }
}