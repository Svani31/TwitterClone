"use client"
import { useContext, useEffect, useState } from "react";
import Header from "../components/header/page";
import MainPage from "../components/main/page";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ContextApi } from "../libs/contextapi";
export default function Home() {
  const [user,setUser] = useState(true)
  const route = useRouter()

  const {data:session,status} = useSession()
  console.log(session)
  useEffect(()=>{
    if(!session){
      route.push("/components/signup")
    }else{
      route.replace("/")
    }
  },[route, session])
    return (
      <div className="m-5">
        <Header/>
        <MainPage/>
      </div>
    )
  }
  