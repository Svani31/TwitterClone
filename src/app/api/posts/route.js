import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

export async function POST(req){
    try{
        const infoBody = await req.json()
        const {title,body,image,userId} = infoBody
        console.log({title,body,image,userId})
        const postRespons = await prisma.post.create({
            data:{
                title,
                body,
                image,
                userId
            }
        })
        console.log(postRespons)
        if (!postRespons) null
        console.log(postRespons)
        return NextResponse.json(postRespons)
    }catch(error){
        throw error
    }
}


export async function GET(){
    try{
        const getAllPost = await prisma.post.findMany({
            include:{
                user:true,
                comments:{
                    include:{
                        user:true
                    }
                }            
            }
        })
        console.log(getAllPost)
        return NextResponse.json(getAllPost)
    }catch(error){
        throw error
    }
}